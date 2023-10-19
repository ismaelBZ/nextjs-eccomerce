import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {

  // const maxPage = Math.min(totalPages, Math.max(currentPage + 1, 3));
  // const minPage = Math.max(1, Math.min(currentPage - 1, maxPage - 2));

  const maxPage = Math.min(totalPages, Math.max(currentPage + 3, 7));
  const minPage = Math.max(1, Math.min(currentPage - 3, maxPage - 6));

  const numberedPageItems: JSX.Element[] = [];
  
 for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={`?page=${page}`}
        key={page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>
    )
  }
  
  return (
    <>
      <div className="join hidden sm:block">
        {numberedPageItems}
      </div>
      <div className="join block sm:hidden">
        {currentPage > 1 && 
          <Link href={`?page=${currentPage - 1}`} className="btn join-item">
            &#171;
          </Link>
        }
        <button className="btn join-item btn-active pointer-events-none ">
          Page {currentPage}
        </button>
        {currentPage < totalPages && 
          <Link href={`?page=${currentPage +1}`} className="btn join-item">
            &#187;
          </Link>
        }
      </div>
    </>
  )
  
}