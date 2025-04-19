import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Offer } from './offers.model';
import { CreateOfferInput, OffersDto, UpdateOfferInput } from './offers.dto';
import { MealsService } from '../meals/meals.service';
import { AddressService } from '../address/address.service';
import { Meal } from 'src/meals/meals.model';
import { Address } from 'src/address/address.model';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { User } from 'src/users/users.model';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer)
    private readonly offerModel: typeof Offer,
    private readonly mealsService: MealsService,
    private readonly addressService: AddressService,
  ) {}

  async getOffers(
    latitude: number,
    longitude: number,
    date: string,
  ): Promise<Offer[]> {
    const radius = 0.005; // Approx 500m in degrees (depends on lat)
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    return await Offer.findAll({
      include: [
        {
          model: Address,
          required: true,
          where: {
            latitude: { [Op.between]: [latitude - radius, latitude + radius] },
            longitude: {
              [Op.between]: [longitude - radius, longitude + radius],
            },
          },
        },
        { model: Meal },
      ],
      where: {
        orderOpenAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });
  }

  async getOfferById(id: number): Promise<Offer> {
    return await this.offerModel.findByPk(id);
  }

  async createOffer(input: CreateOfferInput, userId: string): Promise<Offer> {
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
    return await this.offerModel.create({
      mealId: meal.id,
      addressId: address.id,
      availableServings: input.servings,
      price: input.price,
      orderOpenAt: input.orderOpenAt,
      orderCloseAt: input.orderCloseAt,
      deliveryStartAt: input.deliveryStartAt,
      deliveryCompleteAt: input.deliveryCompleteAt,
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

  async getOffersByIds(ids: string[]): Promise<OffersDto[]> {
    return await this.offerModel.findAll({
      include: [{ model: Meal, include: [{ model: User }] }, Address],
      where: { id: ids },
    });
  }

  async getMyOffers(userId: string): Promise<Offer[]> {
    return await this.offerModel.findAll({
      include: [Meal, Address],
      where: {
        '$meal.user_id$': userId,
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async getOrderCountForOffer(offerId: string): Promise<number> {
    const result: any = await this.offerModel.sequelize.query(
      `
      SELECT SUM(quantity) as total
      FROM Orders
      WHERE offer_id = :offerId
      `,
      {
        replacements: { offerId },
        type: QueryTypes.SELECT,
        plain: true,
      },
    );
    return result?.total || 0;
}
}
