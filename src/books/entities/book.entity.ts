import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @ManyToOne((type) => UserEntity, (user) => user.books, {
    nullable: true,
    eager: false,
  })
  user: UserEntity | null;
}
