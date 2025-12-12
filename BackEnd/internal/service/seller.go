package service

import "ecobite/internal/database/model"

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
