import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
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
import { nguoi_dung } from '@prisma/client';
import { diskStorage } from 'multer';
import { UploadDto } from 'src/dto/upload.dto';
import { NguoiDungService } from './nguoi-dung.service';

@Controller('api/nguoi-dung')
export class NguoiDungController {
  constructor(private NguoiDungService: NguoiDungService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getNguoiDung(): Promise<string> {
    throw new HttpException(
      await this.NguoiDungService.getNguoiDung(),
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postNguoiDung(@Body() thongTin: nguoi_dung): Promise<string> {
    let checkAcc = await this.NguoiDungService.postNguoiDung(thongTin);

    if (checkAcc.check) {
      throw new HttpException(checkAcc.message, HttpStatus.OK);
    } else {
      throw new HttpException(checkAcc.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteNguoiDung(@Param('id') id: string): Promise<string> {
    let checkAcc = await this.NguoiDungService.deleteNguoiDung(Number(id));

    if (checkAcc.check) {
      throw new HttpException(checkAcc.message, HttpStatus.OK);
    } else {
      throw new HttpException(checkAcc.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getNguoiDungId(@Param('id') id: string): Promise<string> {
    let checkAcc = await this.NguoiDungService.getNguoiDungId(+id);

    if (checkAcc.check) {
      throw new HttpException(checkAcc.data, HttpStatus.OK);
    } else {
      throw new HttpException(checkAcc.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async putNguoiDung(
    @Param('id') id: string,
    @Body() thongTin: nguoi_dung,
  ): Promise<string> {
    let checkAcc = await this.NguoiDungService.putNguoiDung(+id, thongTin);

    if (checkAcc.check) {
      throw new HttpException(checkAcc.message, HttpStatus.OK);
    } else {
      throw new HttpException(checkAcc.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search/:ten')
  async getSearch(@Param('ten') ten: string): Promise<string> {
    throw new HttpException(
      await this.NguoiDungService.getSearch(ten),
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();

          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post('upload-avatar')
  async upload(
    @Headers('token') token: string,
    @UploadedFile() file: UploadDto,
  ): Promise<string> {
    let result = await this.NguoiDungService.uploadAvatar(token, file.filename);

    if (result.check) {
      throw new HttpException(result.message, HttpStatus.OK);
    } else {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
  }
}
