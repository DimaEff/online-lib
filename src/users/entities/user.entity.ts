import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { BookEntity } from '../../books/entities/book.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'boolean', default: false })
  subscription: boolean;

  @OneToMany((type) => BookEntity, (book) => book.user, { eager: true })
  @JoinColumn()
  books: BookEntity[];
}
