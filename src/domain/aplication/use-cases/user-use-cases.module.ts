import { Module } from '@nestjs/common';
import { DeleteUserUseCase } from './delete-user.use-case';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { RegisterUserUseCase } from './register-user.use-case';
import { EditInfoUserUseCase } from './edit-info-user.use-case';
import { DatabaseModule } from '@root/infra/database/database.module';
import { CrypthograpyModule } from '@root/infra/crypthograpy/crypthograpy.module';
import { AuthorizationUserUseCase } from './authorization.use-case';

@Module({
  imports: [DatabaseModule, CrypthograpyModule],
  providers: [
    DeleteUserUseCase,
    FindUserByIdUseCase,
    RegisterUserUseCase,
    EditInfoUserUseCase,
    AuthorizationUserUseCase,
  ],
  exports: [
    DeleteUserUseCase,
    FindUserByIdUseCase,
    RegisterUserUseCase,
    EditInfoUserUseCase,
    AuthorizationUserUseCase,
  ],
})
export class UserUseCasesModule {}
