import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OffersService } from './offers.service';
import { CreateOfferInput, OffersDto, UpdateOfferInput } from './offers.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/gaurds/jwt.guard';
import { AuthUser } from '../users/user.decorator';

@Resolver()
export class OfferResolver {
  constructor(private readonly offerService: OffersService) {}

  @Query(() => [OffersDto], { name: 'getAllOffers' })
  async getOffers(
    @Args('latitude', { type: () => Number }) latitude: number,
    @Args('longitude', { type: () => Number }) longitude: number,
    @Args('date', { type: () => String }) date: string // Expecting format: YYYY-MM-DD
  ): Promise<OffersDto[]> {
    return this.offerService.getOffers(latitude, longitude, date);
  }

  @Query(() => OffersDto, { name: 'getOffer' })
  async getOffer(@Args('id') id: number): Promise<OffersDto> {
    return this.offerService.getOfferById(id);
  }

  @Query(() => [OffersDto], { name: 'getOffersByIds' })
  async getOffersByIds(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Promise<OffersDto[]> {
    return this.offerService.getOffersByIds(ids);
  }

  @Mutation(() => OffersDto, { name: 'createOffer' })
  @UseGuards(JwtAuthGuard)
  async createOffer(
    @AuthUser() user,
    @Args('input') input: CreateOfferInput,
  ): Promise<OffersDto> {
    return this.offerService.createOffer(input, user?.userId);
  }

  @Mutation(() => OffersDto, { name: 'updateOffer' })
  async updateOffer(
    @Args('id') id: number,
    @Args('input') input: UpdateOfferInput,
  ): Promise<OffersDto> {
    return this.offerService.updateOffer(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteOffer' })
  async deleteOffer(@Args('id') id: number): Promise<boolean> {
    return this.offerService.deleteOffer(id);
  }
}
