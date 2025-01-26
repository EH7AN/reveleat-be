// src/meals/meals.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meal } from './meals.model';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MealResolver } from './meals.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Meal])],
  providers: [MealsService, MealResolver],
  controllers: [MealsController],
  exports: [MealsService],
})
export class MealsModule {}
