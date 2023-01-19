import { Injectable } from '@nestjs/common';
import { binh_luan, PrismaClient } from '@prisma/client';
import { BinhLuanDTO } from 'src/dto/binh-luan.dto';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class BinhLuanService {
  private prisma: PrismaClient = new PrismaClient();

  async getBinhLuan(): Promise<binh_luan[]> {
    return await this.prisma.binh_luan.findMany();
  }

  async postBinhLuan(body: BinhLuanDTO): Promise<ResultDTO> {
    await this.prisma.binh_luan.create({
      data: { ...body, ngay_binh_luan: new Date(body.ngay_binh_luan) },
    });

    return { check: true, message: 'Thêm bình luận thành công!' };
  }

  async putBinhLuan(id: number, body: BinhLuanDTO): Promise<ResultDTO> {
    let checkId = await this.prisma.binh_luan.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.binh_luan.update({
        data: { ...body, ngay_binh_luan: new Date(body.ngay_binh_luan) },
        where: { id },
      });

      return { check: true, message: 'Sửa bình luận thành công!' };
    } else {
      return { check: false, message: 'Id bình luận không tồn tại!' };
    }
  }

  async deleteBinhLuan(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.binh_luan.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.binh_luan.delete({ where: { id } });

      return { check: true, message: 'Xoá bình luận thành công!' };
    } else {
      return { check: false, message: 'Id bình luận không tồn tại!' };
    }
  }

  async getBinhLuanIdCViec(idCViec: number): Promise<ResultDTO> {
    let checkIdCViec = await this.prisma.cong_viec.findFirst({
      where: { id: idCViec },
    });

    if (checkIdCViec) {
      let data = await this.prisma.cong_viec.findFirst({
        where: { id: idCViec },
        select: {
          id: true,
          ten_cong_viec: true,
          binh_luan: true,
        },
      });

      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Id công việc không tồn tại!' };
    }
  }
}
