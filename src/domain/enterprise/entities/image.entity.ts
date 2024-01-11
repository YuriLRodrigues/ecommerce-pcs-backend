import { Entity } from '@root/core/domain/entity/entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';

type ImageEntityProps = {
  url: string;
  productId?: UniqueEntityId;
  categoryId?: UniqueEntityId;
};

export class ImageEntity extends Entity<ImageEntityProps> {
  get url() {
    return this.props.url;
  }

  get productId() {
    return this.props.productId;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  set productId(value: UniqueEntityId) {
    this.props.productId = value;
  }

  set categoryId(value: UniqueEntityId) {
    this.props.categoryId = value;
  }

  public static create(props: Optional<ImageEntityProps, 'productId' | 'categoryId'>, id?: UniqueEntityId) {
    const image = new ImageEntity(
      {
        url: props.url,
        productId: props.productId ?? undefined,
        categoryId: props.categoryId ?? undefined,
      },
      id,
    );

    return image;
  }
}
