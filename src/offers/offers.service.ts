// offer.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Offer } from './offers.model';
import { CreateOfferInput, UpdateOfferInput } from './offers.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer)
    private readonly offerModel: typeof Offer,
  ) {}

  async getOffers(): Promise<Offer[]> {
    return await this.offerModel.findAll();
  }

  async getOfferById(id: number): Promise<Offer> {
    return await this.offerModel.findByPk(id);
  }

  async createOffer(input: CreateOfferInput): Promise<Offer> {
    return await this.offerModel.create({
      ...input,
      availableServings: input.servings,
    });
  }

  async updateOffer(id: number, input: UpdateOfferInput): Promise<Offer> {
    const offer = await this.offerModel.findByPk(id);
    if (!offer) {
      throw new Error('Offer not found');
    }
    await offer.update(input);
    return offer;
  }

  async deleteOffer(id: number): Promise<boolean> {
    const result = await this.offerModel.destroy({ where: { id } });
    return result > 0;
  }
}
