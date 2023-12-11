-- CreateTable
CREATE TABLE "ProductImages" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productsId" TEXT,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "onSale" BOOLEAN NOT NULL,
    "salePrice" DOUBLE PRECISION,
    "stars" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
