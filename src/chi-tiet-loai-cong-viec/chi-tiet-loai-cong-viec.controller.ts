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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CTLoaiCVDTO } from 'src/dto/chi-tiet-loai-cong-viec.dto';
import { UploadDto } from 'src/dto/upload.dto';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';

@Controller('api/chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(private chiTietLoaiCongViecService: ChiTietLoaiCongViecService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCTLoaiCViec(): Promise<string> {
    throw new HttpException(
      await this.chiTietLoaiCongViecService.getCTLoaiCViec(),
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postCTLoaiCViec(@Body() body: CTLoaiCVDTO): Promise<string> {
    let result = await this.chiTietLoaiCongViecService.postCTLoaiCViec(body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getCTLoaiCViecId(@Param('id') id: string): Promise<string> {
    let result = await this.chiTietLoaiCongViecService.getCTLoaiCViecId(+id);

    if (result.check) {
      throw new HttpException(result.data, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async putCTLoaiCViec(
    @Param('id') id: string,
    @Body('ten_chi_tiet') ten_chi_tiet: string,
  ): Promise<string> {
    let result = await this.chiTietLoaiCongViecService.putCTLoaiCViec(
      +id,
      ten_chi_tiet,
    );

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('hinh_anh', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();

          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post('upload-hinh-chi-tiet-loai-cong-viec/:id')
  async postHinhCTLoai(
    @Param('id') id: string,
    @UploadedFile() file: UploadDto,
  ): Promise<string> {
    let result = await this.chiTietLoaiCongViecService.postHinhCTLoai(
      +id,
      file.filename,
    );

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteCTLoaiCViec(@Param('id') id: string): Promise<string> {
    let result = await this.chiTietLoaiCongViecService.deleteCTLoaiCViec(+id);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }
}
