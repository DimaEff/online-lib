import { ApiPropertyOptions } from '@nestjs/swagger';
import { ValidationOptions } from 'class-validator';

interface Validation {
  stringMinLength: number;
  stringMaxLength: number;
  getIsStringApiProperty: (example?: string | number) => ApiPropertyOptions;
  isString: ValidationOptions;
}

// object using for validating in dto
export const VALIDATION_CONSTS: Validation = {
  stringMinLength: 3,
  stringMaxLength: 32,
  getIsStringApiProperty(example?: string | number) {
    return {
      minimum: this.stringMinLength,
      maximum: this.stringMaxLength,
      example,
    };
  },
  isString: { message: 'Should be a string' },
};

export const MAX_BOOKS_COUNT = 5;
