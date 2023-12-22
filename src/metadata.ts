/* eslint-disable */
export default async () => {
  const t = {
    ['./domain/enterprise/entities/product.entity']: await import(
      './domain/enterprise/entities/product.entity'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
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
          import('./core/domain/entity/unique-id.entity'),
          { UniqueEntityId: { value: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/authorization/returns-to-swagger/authorization-user-200.dto'),
          {
            AuthorizationUser200DTO: {
              token: {
                required: true,
                type: () => ({
                  sub: { required: true, type: () => String },
                  roles: { required: true, type: () => [String] },
                }),
              },
            },
          },
        ],
        [
          import('./infra/controller/dto/authorization/returns-to-swagger/authorization-user-400.dto'),
          {
            AuthorizationUser400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/authorization/returns-to-swagger/authorization-user-403.dto'),
          {
            AuthorizationUser403DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/authorization/returns-to-swagger/authorization-user-404.dto'),
          {
            AuthorizationUser404DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/register/register-user-201.dto'),
          { RegisterUser201DTO: { message: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/register/register-user-400.dto'),
          {
            RegisterUser400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/register/register-user-409.dto'),
          {
            RegisterUser409DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/find-by-id/find-user-by-id.200.dto'),
          { FindUserById200DTO: { message: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/find-by-id/find-user-by-id.400.dto'),
          {
            FindUserById400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/find-by-id/find-user-by-id.401.dto'),
          { FindUserById401DTO: { message: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/find-by-id/find-user-by-id.404.dto'),
          { FindUserById404DTO: { message: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/user/register-user.dto'),
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
          import('./infra/controller/dto/user/returns-to-swagger/delete/delete-user-202.dto'),
          { DeleteUser202DTO: { message: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/delete/delete-user-400.dto'),
          {
            DeleteUser400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/delete/delete-user-401.dto'),
          {
            DeleteUser401DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/returns-to-swagger/delete/delete-user-404.dto'),
          {
            DeleteUser404DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/user/update-user.dto'),
          {
            UpdateUserDTO: {
              avatar: { required: false, type: () => String },
              name: { required: false, type: () => String },
              username: { required: false, type: () => String },
            },
          },
        ],
        [import('./domain/enterprise/entities/user.entity'), { UserEntity: {} }],
        [import('./domain/enterprise/entities/product.entity'), { ProductEntity: {} }],
        [import('./domain/enterprise/entities/category.entity'), { CategoryEntity: {} }],
        [
          import('./infra/controller/dto/product/register-product.dto'),
          {
            RegisterProductDTO: {
              name: { required: true, type: () => String },
              slug: { required: true, type: () => String },
              description: { required: true, type: () => String },
              price: { required: true, type: () => Number },
              salePrice: { required: false, type: () => Number },
              onSale: { required: true, type: () => Boolean },
              inStock: { required: true, type: () => Boolean },
              totalInStock: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-all/find-all-products-200.dto'),
          {
            FindAllProducts200DTO: {
              name: { required: true, type: () => String },
              slug: { required: true, type: () => String },
              description: { required: true, type: () => String },
              price: { required: true, type: () => Number },
              salePrice: { required: false, type: () => Number },
              onSale: { required: true, type: () => Boolean },
              inStock: { required: true, type: () => Boolean },
              totalInStock: { required: true, type: () => Number },
              categoryId: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-all/find-all-products-400.dto'),
          {
            FindAllProducts400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-all/find-all-products-401.dto'),
          {
            FindAllProducts401DTO: {
              message: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-all/find-all-products-404.dto'),
          {
            FindAllProducts404DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/register/register-product-200.dto'),
          { RegisterProduct200DTO: { message: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/register/register-product-400.dto'),
          {
            RegisterProduct400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/register/register-product-401.dto'),
          {
            RegisterProduct401DTO: {
              message: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/register/register-product-409.dto'),
          {
            RegisterProduct409DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-by-slug/find-by-slug-200.dto'),
          {
            FindProductsBySlug200DTO: {
              product: {
                required: true,
                type: () => ({
                  name: { required: true, type: () => String },
                  slug: { required: true, type: () => String },
                  description: { required: true, type: () => String },
                  price: { required: true, type: () => Number },
                  salePrice: { required: false, type: () => Number },
                  onSale: { required: true, type: () => Boolean },
                  createdAt: { required: true, type: () => Date },
                  updatedAt: { required: false, type: () => Date },
                  inStock: { required: true, type: () => Boolean },
                  totalInStock: { required: true, type: () => Number },
                }),
              },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-by-slug/find-by-slug-400.dto'),
          {
            FindProductsBySlug400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-by-slug/find-by-slug-401.dto'),
          {
            FindProductsBySlug401DTO: {
              message: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/find-by-slug/find-by-slug-404.dto'),
          {
            FindProductsBySlug404DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/delete-product.dto'),
          { DeleteProductDTO: { productSlug: { required: true, type: () => String } } },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/delete/delete-product-200.dto'),
          {
            DeleteProduct200DTO: { message: { required: true, type: () => String } },
            DeleteProduct202DTO: { message: { required: true, type: () => String } },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/delete/delete-product-400.dto'),
          {
            DeleteProduct400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/delete/delete-product-401.dto'),
          {
            DeleteProduct401DTO: {
              message: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/product/returns-to-swagger/delete/delete-product-404.dto'),
          {
            DeleteProduct404DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./infra/controller/dto/feedback/add-feedback.dto'),
          {
            AddProductFeedbackDTO: {
              comment: { required: true, type: () => String },
              productId: { required: true, type: () => String },
              stars: { required: true, type: () => Number },
            },
          },
        ],
        [
          {
            FindAllProducts400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import(
            './infra/controller/dto/product/returns-to-swagger/find-by-category/find-products-by-category-400.dto'
          ),
          {
            FindProductsByCategory400DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
        [
          import(
            './infra/controller/dto/product/returns-to-swagger/find-by-category/find-products-by-category-200.dto'
          ),
          {
            FindProductsByCategory200DTO: {
              name: { required: true, type: () => String },
              slug: { required: true, type: () => String },
              description: { required: true, type: () => String },
              price: { required: true, type: () => Number },
              salePrice: { required: false, type: () => Number },
              onSale: { required: true, type: () => Boolean },
              inStock: { required: true, type: () => Boolean },
              totalInStock: { required: true, type: () => Number },
              categoryId: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import(
            './infra/controller/dto/product/returns-to-swagger/find-by-category/find-products-by-category-404.dto'
          ),
          {
            FindProductsByCategory404DTO: {
              error: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./infra/controller/product.controller'),
          {
            ProductController: {
              register: { type: String },
              findBySlug: { type: t['./domain/enterprise/entities/product.entity'].ProductEntity },
              findAll: { type: [t['./domain/enterprise/entities/product.entity'].ProductEntity] },
              delete: { type: String },
              findProductsByCategory: {},
              findByCategory: { type: [t['./domain/enterprise/entities/product.entity'].ProductEntity] },
            },
          },
        ],
      ],
    },
  };
};
