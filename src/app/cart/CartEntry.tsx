"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQuantity } from "./actions";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  const QuantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    QuantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounder-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div> Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-40 max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantitiy = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantitiy);
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {QuantityOptions}
            </select>
          </div>
          <div className="items-center-gap-3 flex">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm ml-2" />
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
