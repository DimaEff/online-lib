import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, type: [BookEntity] })
  @Get()
  getAll() {
    return this.booksService.getAll();
  }

  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({ status: 200, type: BookEntity })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateBookDto) {
    console.log('Create book', dto);
    return this.booksService.create(dto);
  }
}
