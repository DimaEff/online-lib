import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { VALIDATION_CONSTS } from '../../consts';

export class UpdateUserDto {
  @ApiProperty({
    ...VALIDATION_CONSTS.getIsStringApiProperty('DimaEff'),
    uniqueItems: true,
    required: false,
  })
  @IsOptional()
  @IsString(VALIDATION_CONSTS.isString)
  @MinLength(VALIDATION_CONSTS.stringMinLength)
  @MaxLength(VALIDATION_CONSTS.stringMaxLength)
  username: string | undefined;
}
