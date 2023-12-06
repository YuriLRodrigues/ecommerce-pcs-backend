import { Module } from '@nestjs/common';
import { DeleteUserUseCase } from './delete-user.use-case';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { RegisterUserUseCase } from './register-user.use-case';
import { EditInfoUserUseCase } from './edit-info-user.use-case';

@Module({
  imports: [],
  providers: [DeleteUserUseCase, FindUserByIdUseCase, RegisterUserUseCase, EditInfoUserUseCase],
  exports: [DeleteUserUseCase, FindUserByIdUseCase, RegisterUserUseCase, EditInfoUserUseCase],
})
export class UserUseCasesModule {}
