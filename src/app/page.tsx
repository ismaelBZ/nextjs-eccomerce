import Image from "next/image";
import { prisma } from "../lib/db/prisma";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";


interface HomeProps {
  searchParams: { page: string}
}

export default async function Home( { searchParams: { page = "1" } }: HomeProps ) {
  
  const currentPage = parseInt(page);
  const itemsPerPage = 5;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil(totalItemCount / itemsPerPage);


  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage
  });

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-x1 hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link
              href={"/products/" + products[0].id}
              className="btn btn-primary"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>

      <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      
      {totalPages > 1  &&
        <PaginationBar totalPages={totalPages} currentPage={currentPage} />   
      }
    </div>
  );
}
