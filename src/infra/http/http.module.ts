import { Module } from '@nestjs/common';
import { UserUseCasesModule } from '@root/domain/aplication/use-cases/user-use-cases.module';

@Module({
  imports: [UserUseCasesModule],
})
export class HttpModule {}
