'use client'

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductsHeaderProps {
    product: Pick<Product, "imageUrl" | "name">;
    }

const ProductsHeader = ({product}: ProductsHeaderProps) => {
const router = useRouter()
const handleBackClick = () => router.back()
    
    return ( 
        <div className="relative h-[300px] w-full min-h-[300px]">
    <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-10 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon></ChevronLeftIcon>
      </Button>
     
        <Image src={product.imageUrl} alt={product.name} layout="fill" className="object-cover">
        </Image>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-10 rounded-full"
      >
        <ScrollTextIcon></ScrollTextIcon>
      </Button>
    </div>
     );
}
 
export default ProductsHeader;