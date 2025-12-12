package service

import (
	env "ecobite/internal/config"
	"ecobite/internal/database/model"
	"fmt"
	"github.com/google/uuid"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"
)

type ProdukImageService struct {
	Model *model.ProductImagesModel
}

func NewProdukImageService(m *model.ProductImagesModel) *ProdukImageService {
	return &ProdukImageService{Model: m}
}

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

func (m *ProdukImageService) UploadInsertSingleImage(files *multipart.FileHeader) (*model.ProductImage, error) {
	// upload file first
	uploadedFile, err := m.UploadSingleImage(files)
	if err != nil {
		return nil, fmt.Errorf("Failed to upload file to storage: %v", err)
	}

	// insert to database
	fileUpload := &model.ProductImage{
		ID: uuid.New(),
	}

	upload, err := m.InsertGallery(fileUpload)
	if err != nil {
		return nil, fmt.Errorf("Failed to insert data: %v", err)
	}

	return &model.GalleryResponse{
		ID:          upload.ID,
		GalleryName: upload.GalleryName,
		GalleryType: upload.GalleryType,
		Description: upload.Description,
		EventDate:   upload.EventDate,
		FileSize:    upload.FileSize,
		MimeType:    upload.MimeType,
		AssetUrl:    upload.AssetUrl,
	}, nil
}
