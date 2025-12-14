package service

import (
	"ecobite/internal/database/model"

	"github.com/google/uuid"
)

type SellerService struct {
	Seller      *model.SellerProfileModel
	ProdukImage *ProdukImageService
}

func NewSellerService(m *model.SellerProfileModel, g *ProdukImageService) *SellerService {
	return &SellerService{
		Seller:      m,
		ProdukImage: g,
	}
}

// wrapper get seller profile by user_id
func (s *SellerService) GetSellerProfileByUserID(user_id uuid.UUID) (*model.SellerProfile, error) {
	return s.Seller.GetSellerProfileById(user_id)
}
