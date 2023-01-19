import { Injectable } from '@nestjs/common';
import { loai_cong_viec, prisma, PrismaClient } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class LoaiCongViecService {
  private prisma: PrismaClient = new PrismaClient();

  async getLoaiCViec(): Promise<loai_cong_viec[]> {
    return await this.prisma.loai_cong_viec.findMany();
  }

  async postLoaiCViec(body: loai_cong_viec): Promise<ResultDTO> {
    let checkTen = await this.prisma.loai_cong_viec.findFirst({
      where: { ten_loai_cong_viec: body.ten_loai_cong_viec },
    });

    if (checkTen) {
      return { check: false, message: 'Loại công việc đã tồn tại!' };
    } else {
      await this.prisma.loai_cong_viec.create({ data: body });

      return { check: true, message: 'Thêm loại công việc thành công!' };
    }
  }

  async getLoaiCViecId(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.loai_cong_viec.findFirst({ where: { id } });

    if (checkId) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data: checkId };
    } else {
      return { check: false, message: 'Id loại công việc không tồn tại!' };
    }
  }

  async putLoaiCViec(
    id: number,
    ten_loai_cong_viec: string,
  ): Promise<ResultDTO> {
    let checkId = await this.prisma.loai_cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.loai_cong_viec.update({
        where: { id },
        data: { ten_loai_cong_viec },
      });

      return { check: true, message: 'Cập nhật thành công!' };
    } else {
      return { check: false, message: 'Id loại công việc không tồn tại!' };
    }
  }

  async deleteLoaiCViec(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.loai_cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.loai_cong_viec.delete({ where: { id } });

      return { check: true, message: 'Xoá thành công!' };
    } else {
      return { check: false, message: 'Id loại công việc không tồn tại!' };
    }
  }
}
