import { Injectable } from '@nestjs/common';
import {
  CreateBookMarkDto,
  EditBookMarkDto,
} from './dto';

@Injectable()
export class BookmarkService {
  getBookmarks(userId: number) {}

  getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {}

  createBookmark(
    userId: number,
    dto: CreateBookMarkDto,
  ) {}

  deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {}

  updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookMarkDto,
  ) {}
}
