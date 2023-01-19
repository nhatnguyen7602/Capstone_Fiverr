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
import { loai_cong_viec } from '@prisma/client';
import { LoaiCongViecService } from './loai-cong-viec.service';

@Controller('api/loai-cong-viec')
export class LoaiCongViecController {
  constructor(private loaiCongViecService: LoaiCongViecService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getLoaiCViec(): Promise<string> {
    throw new HttpException(
      await this.loaiCongViecService.getLoaiCViec(),
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postLoaiCViec(@Body() body: loai_cong_viec): Promise<string> {
    let result = await this.loaiCongViecService.postLoaiCViec(body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getLoaiCViecId(@Param('id') id: string): Promise<string> {
    let result = await this.loaiCongViecService.getLoaiCViecId(+id);

    if (result.check) {
      throw new HttpException(result.data, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async putLoaiCViec(
    @Param('id') id: string,
    @Body('tenLoaiCongViec') tenLoaiCongViec: string,
  ): Promise<string> {
    let result = await this.loaiCongViecService.putLoaiCViec(
      +id,
      tenLoaiCongViec,
    );

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteLoaiCViec(@Param('id') id: string): Promise<string> {
    let result = await this.loaiCongViecService.deleteLoaiCViec(+id);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }
}
