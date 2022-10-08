import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class HtmlEscapeValidationPipe implements PipeTransform {
    private readonly fields;
    constructor(fields: string[]);
    transform(value: any, d: ArgumentMetadata): Promise<any>;
    private toValidate;
}
