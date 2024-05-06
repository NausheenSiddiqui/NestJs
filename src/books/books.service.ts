import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBooks } from './interfaces/books.interface';
import { FilterSortBookDto } from './dto/filter-sort-book.dto';

@Injectable()
export class BooksService {
  private books: IBooks[] = [];

  create(createBookDto: CreateBookDto) {
    try {
      const booksByHighestId = [...this.books].sort((a, b) => b.id - a.id);
      const highestBookId = booksByHighestId[0]?.id || 0;
      const newBook = {
        id: highestBookId + 1,
        ...createBookDto,
      };
      this.books.push(newBook);

      return newBook;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll(filterSortBookDto: FilterSortBookDto): IBooks[] {
    const { title, author, publicationYear, genre, sortBy } = filterSortBookDto;
    let filteredBooks: IBooks[] = this.books;
    if (title) {
      filteredBooks = filteredBooks.filter((book) => book.title === title);
    }
    if (author) {
      filteredBooks = filteredBooks.filter((book) => book.author === author);
    }
    if (publicationYear) {
      filteredBooks = filteredBooks.filter(
        (book) => book.publicationYear === publicationYear,
      );
    }
    if (genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }

    if (
      (title || author || publicationYear || genre) &&
      filteredBooks.length === 0
    ) {
      throw new NotFoundException('Book not found');
    }

    let sortOrder = 'ascending';
    let sortByField: any = sortBy || 'id';

    if (sortBy && sortBy.charAt(0) === '-') {
      sortOrder = 'descending';
      sortByField = sortBy.slice(1);
    }

    filteredBooks.sort((a, b) => {
      let bookA = a[sortByField];
      let bookB = b[sortByField];
      if (typeof bookA === 'string') {
        bookA = bookA.toUpperCase();
        bookB = bookB.toUpperCase();
      }
      if (bookA > bookB) {
        return sortOrder === 'descending' ? -1 : 1;
      }
      if (bookA < bookB) {
        return sortOrder === 'descending' ? 1 : -1;
      }
      return 0;
    });

    return filteredBooks;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, ...updateBookDto };
      }
      return book;
    });

    return this.findOne(id);
  }

  remove(id: number) {
    const removedBook = this.findOne(id);
    this.books = this.books.filter((book) => book.id !== id);

    return removedBook;
  }
}
