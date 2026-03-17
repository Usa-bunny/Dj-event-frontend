import Link from "next/link";
import { PER_PAGE } from "@/config/index";

export default function Pagination({ total, page }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`} className="btn-secondary">
          Previous
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`} className="btn-secondary">
          next
        </Link>
      )}
    </>
  );
}
