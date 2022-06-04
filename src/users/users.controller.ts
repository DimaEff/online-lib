import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AddBookDto } from './dto/add-book.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('subscribe')
  subscribeUser(@Query('uid') uid: number) {
    console.log(uid);
    return this.usersService.subscribeUser(uid);
  }

  @Get('unsubscribe')
  unsubscribeUser(@Query('uid') uid: number) {
    return this.usersService.unsubscribeUser(uid);
  }

  @ApiOperation({ summary: 'Add the book to the user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Put('add-book')
  addBook(@Body() dto: AddBookDto) {
    return this.usersService.addBook(dto);
  }
}
