import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { thue_cong_viec } from '@prisma/client';
import { check } from 'prettier';
import { ThueCongViecService } from './thue-cong-viec.service';

@Controller('api/thue-cong-viec')
export class ThueCongViecController {
  constructor(private thueCongViecService: ThueCongViecService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getThueCViec(): Promise<string> {
    throw new HttpException(
      await this.thueCongViecService.getThueCViec(),
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postThueCViec(@Body() body: thue_cong_viec): Promise<string> {
    let result = await this.thueCongViecService.postThueCViec(body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getThueCViecId(@Param('id') id: string): Promise<string> {
    let result = await this.thueCongViecService.getThueCViecId(+id);

    if (result.check) {
      throw new HttpException(result.data, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async putThueCViec(
    @Param('id') id: string,
    @Body() body: thue_cong_viec,
  ): Promise<string> {
    let result = await this.thueCongViecService.putThueCViec(+id, body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteThueCViec(@Param('id') id: string): Promise<string> {
    let result = await this.thueCongViecService.deleteThueCViec(+id);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/hoan-thanh-cong-viec/:id')
  async postThueCVHoanThanh(@Param('id') id: string): Promise<string> {
    let result = await this.thueCongViecService.postThueCVHoanThanh(+id);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }
}
