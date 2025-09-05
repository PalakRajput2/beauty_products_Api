// src/components/ui/Pagination.jsx
import React from "react";

function Pagination({ page, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        pages.push(i);
      } else if (
        (i === page - delta - 1 && page - delta > 2) ||
        (i === page + delta + 1 && page + delta < totalPages - 1)
      ) {
        pages.push("...");
      }
    }

    return [...new Set(pages)];
  };

  return (
    <div className="flex justify-center mt-8 gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Prev
      </button>

      {getPageNumbers().map((p, index) =>
        p === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}`} 
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-md ${
              page === p
                ? "bg-purple-500 text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
