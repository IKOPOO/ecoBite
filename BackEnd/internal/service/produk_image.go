package service

import (
	env "ecobite/internal/config"
	"ecobite/internal/database/model"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
)

type ProdukImageService struct {
	Model *model.ProductImagesModel
}

func NewProdukImageService(m *model.ProductImagesModel) *ProdukImageService {
	return &ProdukImageService{Model: m}
}

type validateFile struct {
	Fileheader *multipart.FileHeader
	MimeType   string
	Folder     string
	fileSize   int64
}

const (
	maxUploadSize = 20 << 20 // 20mb
	maxFileSize   = 5 << 20  // 5mb
)

// check if file is valid or not
func isValidFile(file multipart.File) (bool, string) {
	buffer := make([]byte, 512)
	_, err := file.Read(buffer)
	if err != nil {
		return false, ""
	}

	fileType := http.DetectContentType(buffer)

	if _, err := file.Seek(0, 0); err != nil {
		return false, ""
	}
	allowedExt := map[string]bool{
		"image/jpg":       true,
		"image/jpeg":      true,
		"image/png":       true,
		"image/webp":      true,
		"video/mp4":       true,
		"video/quicktime": true,
	}

	return allowedExt[fileType], fileType

}

func GenerateRandomName(originalName string) string {
	// get the extension of the file
	extension := strings.ToLower(filepath.Ext(originalName))

	// generate uuid for random name
	fileID := uuid.New()

	return fileID.String() + extension

}

// save uploaded file to storage
func SaveUploadedFile(fileHeader *multipart.FileHeader, savePath string) error {
	// make sure the path is valid or exist
	if err := os.MkdirAll(path.Dir(savePath), os.ModePerm); err != nil {
		return fmt.Errorf("Failed to create folder")
	}

	// make temp folder
	tempFolder := savePath + ".tmp"

	// buka file
	file, err := fileHeader.Open()
	if err != nil {
		return fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	// tulis dulu ke temp folder
	tempFile, err := os.Create(tempFolder)
	if err != nil {
		return fmt.Errorf("Failed to create file")
	}

	// copy dari temp ke folder asli
	if _, err := io.Copy(tempFile, file); err != nil {
		tempFile.Close()
		os.Remove(tempFolder)
		return fmt.Errorf("Failed to copy file")
	}

	defer tempFile.Close()

	return os.Rename(tempFolder, savePath)
}

func (m *ProdukImageService) UploadSingleImage(files *multipart.FileHeader) (*model.ProductInsert, error) {
	// get storage path
	env.LoadEnv()
	storagePath := os.Getenv("STORAGE_PATH")
	if storagePath == "" {
		storagePath = "storage/uploads"
	}

	photo, err := files.Open()
	if err != nil {
		return nil, fmt.Errorf("Failed to read file")
	}
	defer photo.Close()

	// check if the file is valid and allowed or not
	isvalid, mimeType := isValidFile(photo)
	if !isvalid {
		return nil, fmt.Errorf("file type not allowed, hayoo script apa ituuu")
	}

	kategori := strings.Split(mimeType, "/")[0]

	// make random name file
	newFileName := GenerateRandomName(files.Filename)

	// save the file
	dirPath := filepath.Join(storagePath, kategori)
	if err := os.MkdirAll(dirPath, os.ModePerm); err != nil {
		return nil, fmt.Errorf("Failed to create storage folder")
	}

	savePath := filepath.Join(dirPath, newFileName)
	if err := SaveUploadedFile(files, savePath); err != nil {
		return nil, fmt.Errorf("Failed to save file")
	}

	uploadedFile := &model.ProductInsert{
		ImageURL: savePath,
	}

	return uploadedFile, nil
}

// service for uploading image or video to storage and insert to database
func (m *ProductService) UploadImage(files []*multipart.FileHeader) ([]*model.ProductInsert, error) {
	env.LoadEnv()
	// get the storage path
	storagePath := os.Getenv("STORAGE_PATH")
	if storagePath == "" {
		storagePath = "storage/uploads"
	}

	// validasi -> cek total semua file dan file size, cek file type
	var (
		totalSize    int64
		validateData []validateFile
	)

	for _, fileHeader := range files {
		// sum total size file upload
		totalSize += fileHeader.Size

		// check size per file
		if fileHeader.Size > maxFileSize {
			return nil, fmt.Errorf("file size is too large, tf nigga")
		}

		file, err := fileHeader.Open()
		if err != nil {
			return nil, fmt.Errorf("failed to parse multipart form: %s", fileHeader.Filename)
		}
		defer file.Close()

		//check if the file is valid and allowed or not
		isvalid, mimeType := isValidFile(file)
		if !isvalid {
			return nil, fmt.Errorf("file type not allowed, hayoo script apa ituuu")
		}

		// save the file base on mimetype
		var folder string
		switch {
		case strings.HasPrefix(mimeType, "image"):
			folder = "image"

		case strings.HasPrefix(mimeType, "video"):
			folder = "video"
		default:
			return nil, fmt.Errorf("failed to save file")
		}

		validateData = append(validateData, validateFile{
			Fileheader: fileHeader,
			MimeType:   mimeType,
			Folder:     folder,
			fileSize:   fileHeader.Size,
		})
	}

	// save all the file
	var uploadedFile []*model.ProductInsert
	for _, file := range validateData {
		// make sure the storage folder exists
		dirPath := filepath.Join(storagePath, file.Folder)
		if err := os.MkdirAll(dirPath, os.ModePerm); err != nil {
			return nil, fmt.Errorf("Failed to create storage folder")
		}

		// make random name file
		newFileName := GenerateRandomName(file.Fileheader.Filename)
		fmt.Println(newFileName)

		// save the fuckin file
		savePath := filepath.Join(dirPath, newFileName)
		if err := SaveUploadedFile(file.Fileheader, savePath); err != nil {
			return nil, fmt.Errorf("Failed to save file")
		}

		uploadedFile = append(uploadedFile, &model.ProductInsert{
			ImageURL: savePath,
		})
	}

	return uploadedFile, nil
}

// func save photo to gallery dan insert to database -> multiple file
func (m *ProductService) UploadAndInsertGallery(files []*multipart.FileHeader, gallery *model.ProductImage) ([]*model.ProductImageResponse, error) {
	// upload file first
	uploadedFile, err := m.UploadImage(files)
	if err != nil {
		return nil, fmt.Errorf("Failed to upload file to storage")
	}

	// insert to database
	result := []*model.ProductImageResponse{}
	for _, files := range uploadedFile {
		file_upload := &model.ProductImage{
			ProductID: gallery.ProductID,
			ImageURL:  files.ImageURL,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		fileUpload, err := m.ProdukImage.Model.InsertImages(file_upload)
		if err != nil {
			return nil, fmt.Errorf("Failed to insert data")
		}

		result = append(result, &model.ProductImageResponse{
			ID:        fileUpload.ID,
			ImageURL:  fileUpload.ImageURL,
			CreatedAt: fileUpload.CreatedAt,
		})
	}
	return result, nil
}
