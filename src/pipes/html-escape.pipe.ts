/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { transform as transformed } from 'lodash';
import { escape as htmlEscaped } from 'html-escaper';

@Injectable()
export class HtmlEscapeValidationPipe implements PipeTransform {
  constructor(private readonly fields: string[]) {}

  async transform(value: any, d: ArgumentMetadata) {
    const { metatype } = d;
    const { fields } = this;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    //
    return transformed(
      value,
      (res, content, field) => {
        res[field] = fields.includes(field) ? htmlEscaped(content) : content;
      },
      {},
    );
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
