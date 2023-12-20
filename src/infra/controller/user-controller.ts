import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthorizationUserDTO } from './dto/authorization/authorization-user.dto';
import { Public } from '../auth/public';
import { CurrentUser } from '../auth/current-user';
import { UserPayload } from '../auth/auth-user';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { AuthorizationUserRS } from './dto/authorization/returns-to-swagger';
import { RegisterUserRS } from './dto/user/returns-to-swagger/register';
import { FindByIdUserRS } from './dto/user/returns-to-swagger/find-by-id';
import { RegisterUserDTO } from './dto/user/register-user.dto';
import { DeleteUserRS } from './dto/user/returns-to-swagger/delete';
import { UpdateUserDTO } from './dto/user/update-user.dto';
import { AuthorizationUserUseCase } from '@root/domain/aplication/use-cases/user/authorization.use-case';
import { FindUserByIdUseCase } from '@root/domain/aplication/use-cases/user/find-user-by-id.use-case';
import { RegisterUserUseCase } from '@root/domain/aplication/use-cases/user/register-user.use-case';
import { DeleteUserUseCase } from '@root/domain/aplication/use-cases/user/delete-user.use-case';
import { EditInfoUserUseCase } from '@root/domain/aplication/use-cases/user/edit-info-user.use-case';
import { Roles } from '../auth/roles';
import { UserRoles } from '@root/domain/enterprise/entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly authorizationUserUseCase: AuthorizationUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: EditInfoUserUseCase,
  ) {}

  // User Authorization/Login - Public Route - POST
  @Public()
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
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: AuthorizationUserRS[400],
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Invalid credentials',
    type: AuthorizationUserRS[403],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
    type: AuthorizationUserRS[404],
  })
  @Post('/authorization')
  async auth(@Body() { email, password }: AuthorizationUserDTO) {
    const output = await this.authorizationUserUseCase.execute({
      email,
      password,
    });

    if (output.isLeft()) {
      const error = output.value;

      switch (error.message) {
        case 'Invalid credentials':
          throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            error: error.message,
          });
        case 'User not found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return {
      token: output.value,
    };
  }

  // User Register - Public Route - POST
  @Public()
  @ApiOperation({
    summary: 'Registra um usuário',
    description:
      'Essa rota é responsável por fazer o cadastro do usuário no sistema de acordo com seus dados inseridos no body da requisição',
  })
  @ApiOkResponse({
    status: 201,
    description: 'User created successfully',
    type: RegisterUserRS[201],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: RegisterUserRS[400],
  })
  @ApiConflictResponse({
    status: 409,
    description: 'User with this credentials already exists',
    type: RegisterUserRS[409],
  })
  @Post('register')
  async register(@Body() { avatar, email, name, password, username }: RegisterUserDTO) {
    const output = await this.registerUserUseCase.execute({
      avatar,
      email,
      name,
      password,
      username,
    });

    if (output.isLeft()) {
      const error = output.value;
      switch (error.message) {
        case 'User with this credentials already exists':
          throw new ConflictException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return 'User created successfully';
  }

  // FindUserById - Private Route - GET
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Busca um usuário pelo seu id',
    description: 'Essa rota é responsável por fazer a busca de um usuário no banco de acordo com seu id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User informations',
    type: FindByIdUserRS[200],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: FindByIdUserRS[400],
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Invalid credentials',
    type: FindByIdUserRS[401],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
    type: FindByIdUserRS[404],
  })
  @Get()
  async findById(@CurrentUser() { sub }: UserPayload) {
    const user = await this.findUserByIdUseCase.execute({
      id: new UniqueEntityId(sub),
    });

    if (user.isLeft()) {
      const error = user.value;

      switch (error.message) {
        case 'Invalid credentials':
          throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            error: error.message,
          });
        case 'User not found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return {
      avatar: user.value.avatar,
      name: user.value.name,
      username: user.value.username,
      email: user.value.email,
      roles: user.value.roles,
      createdAt: user.value.createdAt,
    };
  }

  // User Delete - Private Route - DELETE
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleta um usuário',
    description:
      'Essa rota é responsável por fazer a deleção do usuário no sistema de acordo com seu id, que é buscado pela request da rota automaticamente pelo CreateParamDecorator criado no NestJS como CurrentUser',
  })
  @ApiOkResponse({
    status: 202,
    description: 'User deleted successfully',
    type: DeleteUserRS[202],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'User not found',
    type: DeleteUserRS[400],
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Invalid credentials',
    type: DeleteUserRS[401],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
    type: DeleteUserRS[404],
  })
  @Roles({ roles: [UserRoles.user, UserRoles.admin], isAll: false })
  @Delete()
  async delete(@CurrentUser() { sub }: UserPayload) {
    const userDeleted = await this.deleteUserUseCase.execute({
      id: new UniqueEntityId(sub),
    });

    if (userDeleted.isLeft()) {
      const error = userDeleted.value;

      switch (error.message) {
        case 'Invalid credentials':
          throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            error: error.message,
          });
        case 'User not found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return 'User deleted successfully';
  }

  // User Update - Private Route - PATCH
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Faz a atualização de um dado do usuário',
    description:
      'Essa rota é responsável por fazer a deleção do usuário no sistema de acordo com seu id, que é buscado pela request da rota automaticamente pelo CreateParamDecorator criado no NestJS como CurrentUser',
  })
  @ApiOkResponse({
    status: 202,
    description: 'User deleted successfully',
    type: DeleteUserRS[202],
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Invalid credentials',
    type: DeleteUserRS[401],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'User not found',
    type: DeleteUserRS[404],
  })
  @Roles({ roles: [UserRoles.admin, UserRoles.user], isAll: false })
  @Patch()
  async update(@Body() { name, username }: UpdateUserDTO, @CurrentUser() { sub }: UserPayload) {
    const output = await this.updateUserUseCase.execute({
      id: new UniqueEntityId(sub),
      name,
      username,
    });

    if (output.isLeft()) {
      const error = output.value;

      switch (error.message) {
        case `User with id ${sub} does not exist`:
          throw new NotFoundException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return 'User updated successfully';
  }
}
