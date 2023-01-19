import { Injectable } from '@nestjs/common';
import { PrismaClient, thue_cong_viec } from '@prisma/client';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class ThueCongViecService {
  private prisma: PrismaClient = new PrismaClient();

  async getThueCViec(): Promise<thue_cong_viec[]> {
    return await this.prisma.thue_cong_viec.findMany();
  }

  async postThueCViec(body: thue_cong_viec): Promise<ResultDTO> {
    await this.prisma.thue_cong_viec.create({
      data: { ...body, ngay_thue: new Date(body.ngay_thue) },
    });

    return { check: true, message: 'Thêm thuê công việc thành công!' };
  }

  async getThueCViecId(id: number): Promise<ResultDTO> {
    let data = await this.prisma.thue_cong_viec.findFirst({ where: { id } });

    if (data) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data };
    } else {
      return { check: false, message: 'Id thuê công việc không tồn tại!' };
    }
  }

  async putThueCViec(id: number, body: thue_cong_viec): Promise<ResultDTO> {
    let checkId = await this.prisma.thue_cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.thue_cong_viec.update({
        where: { id },
        data: { ...body, ngay_thue: new Date(body.ngay_thue) },
      });

      return { check: true, message: 'Sửa thuê công việc thành công!' };
    } else {
      return { check: false, message: 'Id thuê công việc không tồn tại!' };
    }
  }

  async deleteThueCViec(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.thue_cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.thue_cong_viec.delete({ where: { id } });

      return { check: true, message: 'Xoá thuê công việc thành công!' };
    } else {
      return { check: false, message: 'Id thuê công việc không tồn tại!' };
    }
  }

  async postThueCVHoanThanh(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.thue_cong_viec.findFirst({ where: { id } });

    if (checkId) {
      await this.prisma.thue_cong_viec.update({
        data: { hoan_thanh: true },
        where: { id },
      });

      return {
        check: true,
        message: 'Cập nhật trạng thái thuê công việc thành công!',
      };
    } else {
      return { check: false, message: 'Id thuê công việc không tồn tại!' };
    }
  }
}
