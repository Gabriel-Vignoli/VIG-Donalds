"use client"

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.FINISHED:
        return "Finished";
        case OrderStatus.IN_PREPARATION:
        return "In Preparing";
        default:
        return "Pending";
    }
    };

const OrderList = ({ orders }: OrderListProps) => {
    const router = useRouter();
  return (
    <div className="space-y-6 p-6">
      <Button size="icon" variant="secondary" className="rounded-full"  onClick={() => router.back()}>
        <ChevronLeftIcon></ChevronLeftIcon>
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon></ScrollTextIcon>
        <h2 className="text-lg font-semibold">My orders</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div className={`w-fit rounded-full  px-2 py-1 text-xs font-semibold text-white
                ${order.status === OrderStatus.FINISHED ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  fill
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  className="rounded-sm"
                ></Image>
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator></Separator>
            <div className="space-y-2">
            {order.orderProducts.map((orderProduct) => (
              <div key={orderProduct.id} className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                  {orderProduct.quantity}
                </div>
                <p className="text-sm">{orderProduct.product.name}</p>
              </div>
            ))}
            </div>
            <Separator></Separator>
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
