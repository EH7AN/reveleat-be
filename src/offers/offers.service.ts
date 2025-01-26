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
    const offers = await this.offerModel.findAll();
    return offers.map((offer) => this.mapToGraphQLType(offer));
  }

  async getOfferById(id: number): Promise<Offer> {
    const offer = await this.offerModel.findByPk(id);
    return this.mapToGraphQLType(offer);
  }

  async createOffer(input: CreateOfferInput): Promise<Offer> {
    const offer = await this.offerModel.create({
      ...input,
      available_servings: input.servings,
    });
    return this.mapToGraphQLType(offer);
  }

  async updateOffer(id: number, input: UpdateOfferInput): Promise<Offer> {
    const offer = await this.offerModel.findByPk(id);
    if (!offer) {
      throw new Error('Offer not found');
    }
    await offer.update(input);
    return this.mapToGraphQLType(offer);
  }

  async deleteOffer(id: number): Promise<boolean> {
    const result = await this.offerModel.destroy({ where: { id } });
    return result > 0;
  }

  private mapToGraphQLType(offer: Offer): Offer {
    return {
      id: offer.id,
      meal_id: offer.meal_id,
      address_id: offer.address_id,
      order_open_at: offer.order_open_at,
      delivery_start_at: offer.delivery_start_at,
      delivery_complete_at: offer.delivery_complete_at,
      servings: offer.servings,
      available_servings: offer.available_servings,
      price: offer.price,
      created_at: offer.created_at,
      updated_at: offer.updated_at,
    } as Offer;
  }
}