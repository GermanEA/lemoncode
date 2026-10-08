import { Decimal128 } from 'mongodb';

export const mapDecimalToNumber = (value: Decimal128): number =>
  value ? Number(value.toString()) : undefined;
