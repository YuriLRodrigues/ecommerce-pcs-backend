import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { EditInfoProductsProps } from '@root/domain/enterprise/entities/product.entity';

import { ImagesRepository } from '../../repositories/images.repository';
import { ProductRepository } from '../../repositories/product.repository';

type Input = EditInfoProductsProps & {
  imagesIds: UniqueEntityId[];
  productId: UniqueEntityId;
};

type Output = Either<Error, void>;

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly imagesRepository: ImagesRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({ imagesIds, productId, ...props }: Input): Promise<Output> {
    const product = await this.productRepository.findProductById({
      id: productId,
    });

    if (!product) {
      return left(new Error(`Product not found`));
    }

    const imagesByProductId = await this.imagesRepository.findByProductId({
      productId,
    });

    const imagesIdsByProduct = imagesByProductId.map((img) => img.id);

    const imagesOnDeleteId = imagesIdsByProduct.filter(
      (originalId) => !imagesIds.find((id) => originalId.toValue() === id.toValue()),
    );

    const imagesOnSaveId = imagesIds.filter(
      (originalId) => !imagesIdsByProduct.find((id) => originalId.toValue() === id.toValue()),
    );

    const findImagesOnSave = await this.imagesRepository.findManyByIds({
      ids: imagesOnSaveId,
    });

    const imagesOnSave = findImagesOnSave.map((img) => {
      img.productId = productId;

      return img;
    });

    product.editInfo(props);

    const deleteImages = this.imagesRepository.deleteMany({
      imagesIds: imagesOnDeleteId,
    });

    const updateImages = this.imagesRepository.saveMany({
      images: imagesOnSave,
    });

    const updateProduct = this.productRepository.save({
      product,
    });

    await Promise.all([deleteImages, updateImages, updateProduct]);

    return right(null);
  }
}
