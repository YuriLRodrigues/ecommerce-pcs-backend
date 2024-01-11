import { Entity } from '@root/core/domain/entity/entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';
import { createSlug } from '@root/utils/create-slug';

type ProductDetailsProps = {
  images: Array<{
    url: string;
    id: UniqueEntityId;
  }>;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  inStock?: boolean;
  totalInStock?: number;
};

export class ProductDetailsEntity extends Entity<ProductDetailsProps> {
  get images() {
    return this.props.images;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  get price() {
    return this.props.price;
  }

  get salePrice() {
    return this.props.salePrice;
  }

  get onSale() {
    return this.props.onSale;
  }

  get inStock() {
    return this.props.inStock;
  }

  get totalInStock() {
    return this.props.totalInStock;
  }

  public static create(
    props: Optional<ProductDetailsProps, 'slug' | 'inStock' | 'onSale' | 'salePrice' | 'totalInStock'>,
    id?: UniqueEntityId,
  ) {
    const image = new ProductDetailsEntity(
      {
        name: props.name,
        slug: props.slug ?? createSlug(props.name),
        description: props.description,
        images: props.images,
        price: props.price,
        inStock: props.inStock ?? false,
        onSale: props.onSale ?? false,
        salePrice: props.salePrice ?? undefined,
        totalInStock: props.totalInStock ?? undefined,
      },
      id,
    );

    return image;
  }
}
