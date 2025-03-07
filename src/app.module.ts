import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { MealsModule } from './meals/meals.module';
import { AddressModule } from './address/address.module';
import { OffersModule } from './offers/offers.module';
import { FinanceModule } from './finance/finance.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { resolve } from 'path';
import { OrderItemsModule } from './orderItems/order.items.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrdersModule,
    MealsModule,
    OffersModule,
    AddressModule,
    FinanceModule,
    OrderItemsModule,
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve('./generated/schema.gql'),
      debug: false,
      context: ({ req }) => ({ headers: req.headers }),
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
