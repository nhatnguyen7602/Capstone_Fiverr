import { Controller, Post, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthService } from './auth.service';
import { NguoiDungDTO } from '../dto/nguoi-dung.dto';
import { ResultDTO } from 'src/dto/result.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('dang-nhap')
  async dangNhap(@Body() body: NguoiDungDTO): Promise<ResultDTO> {
    const { email, pass_word } = body;

    let checkLogin = await this.authService.dangNhap(email, pass_word);

    if (checkLogin.check) {
      throw new HttpException(
        { message: checkLogin.message, data: checkLogin.data },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        { message: checkLogin.message, data: checkLogin.data },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('dang-ky')
  async dangKy(@Body() thongTin: NguoiDungDTO): Promise<string> {
    let checkSignup = await this.authService.dangKy(thongTin);

    if (checkSignup.check) {
      throw new HttpException(checkSignup.message, HttpStatus.OK);
    } else {
      throw new HttpException(checkSignup.message, HttpStatus.NOT_FOUND);
    }
  }
}
