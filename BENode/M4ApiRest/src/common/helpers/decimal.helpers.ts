import { Decimal128 } from 'mongodb';

export const mapDecimalToNumber = (value: Decimal128): number =>
  value ? Number(value.toString()) : undefined;

export const mapNumberToDecimal = (value: number): Decimal128 =>
  Number.isFinite(value) ? Decimal128.fromString(value.toString()) : undefined;
