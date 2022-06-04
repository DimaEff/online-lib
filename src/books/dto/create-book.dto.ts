import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { VALIDATION_CONSTS } from '../../consts';

export class CreateBookDto {
  @ApiProperty(VALIDATION_CONSTS.getIsStringApiProperty('Lord of the Rings'))
  @IsString(VALIDATION_CONSTS.isString)
  @MinLength(VALIDATION_CONSTS.stringMinLength)
  @MaxLength(VALIDATION_CONSTS.stringMaxLength)
  title: string;
}
