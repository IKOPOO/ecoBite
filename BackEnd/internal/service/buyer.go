package service

import "ecobite/internal/database/model"

type BuyerService struct {
	Buyer       *model.BuyerProfileModel
	ProdukImage *ProdukImageService
}

func NewBuyerService(m *model.BuyerProfileModel, g *ProdukImageService) *BuyerService {
	return &BuyerService{
		Buyer:       m,
		ProdukImage: g,
	}
}
