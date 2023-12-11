import { Entity } from '@root/core/domain/entity/entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';

export type ProductEntityProps = {
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  createdAt: Date;
  updatedAt?: Date;
  stars: Array<number>;
  inStock: boolean;
  totalInStock: number;
};

type EditInfoProductsProps = {
  description?: string;
  price?: number;
  salePrice?: number;
  onSale?: boolean;
  stars?: number;
  inStock?: boolean;
  totalInStock?: number;
};

export class ProductEntity extends Entity<ProductEntityProps> {
  get description() {
    return this.props.description;
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

  get stars() {
    return this.props.stars;
  }
  get totalInStock() {
    return this.props.totalInStock;
  }
  get inStock() {
    return this.props.inStock;
  }

  public static create(props: Optional<ProductEntityProps, 'createdAt'>, id?: UniqueEntityId) {
    const product = new ProductEntity(
      {
        price: props.price,
        description: props.description,
        onSale: props.onSale,
        salePrice: props.salePrice ?? null,
        stars: props.stars ?? [],
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        inStock: props.inStock ?? false,
        totalInStock: props.totalInStock ?? 0,
      },
      id,
    );

    return product;
  }

  public editInfo(data: EditInfoProductsProps) {
    const { description, onSale, price, salePrice, stars } = data;

    this.props.description = description ?? this.props.description;
    this.props.onSale = onSale ?? this.props.onSale;
    this.props.price = price ?? this.props.price;
    this.props.salePrice = salePrice ?? this.props.salePrice;
    stars && this.props.stars.push(stars);
    this.props.updatedAt = new Date();

    return this;
  }
}
