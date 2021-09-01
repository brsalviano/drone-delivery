/*
 * Class for create a specific page with data and metadata.
 */
export class Page<T> {
  data: T[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;

  constructor(
    totalItems: number,
    data: T[],
    itemsPerPage: number,
    currentPage = 1,
  ) {
    this.totalItems = totalItems;
    this.data = data;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = currentPage;

    this.totalPages = Math.ceil(this.totalItems / itemsPerPage);
  }
}
