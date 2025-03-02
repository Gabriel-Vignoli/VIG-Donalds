import { useContext } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cartProductItem";

const CartSheet = () => {

    const { toggleCart, isOpen, products } = useContext(CartContext);
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[80%]">
          <SheetHeader>
            <SheetTitle className="text-left">Cart</SheetTitle>
          </SheetHeader>
        <div className="py-5">
        {products.map((product) => (
          <CartProductItem key={product.id} product={product}></CartProductItem>
          ))}
        </div>
        </SheetContent>
      </Sheet>
     );
}
 
export default CartSheet;