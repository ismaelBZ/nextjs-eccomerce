"use client";

import { useState, useTransition } from "react";
import { incrementProductQuantity } from "./actions";

interface AddToCartButtonProps {
  productId: string,
  increment: (productId: string) => Promise<void>
}

export default function AddToCartButton( { productId, increment }: AddToCartButtonProps ) {
  
  // Used here to ensure that the hole page dont`t crash when call revalidate() from action.ts
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  
  
  return (
    <div className="flex items-center gap-2">
      <button 
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition( async () => {
            await increment(productId);
            setSuccess(true);
          })
        }}
      >
      Add to cart
        <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.8}
            className="w-5 h-5"
            >
          <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
          />
        </svg>
      </button>
      {isPending && <span className="loading loading-spinner loading-md " />}
      {!isPending && success && <span className="text-success">Added to Cart.</span>}
    </div>
  )
}
