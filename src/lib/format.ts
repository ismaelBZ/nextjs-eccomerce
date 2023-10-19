
export function formatPrice(price: number) {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD" 
  })
}

//pt-br, BRL