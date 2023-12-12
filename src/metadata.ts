/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./core/domain/entity/unique-id.entity'),
          { UniqueEntityId: { value: { required: true, type: () => String } } },
        ],
        [import('./domain/enterprise/entities/user.entity'), { UserEntity: {} }],
        [import('./domain/enterprise/entities/product.entity'), { ProductEntity: {} }],
        [
          import('./infra/controller/dto/authorization/authorization-user.dto'),
          {
            AuthorizationUserDTO: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./infra/controller/dto/authorization/returns-to-swagger/authorization-user-200.dto'),
          { AuthorizationUser200: { token: { required: true, type: () => [String] } } },
        ],
        [
          import('./infra/controller/dto/authorization/returns-to-swagger/authorization-user-403.dto'),
          {
            AuthorizationUser401Error: {
              message: { required: true, type: () => String },
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/authorization/returns-to-swagger/authorization-user-404.dto'),
          {
            AuthorizationUser404Error: {
              message: { required: true, type: () => String },
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/register/register-user.dto'),
          {
            RegisterUserDTO: {
              avatar: { required: true, type: () => String },
              email: { required: true, type: () => String },
              name: { required: true, type: () => String },
              password: { required: true, type: () => String },
              username: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/register-product.dto'),
          {
            RegisterProductDTO: {
              description: { required: true, type: () => String },
              price: { required: true, type: () => Number },
              salePrice: { required: false, type: () => Number },
              onSale: { required: true, type: () => Boolean },
              stars: { required: true, type: () => Number },
              inStock: { required: true, type: () => Boolean },
              totalInStock: { required: true, type: () => Number },
            },
          },
        ],
      ],
      controllers: [
        [import('./infra/controller/product.controller'), { ProductController: { register: {} } }],
      ],
    },
  };
};
