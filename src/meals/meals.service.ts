// meal.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meal } from './meals.model';
import { CreateMealDto, UpdateMealDto } from './meals.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectModel(Meal)
    private readonly mealModel: typeof Meal,
  ) {}

  async createMeal(
    createMealDto: CreateMealDto,
    userId: string,
  ): Promise<Meal> {
    return this.mealModel.create({ ...createMealDto, user_id: userId });
  }

  async updateMeal(id: number, updateMealDto: UpdateMealDto): Promise<Meal> {
    const meal = await this.mealModel.findByPk(id);
    if (!meal) {
      throw new Error('Meal not found');
    }
    return meal.update(updateMealDto);
  }

  async deleteMeal(id: number): Promise<boolean> {
    const result = await this.mealModel.destroy({ where: { id } });
    return result > 0;
  }

  async getMealsByUserId(userId: number): Promise<Meal[]> {
    return this.mealModel.findAll({ where: { user_id: userId } });
  }

  async getMealById(id: number): Promise<Meal> {
    return this.mealModel.findByPk(id);
  }
}
