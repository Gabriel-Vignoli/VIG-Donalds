"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductsDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductsDetails = ({ product }: ProductsDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="mt-[1.5rem] relative z-50 rounded-t-3xl p-5 flex-auto flex flex-col">
      <div className="flex-auto">
        {/* RESTAURANT */}
      <div className="flex items-center gap-1.5">
        <Image
          src={product.restaurant.avatarImageUrl}
          alt={product.restaurant.name}
          width={16}
          height={16}
          className="rounded-full"
        ></Image>
        <p className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </p>
      </div>

      {/* PRODUCT NAME */}
      <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

      {/* PRICE AND DESCRIPTION */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {formatCurrency(product.price)}
        </h3>
        <div className="flex items-center gap-3 text-center">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-xl"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon></ChevronLeftIcon>
          </Button>
          <p className="w-4">{quantity}</p>
          <Button
            variant="destructive"
            className="h-8 w-8 rounded-xl"
            onClick={handleIncreaseQuantity}
          >
            <ChevronRightIcon></ChevronRightIcon>
          </Button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6 space-y-3">
        <h4 className="font-semibold">About</h4>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      {/* INGREDIENTS */}
      <div className="mt-6 space-y-3">
       <div className="flex items-center gap-1.5">
        <ChefHatIcon className="w-4 h-4"></ChefHatIcon>
       <h4 className="font-semibold">Ingredients</h4>
       </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      </div>

      <Button className="w-full rounded-full mt-6">Add a bag</Button>
    </div>
  );
};

export default ProductsDetails;
