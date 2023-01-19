import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { NguoiDungService } from './nguoi-dung/nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung/nguoi-dung.controller';
import { JwtService } from '@nestjs/jwt';
import { LoaiCongViecModule } from './loai-cong-viec/loai-cong-viec.module';
import { ChiTietLoaiCongViecModule } from './chi-tiet-loai-cong-viec/chi-tiet-loai-cong-viec.module';
import { CongViecModule } from './cong-viec/cong-viec.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { ThueCongViecModule } from './thue-cong-viec/thue-cong-viec.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    NguoiDungModule,
    LoaiCongViecModule,
    ChiTietLoaiCongViecModule,
    CongViecModule,
    BinhLuanModule,
    ThueCongViecModule,
  ],
  controllers: [AppController, NguoiDungController],
  providers: [AppService, NguoiDungService, JwtService],
})
export class AppModule {}
