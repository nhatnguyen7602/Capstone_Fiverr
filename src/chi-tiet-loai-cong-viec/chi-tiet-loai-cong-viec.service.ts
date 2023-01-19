import { Injectable } from '@nestjs/common';
import { chi_tiet_loai_cong_viec, PrismaClient } from '@prisma/client';
import { CTLoaiCVDTO } from 'src/dto/chi-tiet-loai-cong-viec.dto';
import { ResultDTO } from 'src/dto/result.dto';

@Injectable()
export class ChiTietLoaiCongViecService {
  private prisma: PrismaClient = new PrismaClient();

  async getCTLoaiCViec(): Promise<chi_tiet_loai_cong_viec[]> {
    return await this.prisma.chi_tiet_loai_cong_viec.findMany();
  }

  async postCTLoaiCViec(body: CTLoaiCVDTO): Promise<ResultDTO> {
    let checkTen = await this.prisma.chi_tiet_loai_cong_viec.findFirst({
      where: { ten_chi_tiet: body.ten_chi_tiet },
    });

    if (checkTen) {
      return { check: false, message: 'Chi tiết công việc đã tồn tại!' };
    } else {
      await this.prisma.chi_tiet_loai_cong_viec.create({
        data: body,
      });

      return { check: true, message: 'Thêm chi tiết công việc thành công!' };
    }
  }

  async getCTLoaiCViecId(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.chi_tiet_loai_cong_viec.findFirst({
      where: { id },
    });

    if (checkId) {
      return { check: true, message: 'Lấy dữ liệu thành công!', data: checkId };
    } else {
      return { check: false, message: 'Id không tồn tại!' };
    }
  }

  async putCTLoaiCViec(id: number, ten_chi_tiet: string): Promise<ResultDTO> {
    let checkId = await this.prisma.chi_tiet_loai_cong_viec.findFirst({
      where: { id },
    });

    if (checkId) {
      let checkTen = await this.prisma.chi_tiet_loai_cong_viec.findFirst({
        where: { ten_chi_tiet },
      });

      if (checkTen) {
        return { check: false, message: 'Tên chi tiết công việc đã tồn tại!' };
      } else {
        await this.prisma.chi_tiet_loai_cong_viec.update({
          where: { id },
          data: { ten_chi_tiet },
        });

        return { check: true, message: 'Sửa thành công!' };
      }
    } else {
      return { check: false, message: 'Id không tồn tại!' };
    }
  }

  async postHinhCTLoai(id: number, filename: string): Promise<ResultDTO> {
    await this.prisma.chi_tiet_loai_cong_viec.update({
      data: { hinh_anh: filename },
      where: { id },
    });

    return { check: true, message: 'Thêm hình ảnh thành công!' };
  }

  async deleteCTLoaiCViec(id: number): Promise<ResultDTO> {
    let checkId = await this.prisma.chi_tiet_loai_cong_viec.findFirst({
      where: { id },
    });

    if (checkId) {
      await this.prisma.chi_tiet_loai_cong_viec.delete({ where: { id } });

      return {
        check: true,
        message: 'Xoá chi tiết loại công việc thành công!',
      };
    } else {
      return { check: false, message: 'Id không tồn tại!' };
    }
  }
}
