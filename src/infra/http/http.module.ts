import { Module } from '@nestjs/common';
import { UserUseCasesModule } from '@root/domain/aplication/use-cases/user-use-cases.module';
import { UserController } from '../controller/user-controller';

@Module({
  imports: [UserUseCasesModule],
  controllers: [UserController],
})
export class HttpModule {}
