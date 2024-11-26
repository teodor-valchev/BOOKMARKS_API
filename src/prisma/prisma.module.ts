import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()// allowing this module to be access from other modules(without needing to be imported from everywhere)
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
