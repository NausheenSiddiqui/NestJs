import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterSortBookDto } from './dto/filter-sort-book.dto';
import { BooksResponseDTO } from './dto/books-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): BooksResponseDTO {
    const book = this.booksService.create(createBookDto);
    return plainToInstance(BooksResponseDTO, book);
  }

  @Get()
  findAll(@Query() filterSortBookDto: FilterSortBookDto): BooksResponseDTO[] {
    const books = this.booksService.findAll(filterSortBookDto);
    return plainToInstance(BooksResponseDTO, books);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): BooksResponseDTO {
    const book = this.booksService.findOne(id);
    return plainToInstance(BooksResponseDTO, book);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): BooksResponseDTO {
    const book = this.booksService.update(id, updateBookDto);
    return plainToInstance(BooksResponseDTO, book);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): BooksResponseDTO {
    const book = this.booksService.remove(id);
    return plainToInstance(BooksResponseDTO, book);
  }
}
