import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
const { decreaseProductQuantity } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill></Image>
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          {/* QUANTITY */}
          <div className="flex items-center gap-1 text-center">
            <Button className="h-7 w-7 rounded-lg" variant="outline" onClick={() => decreaseProductQuantity(product.id)}>
              <ChevronLeftIcon></ChevronLeftIcon>
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button className="h-7 w-7 rounded-lg" variant="destructive">
              <ChevronRightIcon></ChevronRightIcon>
            </Button>
          </div>
        </div>
      </div>
      {/* RIGHT: DELETE BUTTON */}
      <Button className="h-7 w-7 rounded-lg" variant="outline">
        <TrashIcon></TrashIcon>
      </Button>
    </div>
  );
};

export default CartProductItem;
