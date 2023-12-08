import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { FindUserByIdUseCase } from '@root/domain/aplication/use-cases/find-user-by-id.use-case';
import { AuthorizationUserUseCase } from '@root/domain/aplication/use-cases/authorization.use-case';
import { AuthorizationUserDTO } from './dto/authorization/authorization-user.dto';
import { Public } from '../auth/public';
import { CurrentUser } from '../auth/current-user';
import { UserPayload } from '../auth/auth-user';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { DeleteUserUseCase } from '@root/domain/aplication/use-cases/delete-user.use-case';
import { RegisterUserUseCase } from '@root/domain/aplication/use-cases/register-user.use-case';
import { AuthorizationUserRS } from './dto/authorization/returns-to-swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly authorizationUserUseCase: AuthorizationUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  // User Authorization/Login - Public Route - POST
  @Public()
  @Post('/authorization')
  @ApiOperation({
    summary: 'Autoriza o usuário a fazer login',
    description:
      'Essa rota é responsável por permitir que o usuário faça login no sistema, retornando o seu token',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso!',
    type: AuthorizationUserRS[200],
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Autorização negada',
    type: AuthorizationUserRS[401],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: AuthorizationUserRS[404],
  })
  async auth(@Body() { email, password }: AuthorizationUserDTO) {
    const output = await this.authorizationUserUseCase.execute({
      email,
      password,
    });
    console.log(output);
    if (output.isLeft()) {
      const error = output.value;
      console.log(error.message);

      switch (error.message) {
        case 'Invalid credentials':
          throw new UnauthorizedException(error.message);
        case 'User not found':
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return { value: output.value, message: 'sdvhjadshjdas' };
  }

  // User Register - Public Route - POST
  // @Public()
  // @Post('register')
  // @ApiOperation({
  //   summary: 'Registra um usuário',
  //   description:
  //     'Essa rota é responsável por fazer o cadastro do usuário no sistema de acordo com seus dados inseridos no body da requisição',
  // })
  // @ApiOkResponse({
  //   status: 201,
  //   description: 'Usuário cadastrado com sucesso!',
  //   schema: {
  //     $ref: getSchemaPath(AuthorizationUserDTO),
  //   },
  // })
  // @ApiForbiddenResponse({
  //   status: 403,
  //   description: 'Autorização negada',
  //   schema: {
  //     $ref: getSchemaPath(AuthorizationUserDTO),
  //   },
  // })
  // @ApiNotFoundResponse({
  //   status: 404,
  //   description: 'Usuário não encontrado',
  //   schema: {
  //     $ref: getSchemaPath(AuthorizationUserDTO),
  //   },
  // })

  // User Delete - Private Route - DELETE
  // @Public()
  @Delete()
  // @ApiOperation({
  //   summary: 'Deleta um usuário',
  //   description:
  //     'Essa rota é responsável por fazer a deleção do usuário no sistema de acordo com seu id, que é buscado pela request da rota automaticamente pelo CreateParamDecorator criado no NestJS como CurrentUser',
  // })
  async delete() {
    console.log('a');

    return 'User deleted successfully';
  }
}
