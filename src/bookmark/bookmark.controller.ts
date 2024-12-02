import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';
import {
  CreateBookMarkDto,
  EditBookMarkDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Get(':id')
  getBookmarks(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {}

  @Get()
  getBookmarkById(
    @GetUser('id') userId: number,
  ) {}

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookMarkDto,
  ) {}

  @Delete()
  deleteBookmarkById(
    @GetUser('id') userId: number,
  ) {}

  @Patch()
  updateBookmarkById(
    @GetUser('id') userId: number,
    @Body() dto: EditBookMarkDto,
  ) {}
}
