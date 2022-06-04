import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { VALIDATION_CONSTS } from '../../consts';

export class CreateUserDto {
  @ApiProperty(VALIDATION_CONSTS.getIsStringApiProperty('DimaEff'))
  @IsString(VALIDATION_CONSTS.isString)
  @MinLength(VALIDATION_CONSTS.stringMinLength)
  @MaxLength(VALIDATION_CONSTS.stringMaxLength)
  username: string;
}
