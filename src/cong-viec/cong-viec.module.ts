import { Module } from '@nestjs/common';
import { CongViecController } from './cong-viec.controller';
import { CongViecService } from './cong-viec.service';

@Module({
  controllers: [CongViecController],
  providers: [CongViecService]
})
export class CongViecModule {}
