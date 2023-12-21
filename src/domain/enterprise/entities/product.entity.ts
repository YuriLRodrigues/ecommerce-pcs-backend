import { Entity } from '@root/core/domain/entity/entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Optional } from '@root/core/logic/Optional';
import { createSlug } from '@root/utils/create-slug';

export type ProductEntityProps = {
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  inStock: boolean;
  totalInStock: number;
  categoryId?: string;
  createdAt: Date;
  updatedAt?: Date;
};

type EditInfoProductsProps = {
  name?: string;
  description?: string;
  price?: number;
  salePrice?: number;
  onSale?: boolean;
  inStock?: boolean;
  totalInStock?: number;
  categoryId?: string;
};

export class ProductEntity extends Entity<ProductEntityProps> {
  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

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

  get totalInStock() {
    return this.props.totalInStock;
  }

  get inStock() {
    return this.props.inStock;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  set categoryId(value: string) {
    this.props.categoryId = value;
  }

  public static create(
    props: Optional<
      ProductEntityProps,
      'createdAt' | 'totalInStock' | 'inStock' | 'salePrice' | 'onSale' | 'slug' | 'categoryId'
    >,
    id?: UniqueEntityId,
  ) {
    const product = new ProductEntity(
      {
        name: props.name,
        slug: createSlug(props.name),
        description: props.description,
        price: props.price,
        onSale: props.onSale ?? false,
        salePrice: props.salePrice ?? null,
        inStock: props.inStock ?? false,
        totalInStock: props.totalInStock ?? 0,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        categoryId: props.categoryId ?? undefined,
      },
      id,
    );

    return product;
  }

  public editInfo(data: EditInfoProductsProps) {
    const { name, description, onSale, price, salePrice, inStock, totalInStock, categoryId } = data;

    this.props.name = name ?? this.props.name;
    this.props.description = description ?? this.props.description;
    this.props.onSale = onSale ?? this.props.onSale;
    this.props.price = price ?? this.props.price;
    this.props.salePrice = salePrice ?? this.props.salePrice;
    this.props.updatedAt = new Date();
    this.props.inStock = inStock ?? this.props.inStock;
    this.props.totalInStock = totalInStock ?? this.props.totalInStock;
    this.props.categoryId = categoryId ?? this.props.categoryId;

    return this;
  }
}
