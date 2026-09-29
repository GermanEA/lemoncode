import { getPagination, paginateList } from './pagination.helpers.js';

describe('pagination.helpers specs', () => {
  describe('getPagination', () => {
    it.each<{ page: number; pageSize: number }>([
      { page: undefined, pageSize: undefined },
      { page: NaN, pageSize: NaN },
      { page: 1, pageSize: undefined },
      { page: undefined, pageSize: 10 },
      { page: 0, pageSize: 10 },
      { page: 1, pageSize: 0 },
      { page: -1, pageSize: 10 },
      { page: 1.5, pageSize: 10 },
    ])(
      'should return skip 0 and limit 0 when it feeds page equals $page and pageSize equals $pageSize',
      ({ page, pageSize }) => {
        // Arrange

        // Act
        const result = getPagination(page, pageSize);

        // Assert
        expect(result).toEqual({ skip: 0, limit: 0 });
      }
    );

    it.each<{ page: number; pageSize: number; skip: number }>([
      { page: 1, pageSize: 10, skip: 0 },
      { page: 2, pageSize: 10, skip: 10 },
      { page: 3, pageSize: 5, skip: 10 },
    ])(
      'should return skip $skip and limit $pageSize when it feeds page equals $page and pageSize equals $pageSize',
      ({ page, pageSize, skip }) => {
        // Arrange

        // Act
        const result = getPagination(page, pageSize);

        // Assert
        expect(result).toEqual({ skip, limit: pageSize });
      }
    );
  });

  describe('paginateList', () => {
    const list = [1, 2, 3, 4, 5];

    it('should return the whole list when it feeds no page and pageSize', () => {
      // Arrange

      // Act
      const result = paginateList(list);

      // Assert
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(result).not.toBe(list);
    });

    it('should return the second page when it feeds page 2 and pageSize 2', () => {
      // Arrange

      // Act
      const result = paginateList(list, 2, 2);

      // Assert
      expect(result).toEqual([3, 4]);
    });

    it('should return the remaining items when it feeds the last page', () => {
      // Arrange

      // Act
      const result = paginateList(list, 3, 2);

      // Assert
      expect(result).toEqual([5]);
    });

    it('should return empty array when it feeds a page out of range', () => {
      // Arrange

      // Act
      const result = paginateList(list, 4, 2);

      // Assert
      expect(result).toEqual([]);
    });
  });
});
