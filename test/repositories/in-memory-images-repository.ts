import {
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  FindByCategoryIdProps,
  FindByIdProps,
  FindByProductIdProps,
  FindManyByIdProps,
  ImagesRepository,
  SaveManyProps,
  SaveProps,
} from '@root/domain/aplication/repositories/images.repository';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';

export class InMemoryImagesRepository implements ImagesRepository {
  public images: ImageEntity[] = [];

  async create({ image }: CreateProps): Promise<ImageEntity> {
    this.images.push(image);

    return image;
  }

  async findById({ id }: FindByIdProps): Promise<ImageEntity> {
    const image = await this.images.find((img) => img.id === id);

    return image ?? null;
  }

  async findByCategoryId({ categoryId }: FindByCategoryIdProps): Promise<ImageEntity[]> {
    const image = await this.images.filter((img) => img.categoryId.toValue() === categoryId.toValue());

    return image;
  }

  async findManyByIds({ ids }: FindManyByIdProps): Promise<ImageEntity[]> {
    const imagesWithMatchingIds = await this.images.filter((img) =>
      ids.map((id) => img.id.toValue() === id.toValue()),
    );

    return imagesWithMatchingIds;
  }

  async findByProductId({ productId }: FindByProductIdProps): Promise<ImageEntity[]> {
    const categoryByProductId = await this.images.filter((img) => img.productId === productId);

    return categoryByProductId;
  }

  async save({ image }: SaveProps): Promise<void> {
    const imageIndex = this.images.findIndex((img) => img.id === image.id);
    this.images[imageIndex] = image;
  }

  async saveMany({ images }: SaveManyProps): Promise<void> {
    for (const image of images) {
      const indexImage = this.images.findIndex((img) => img.id === image.id);
      this.images[indexImage] = image;
    }

    return;
  }

  async delete({ imageId }: DeleteProps): Promise<void> {
    const imageExists = this.findById({
      id: imageId,
    });

    if (!imageExists) {
      return null;
    }

    this.images = this.images.filter((img) => img.id !== imageId);

    return;
  }

  async deleteMany({ imagesIds }: DeleteManyProps): Promise<void> {
    this.images = this.images.filter((img) => !imagesIds.includes(img.id));

    return;
  }
}
