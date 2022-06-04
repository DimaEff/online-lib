import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BooksService } from '../books/books.service';
import { MAX_BOOKS_COUNT } from '../consts';
import { AddRemoveBookDto } from './dto/add-remove-book.dto';
import { BookEntity } from '../books/entities/book.entity';
import { EXCEPTIONS_MESSAGES } from '../exceptions/exception-messages';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly booksService: BooksService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    await this.checkIsUsernameUniqueWithException(dto.username);
    // subscription === false assignment in UserEntity as default value
    return this.userRepository.save(dto);
  }

  async update(uid: number, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getById(uid);
    if (dto.username) {
      await this.checkIsUsernameUniqueWithException(dto.username, user);
    }

    return this.userRepository.save({
      id: uid,
      ...user,
      ...dto,
    });
  }

  async delete(uid: number): Promise<void> {
    const user = await this.getById(uid);
    await user.remove();
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneById(id);
    if (!user)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.NOT_EXISTS('user'),
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }

  async addBook({ uid, bookId }: AddRemoveBookDto): Promise<UserEntity> {
    const user = await this.getById(uid);
    const book = await this.booksService.getById(bookId);
    this.checkForAddingBookWithException(user, book);

    user.books.push(book);
    await user.save();

    return user;
  }

  async removeBook(dto: AddRemoveBookDto): Promise<UserEntity> {
    const user = await this.getById(dto.uid);
    this.checkIsUserSubscriberWithException(user);
    if (!this.checkIsUserAssignedBook(user, dto.bookId))
      throw new HttpException(
        EXCEPTIONS_MESSAGES.BOOK_NOT_ADDED,
        HttpStatus.BAD_REQUEST,
      );

    user.books = user.books.filter(({ id }) => id !== dto.bookId);
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
    // clearing books when unsubscribing
    user.books = [];
    await user.save();
    return user;
  }

  private checkForAddingBookWithException(
    user: UserEntity,
    book: BookEntity,
  ): void {
    if (this.checkIsUserAssignedBook(user, book.id))
      throw new HttpException(
        EXCEPTIONS_MESSAGES.BOOK_ALREADY_ADDED,
        HttpStatus.BAD_REQUEST,
      );

    console.log(!!book.user && book.user.id !== user.id);
    if (!!book.user && book.user.id !== user.id)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.BOOK_OCCUPIED,
        HttpStatus.BAD_REQUEST,
      );

    this.checkIsUserSubscriberWithException(user);

    if (user.books.length >= MAX_BOOKS_COUNT)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.BOOKS_COUNT_OVERFLOWING,
        HttpStatus.BAD_REQUEST,
      );
  }

  private checkIsUserAssignedBook(user: UserEntity, bookId: number): boolean {
    return user.books.some((b) => b.id === bookId);
  }

  private checkIsUserSubscriberWithException(user: UserEntity): void {
    if (!user.subscription)
      throw new HttpException(
        EXCEPTIONS_MESSAGES.NOT_SUBSCRIPTION,
        HttpStatus.BAD_REQUEST,
      );
  }

  private async checkIsUsernameUniqueWithException(
    username: string,
    user?: UserEntity,
  ): Promise<void> {
    const u = await this.getByUsername(username);
    if (u && (!user || user.id !== u.id))
      throw new HttpException(
        EXCEPTIONS_MESSAGES.SHOULD_BE_UNIQUE('username'),
        HttpStatus.BAD_REQUEST,
      );
  }

  private async getByUsername(
    username: string,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}
