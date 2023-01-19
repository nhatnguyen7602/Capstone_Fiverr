import { Injectable } from '@nestjs/common';
import { cong_viec, PrismaClient } from '@prisma/client';
import { CongViecDTO } from 'src/dto/cong-viec.dto';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class CongViecService {
  private prisma: PrismaClient = new PrismaClient();

  async getCongViec(): Promise<cong_viec[]> {
    return await this.prisma.cong_viec.findMany();
  }

  async postCongViec(body: CongViecDTO): Promise<ResultDTO> {
    await this.prisma.cong_viec.create({ data: body });

    return { check: true, message: 'Thêm công việc thành công!' };
  }

  async getCongViecid(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.cong_viec.findFirst({ where: { id } });

    if (checkId) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data: checkId };
    } else {
      return {
        check: false,
        message: 'Id công việc không tồn tại!',
      };
    }
  }

  async putCongViec(id: number, body: CongViecDTO): Promise<ResultDTO> {
    let checkId = await this.prisma.cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.cong_viec.update({ where: { id }, data: body });

      return { check: true, message: 'Cập nhật công việc thành công!' };
    } else {
      return {
        check: false,
        message: 'Id công việc không tồn tại!',
      };
    }
  }

  async deleteCongViec(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.cong_viec.delete({ where: { id } });

      return { check: true, message: 'Xoá công việc thành công!' };
    } else {
      return {
        check: false,
        message: 'Id công việc không tồn tại!',
      };
    }
  }

  async postHinhCViec(id: number, filename: string): Promise<ResultDTO> {
    let checkId = await this.prisma.cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.cong_viec.update({
        data: { hinh_anh: filename },
        where: { id },
      });

      return { check: true, message: 'Thêm hình ảnh thành công!' };
    } else {
      return {
        check: false,
        message: 'Id công việc không tồn tại!',
      };
    }
  }

  async getCongViecTen(ten: string): Promise<ResultDTO> {
    let data = await this.prisma.cong_viec.findMany({
      where: { ten_cong_viec: { contains: ten } },
    });

    return { check: true, message: 'Lấy dữ liệu thành công!', data };
  }
}
