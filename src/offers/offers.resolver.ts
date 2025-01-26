// offer.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OffersService } from './offers.service';
import { Offer } from './offers.model';
import { CreateOfferInput, UpdateOfferInput } from './offers.dto';

@Resolver(() => Offer)
export class OfferResolver {
  constructor(private readonly offerService: OffersService) {}

  @Query(() => [Offer])
  async getOffers(): Promise<Offer[]> {
    return this.offerService.getOffers();
  }

  @Query(() => Offer)
  async getOffer(@Args('id') id: number): Promise<Offer> {
    return this.offerService.getOfferById(id);
  }

  @Mutation(() => Offer)
  async createOffer(@Args('input') input: CreateOfferInput): Promise<Offer> {
    return this.offerService.createOffer(input);
  }

  @Mutation(() => Offer)
  async updateOffer(
    @Args('id') id: number,
    @Args('input') input: UpdateOfferInput,
  ): Promise<Offer> {
    return this.offerService.updateOffer(id, input);
  }

  @Mutation(() => Boolean)
  async deleteOffer(@Args('id') id: number): Promise<boolean> {
    return this.offerService.deleteOffer(id);
  }
}