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
  async getOffers(): Promise<OffersDto[]> {
    return this.offerService.getOffers();
  }

  @Query(() => OffersDto, { name: 'getOffer' })
  async getOffer(@Args('id') id: number): Promise<OffersDto> {
    return this.offerService.getOfferById(id);
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
