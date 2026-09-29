import { Decimal128 } from 'mongodb';
import { mapDecimalToNumber } from './decimal.helpers.js';

describe('decimal.helpers specs', () => {
  describe('mapDecimalToNumber', () => {
    it.each<{ value: Decimal128 }>([{ value: undefined }, { value: null }])(
      'should return undefined when it feeds value equals $value',
      ({ value }) => {
        // Arrange

        // Act
        const result = mapDecimalToNumber(value);

        // Assert
        expect(result).toBeUndefined();
      }
    );

    it.each<{ value: string; expected: number }>([
      { value: '1.0', expected: 1 },
      { value: '1.5', expected: 1.5 },
      { value: '80.00', expected: 80 },
      { value: '0', expected: 0 },
    ])(
      'should return $expected when it feeds Decimal128 equals $value',
      ({ value, expected }) => {
        // Arrange

        // Act
        const result = mapDecimalToNumber(new Decimal128(value));

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });
});
