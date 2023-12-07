import { Module } from '@nestjs/common';
import { UserRepository } from '@root/domain/aplication/repositories/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [],
  providers: [
    PrismaService,
    {
      useClass: PrismaUserRepository,
      provide: UserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
