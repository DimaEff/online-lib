import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AddRemoveBookDto } from './dto/add-remove-book.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Get the user by uid' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get(':uid')
  getById(@Param('uid') uid: number) {
    return this.usersService.getById(uid);
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Update the user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UsePipes(ValidationPipe)
  @Put('update/:uid')
  update(@Param('uid') uid: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(uid, dto);
  }

  @ApiOperation({ summary: 'Create the user by uid' })
  @Delete(':uid')
  delete(@Param('uid') uid: number) {
    return this.usersService.delete(uid);
  }

  @ApiOperation({ summary: 'Subscribe the user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('subscribe/:uid')
  subscribeUser(@Param('uid') uid: number) {
    return this.usersService.subscribeUser(uid);
  }

  @ApiOperation({ summary: 'Unsubscribe the user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('unsubscribe/:uid')
  unsubscribeUser(@Param('uid') uid: number) {
    return this.usersService.unsubscribeUser(uid);
  }

  @ApiOperation({ summary: 'Add the book to the user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Put('add-book')
  addBook(@Body() dto: AddRemoveBookDto) {
    return this.usersService.addBook(dto);
  }

  @ApiOperation({ summary: 'Remove the book from the user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Put('remove-book')
  removeBook(@Body() dto: AddRemoveBookDto) {
    return this.usersService.removeBook(dto);
  }
}
