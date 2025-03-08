import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MealsService } from './meals.service';
import { Meal } from './meals.model';
import { CreateMealDto, UpdateMealDto } from './meals.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt.guard';
import { AuthUser } from 'src/users/user.decorator';
@Resolver(() => Meal)
export class MealResolver {
  constructor(private readonly mealService: MealsService) {}

  @Query(() => [Meal])
  async getMeals(@Args('user_id') userId: number): Promise<Meal[]> {
    return this.mealService.getMealsByUserId(userId);
  }

  @Query(() => Meal)
  async getMeal(@Args('id') id: number): Promise<Meal> {
    return this.mealService.getMealById(id);
  }

  @Mutation(() => Meal)
  @UseGuards(JwtAuthGuard)
  async createMeal(
    @AuthUser() user,
    @Args('input') input: CreateMealDto,
  ): Promise<Meal> {
    console.log(user);
    return this.mealService.createMeal(input, user.id);
  }

  @Mutation(() => Meal)
  async updateMeal(
    @Args('id') id: number,
    @Args('input') input: UpdateMealDto,
  ): Promise<Meal> {
    return this.mealService.updateMeal(id, input);
  }

  @Mutation(() => Boolean)
  async deleteMeal(@Args('id') id: number): Promise<boolean> {
    return this.mealService.deleteMeal(id);
  }
}
