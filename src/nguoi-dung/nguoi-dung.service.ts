import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nguoi_dung, PrismaClient } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class NguoiDungService {
  constructor(private jwt: JwtService) {}

  private prisma: PrismaClient = new PrismaClient();

  async getNguoiDung(): Promise<nguoi_dung[]> {
    return await this.prisma.nguoi_dung.findMany();
  }

  async postNguoiDung(thongTin: nguoi_dung): Promise<ResultDTO> {
    let checkAcc = await this.prisma.nguoi_dung.findFirst({
      where: { email: thongTin.email },
    });

    if (checkAcc) {
      return { check: false, message: 'Email đã tồn tại!', data: '' };
    } else {
      await this.prisma.nguoi_dung.create({ data: thongTin });

      return { check: true, message: 'Thêm người dùng thành công!', data: '' };
    }
  }

  async deleteNguoiDung(id: number): Promise<ResultDTO> {
    let checkAcc = await this.prisma.nguoi_dung.findFirst({
      where: { id },
    });

    let checkCViec = await this.prisma.cong_viec.findFirst({
      where: { nguoi_tao: id },
    });

    let checkThue = await this.prisma.thue_cong_viec.findFirst({
      where: { ma_nguoi_thue: id },
    });

    let checkBLuan = await this.prisma.binh_luan.findFirst({
      where: { ma_nguoi_binh_luan: id },
    });

    if (checkAcc) {
      if (checkCViec) {
        await this.prisma.cong_viec.deleteMany({ where: { nguoi_tao: id } });
      }

      if (checkThue) {
        await this.prisma.thue_cong_viec.deleteMany({
          where: { ma_nguoi_thue: id },
        });
      }

      if (checkBLuan) {
        await this.prisma.binh_luan.deleteMany({
          where: { ma_nguoi_binh_luan: id },
        });
      }

      await this.prisma.nguoi_dung.delete({ where: { id } });

      return { check: true, message: 'Xoá thành công!', data: '' };
    } else {
      return { check: false, message: 'Id tài khoản không tồn tại!', data: '' };
    }
  }

  async getNguoiDungId(id: number): Promise<ResultDTO> {
    let checkAcc = await this.prisma.nguoi_dung.findFirst({ where: { id } });

    if (checkAcc) {
      return {
        check: true,
        message: 'Lấy dữ liệu thành công!',
        data: await this.prisma.nguoi_dung.findFirst({ where: { id } }),
      };
    } else {
      return {
        check: false,
        message: 'Id tài khoản không tồn tại!',
        data: '',
      };
    }
  }

  async putNguoiDung(id: number, thongTin: nguoi_dung): Promise<ResultDTO> {
    let checkAcc = await this.prisma.nguoi_dung.findFirst({
      where: { id },
    });

    if (checkAcc) {
      await this.prisma.nguoi_dung.update({ where: { id }, data: thongTin });

      return { check: true, message: 'Cập nhật dữ liệu thành công!' };
    } else {
      return { check: false, message: 'Id tài khoản không tồn tại!' };
    }
  }

  async getSearch(ten: string): Promise<nguoi_dung[]> {
    return await this.prisma.nguoi_dung.findMany({
      where: { name: { contains: ten } },
    });
  }

  async uploadAvatar(token: string, filename: string): Promise<ResultDTO> {
    const decodeJwt: any = this.jwt.decode(token);
    const id: number = decodeJwt.id;

    await this.prisma.nguoi_dung.update({
      data: { avatar: filename },
      where: { id },
    });

    return { check: true, message: 'Cập nhật avatar thành công!' };
  }
}
