import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png"
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton, { UserMenuButtonProps } from "./UserMenuButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Session } from "next-auth";

async function searchProduct(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}


export default async function Navbar() {

  const session = (await getServerSession(authOptions)) as Session;
  const cart = await getCart();
    
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form 
            action={searchProduct} 
            className="form-control"
          >
            <input 
              name="searchQuery" 
              placeholder="Search" 
              type="text" 
              className="input input-bordered w-full min-w-[100px]" 
            />
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  )

}