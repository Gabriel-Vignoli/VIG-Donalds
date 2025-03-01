import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductsDetails from "./components/productsDetails";
import ProductsHeader from "./components/productsHeader";

interface ProductsPageProps {
  params: Promise<{ slug: string; productsId: string }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { slug, productsId } = await params;

  const product = await db.product.findUnique({
    where: {
      id: productsId,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  if(product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <ProductsHeader product={product}></ProductsHeader>
      <ProductsDetails product={product}></ProductsDetails>
    </div>
  );
};

export default ProductsPage;
