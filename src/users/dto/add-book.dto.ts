import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddBookDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  uid: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  bookId: number;
}
