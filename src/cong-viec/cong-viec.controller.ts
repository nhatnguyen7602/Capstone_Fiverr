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
import { CongViecDTO } from 'src/dto/cong-viec.dto';
import { UploadDto } from 'src/dto/upload.dto';
import { CongViecService } from './cong-viec.service';

@Controller('api/cong-viec')
export class CongViecController {
  constructor(private congViecService: CongViecService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCongViec(): Promise<string> {
    throw new HttpException(
      await this.congViecService.getCongViec(),
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postCongViec(@Body() body: CongViecDTO): Promise<string> {
    let result = await this.congViecService.postCongViec(body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getCongViecId(@Param('id') id: string): Promise<string> {
    let result = await this.congViecService.getCongViecid(+id);

    if (result.check) {
      throw new HttpException(result.data, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async putCongViec(
    @Param('id') id: string,
    @Body() body: CongViecDTO,
  ): Promise<string> {
    let result = await this.congViecService.putCongViec(+id, body);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteCongViec(@Param('id') id: string): Promise<string> {
    let result = await this.congViecService.deleteCongViec(+id);

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
  @Post('upload-hinh-cong-viec/:id')
  async postHinhCTLoai(
    @Param('id') id: string,
    @UploadedFile() file: UploadDto,
  ): Promise<string> {
    let result = await this.congViecService.postHinhCViec(+id, file.filename);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('lay-ds-cong-viec-theo-ten/:ten')
  async getCongViecTen(@Param('ten') ten: string): Promise<string> {
    let result = await this.congViecService.getCongViecTen(ten);

    if (result.check) {
      throw new HttpException(result.data, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }
}
