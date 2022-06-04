import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BooksModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
