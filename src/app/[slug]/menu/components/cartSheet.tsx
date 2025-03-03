import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cartProductItem";
import FinishOrderDialog from "./finishOrderDialog";

const CartSheet = () => {
  const [FinishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { toggleCart, isOpen, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Cart</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem
                key={product.id}
                product={product}
              ></CartProductItem>
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total:</p>
                <p className="font-semibold text-sm">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogIsOpen(true)}>Checkout Order</Button>
           <FinishOrderDialog open={FinishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen}></FinishOrderDialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
