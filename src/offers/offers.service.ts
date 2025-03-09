import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Offer } from './offers.model';
import { CreateOfferInput, OffersDto, UpdateOfferInput } from './offers.dto';
import { MealsService } from '../meals/meals.service';
import { AddressService } from '../address/address.service';
@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer)
    private readonly offerModel: typeof Offer,
    private readonly mealsService: MealsService,
    private readonly addressService: AddressService,
  ) {}

  async getOffers(): Promise<OffersDto[]> {
    return await this.offerModel.findAll();
  }

  async getOfferById(id: number): Promise<Offer> {
    return await this.offerModel.findByPk(id);
  }

  async createOffer(input: CreateOfferInput, userId: number): Promise<Offer> {
    const meal = await this.mealsService.createMeal(
      {
        photo_uri: input.offerImage,
        name: input.offerName,
      },
      userId,
    );
    const address = await this.addressService.createAddress({
      address: input.address,
      latitude: input.latitude,
      longitude: input.longitude,
      user_id: userId,
    });

    console.log('address', address);
    return await this.offerModel.create({
      ...input,
      mealIid: meal.id,
      addressId: address.id,
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
