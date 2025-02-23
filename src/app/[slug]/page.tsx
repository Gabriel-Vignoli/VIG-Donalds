import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumptionMethodOption";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* LOGO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        ></Image>
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/* WELCOME */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Welcome!</h3>
        <p className="opacity-55">
          Choose how you prefer to enjoy your meal. We&apos;re offering
          convenience and flavor in every detail!
        </p>
      </div>
      {/* CARDS */}
      <div className="pt-14 grid grid-cols-2 gap-4">
        <ConsumptionMethodOption imageUrl="/dine-in.png" imageAlt="For here" buttonText="For here" option="DINE_IN" slug={slug}></ConsumptionMethodOption>
        <ConsumptionMethodOption imageUrl="/takeaway.png" imageAlt="To here" buttonText="To go" option="TAKEAWAY" slug={slug}></ConsumptionMethodOption>
      </div>
    </div>
  );
};

export default RestaurantPage;
