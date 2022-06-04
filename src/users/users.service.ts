import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BooksService } from '../books/books.service';
import { MAX_BOOKS_COUNT } from '../consts';
import { AddBookDto } from './dto/add-book.dto';
import { BookEntity } from '../books/entities/book.entity';
import { EXCEPTIONS_MESSAGES } from '../exceptions/exception-messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly booksService: BooksService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.getByUsername(dto.username);
    console.log(user);
    if (user)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.SHOULD_BE_UNIQUE('username'),
        HttpStatus.BAD_REQUEST,
      );
    // subscription === false assignment in UserEntity as default value
    return this.userRepository.save(dto);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async addBook({ uid, bookId }: AddBookDto): Promise<UserEntity> {
    const user = await this.getById(uid);
    const book = await this.booksService.getById(bookId);
    this.checkForAddingBook(user, book);

    user.books.push(book);
    await user.save();

    return user;
  }

  async subscribeUser(uid: number): Promise<UserEntity> {
    const user = await this.getById(uid);

    if (user.subscription)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.ALREADY_SUBSCRIBE,
        HttpStatus.BAD_REQUEST,
      );

    user.subscription = true;
    await user.save();
    return user;
  }

  async unsubscribeUser(uid: number) {
    const user = await this.getById(uid);

    if (!user.subscription)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.ALREADY_UNSUBSCRIBE,
        HttpStatus.BAD_REQUEST,
      );

    user.subscription = false;
    await user.save();
    return user;
  }

  private checkForAddingBook(user: UserEntity, book: BookEntity): void {
    if (!!book.user)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.BOOK_OCCUPIED,
        HttpStatus.BAD_REQUEST,
      );

    if (!user.subscription)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.NOT_SUBSCRIPTION,
        HttpStatus.BAD_REQUEST,
      );

    if (user.books.length >= MAX_BOOKS_COUNT)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.BOOKS_COUNT_OVERFLOWING,
        HttpStatus.BAD_REQUEST,
      );

    if (user.books.some((b) => b.id === book.id))
      throw new HttpException(
        EXCEPTIONS_MESSAGES.BOOK_ALREADY_ADDED,
        HttpStatus.BAD_REQUEST,
      );
  }

  private async getById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneById(id);
  }

  private async getByUsername(
    username: string,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}
