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
import { BinhLuanDTO } from 'src/dto/binh-luan.dto';
import { BinhLuanService } from './binh-luan.service';

@Controller('api/binh-luan')
export class BinhLuanController {
  constructor(private binhLuanService: BinhLuanService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getBinhLuan(): Promise<string> {
    throw new HttpException(
      await this.binhLuanService.getBinhLuan(),
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postBinhLuan(@Body() body: BinhLuanDTO): Promise<string> {
    let result = await this.binhLuanService.postBinhLuan(body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async putBinhLuan(
    @Param('id') id: string,
    @Body() body: BinhLuanDTO,
  ): Promise<string> {
    let result = await this.binhLuanService.putBinhLuan(+id, body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteBinhLuan(@Param('id') id: string): Promise<string> {
    let result = await this.binhLuanService.deleteBinhLuan(+id);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/lay-binh-luan-theo-cong-viec/:idCViec')
  async getBinhLuanIdCViec(@Param('idCViec') idCViec: string): Promise<string> {
    let result = await this.binhLuanService.getBinhLuanIdCViec(+idCViec);

    if (result.check) {
      throw new HttpException(result.data, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }
}
