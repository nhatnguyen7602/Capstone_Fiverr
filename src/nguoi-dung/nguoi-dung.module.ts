import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NguoiDungController } from './nguoi-dung.controller';
import { NguoiDungService } from './nguoi-dung.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
})
export class NguoiDungModule {}
