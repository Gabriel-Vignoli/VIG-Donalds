import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpfForm";
import OrderList from "./components/orderList";

interface OrderPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrderPage = async ({ searchParams }: OrderPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm></CpfForm>;
  }
  if(!isValidCpf(cpf)) {
    return <CpfForm></CpfForm>;
  }
  const orders = await db.order.findMany({
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
        restaurant: {
            select: {
                name: true,
                avatarImageUrl: true,
            }
        },
        orderProducts: {
            include: {
                product: true
            }
        }
    }
  });

  return <OrderList orders={orders}></OrderList>
  
};

export default OrderPage;
