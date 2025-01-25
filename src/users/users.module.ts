import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Import the User model
  providers: [UsersResolver, UsersService],
  exports: [SequelizeModule, UsersService], // Export SequelizeModule!
})
export class UsersModule {}
