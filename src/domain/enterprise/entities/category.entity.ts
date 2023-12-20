import { Entity } from '@root/core/domain/entity/entity';
import { ProductEntity } from './product.entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';
import { createSlug } from '@root/utils/create-slug';

export type CategoryEntityProps = {
  name: string;
  slug: string;
  products: Array<ProductEntity>;
  createdAt: Date;
};

export class CategoryEntity extends Entity<CategoryEntityProps> {
  get name() {
    return this.props.name;
  }
  get slug() {
    return this.props.slug;
  }
  get products() {
    return this.props.products;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  public static create(
    props: Optional<CategoryEntityProps, 'createdAt' | 'products' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const category = new CategoryEntity(
      {
        createdAt: props.createdAt ?? new Date(),
        name: props.name,
        products: props.products ?? [],
        slug: props.slug ?? createSlug(props.name),
      },
      id,
    );

    return category;
  }

  public addProduct(product: ProductEntity) {
    return this.products.push(product);
  }
}
