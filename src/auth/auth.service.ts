import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaClient } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';
import { NguoiDungDTO } from '../dto/nguoi-dung.dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  private prisma: PrismaClient = new PrismaClient();

  async dangNhap(email: string, pass_word: string): Promise<ResultDTO> {
    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      if (checkEmail.pass_word == pass_word) {
        let token = this.jwt.sign(checkEmail, {
          expiresIn: '10d',
          secret: this.config.get('SECRET_KEY'),
        });

        return { check: true, message: 'Đăng nhập thành công!', data: token };
      } else {
        return {
          check: false,
          message: 'Mật khẩu sai!',
          data: '',
        };
      }
    } else {
      return {
        check: false,
        message: 'Email sai!',
        data: '',
      };
    }
  }

  async dangKy(thongTin: NguoiDungDTO): Promise<ResultDTO> {
    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: thongTin.email,
      },
    });

    if (!checkEmail) {
      await this.prisma.nguoi_dung.create({ data: thongTin });

      return { check: true, message: 'Đăng ký thành công!', data: '' };
    } else {
      return {
        check: false,
        message: 'Email đã tồn tại. Vui lòng sử dụng email khác!',
        data: '',
      };
    }
  }
}
