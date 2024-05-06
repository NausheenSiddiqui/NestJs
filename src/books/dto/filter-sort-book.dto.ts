import { Type } from 'class-transformer';
import { IsString, IsInt, IsEnum, IsOptional } from 'class-validator';

export class FilterSortBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  publicationYear?: number;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsEnum(
    [
      'id',
      'title',
      '-title',
      'author',
      '-author',
      'publicationYear',
      '-publicationYear',
      'genre',
      '-genre'      
    ],
    { message: 'Valid sortBy required' },
  )
  @IsOptional()
  sortBy?:
    | 'id'
    | 'title'
    | '-title'
    | 'author'
    | '-author'
    | 'publicationYear'
    | '-publicationYear'
    | 'genre'
    | '-genre';
}
