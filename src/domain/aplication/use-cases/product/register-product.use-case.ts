import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { createSlug } from '@root/utils/create-slug';

import { ImagesRepository } from '../../repositories/images.repository';
import { ProductRepository } from '../../repositories/product.repository';

type Input = {
  id?: UniqueEntityId;
  name: string;
  slug?: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  inStock?: boolean;
  totalInStock?: number;
  imagesIds?: Array<UniqueEntityId>;
};

type Output = Either<Error, ProductEntity>;

@Injectable()
export class RegisterProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly imagesRepository: ImagesRepository,
  ) {}

  async execute({
    id,
    description,
    onSale,
    price,
    salePrice,
    inStock,
    totalInStock,
    name,
    slug,
    imagesIds,
  }: Input): Promise<Output> {
    const productExists = await this.productRepository.findProductBySlug({
      slug: slug ?? createSlug(name),
    });

    if (productExists) {
      return left(new Error('Product with this name or slug already exists'));
    }

    const product = ProductEntity.create(
      {
        name,
        slug,
        description,
        onSale,
        price,
        salePrice,
        inStock,
        totalInStock,
      },
      id,
    );

    const allImagesWithCorrectlyId = await this.imagesRepository.findManyByIds({
      ids: imagesIds,
    });

    const imagesWithProductId = allImagesWithCorrectlyId.filter((img) => {
      img.productId = product.id;

      return img;
    });

    await this.imagesRepository.saveMany({
      images: imagesWithProductId,
    });

    const newProduct = await this.productRepository.register({
      product,
    });

    return right(newProduct);
  }
}
