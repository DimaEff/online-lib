import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(dto: CreateBookDto): Promise<BookEntity> {
    return this.bookRepository.save(dto);
  }

  async getAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  async getById(id: number): Promise<BookEntity> {
    return this.bookRepository.findOneById(id);
  }
}
