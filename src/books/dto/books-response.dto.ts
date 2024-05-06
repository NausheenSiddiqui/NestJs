import { Expose } from 'class-transformer';

export class BooksResponseDTO {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  publicationYear: number;

  @Expose()
  genre: string;
}
