import { HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: any) {

    // Parse the incoming value to an integer
    if (!this.isInt(value)) {
      throw new HttpException("Validation failed (integer number is expected)", 400);
    }

    // Parse the incoming value to a positive integer
    value = parseInt(value, 10);

    // Check if the value is a positive integer
    if (!this.isPositive(value)) {
      throw new HttpException("Validation failed (positive number is expected)", 400);
    }
    return value;
  }

  // Check if the value is an integer
  protected isInt(value): boolean {
    return /^-?\d+$/.test(value) && isFinite(value as any);
  }

  // Check if the value is a positive
  protected isPositive(value): boolean {
    return value > 0;
  }
}