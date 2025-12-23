package service

import (
	"context"
	"ecobite/internal/database/model"

	"github.com/google/uuid"
)

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

func (s *BuyerService) GetBuyerProfileByUserID(ctx context.Context, id uuid.UUID) (*model.BuyerProfile, error) {
	var buyer model.BuyerProfile
	if err := s.Buyer.DB.WithContext(ctx).First(&buyer, "user_id = ?", id).Error; err != nil {
		return nil, err
	}
	return &buyer, nil
}
