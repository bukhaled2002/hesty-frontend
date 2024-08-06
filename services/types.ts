export type Data<T> = {
  data: T;
};

export type User<T> = {
  user: T;
};

export type MetaData = {
  currentPage: number;
  nextPage: number;
  previousPage: number;
  totalPages: number;
};

export type LinksData = {
  first: string;
  last: string;
  next: string;
  prev: null;
};
