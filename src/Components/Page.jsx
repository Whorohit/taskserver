import React, { useState, useEffect } from 'react';

const Page = ({
  setpagenumber = () => {},
  initialpage = 1,
  totalpagetotalresult = 0,
}) => {
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalpagetotalresult / itemsPerPage);

  // Use local state to manage the current page
  const [currentpage, setCurrentPage] = useState(initialpage);

  const getPageRange = () => {
    const maxPagesToShow = 8;
    const halfRange = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentpage - halfRange);
    let end = Math.min(totalPages, currentpage + halfRange);

    if (end - start + 1 < maxPagesToShow) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxPagesToShow - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxPagesToShow + 1);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page); // Update local state
    setpagenumber(page); // Call the parent component function
  };

  useEffect(() => {
    // Trigger the range calculation whenever the current page changes
    getPageRange();
  }, [currentpage]);

  return (
    <div  className='flex items-center gap-2 '>
      <button 
        onClick={() => handlePageClick(currentpage - 1)} 
        disabled={currentpage <= 1}
        className='disabled:hidden  hover:bg-gray-400 rounded-sm px-2 py-1 bg-white focus-within:bg-gray-400 focus-within:scale-105 '
      >
        {'<'}
      </button>

      {getPageRange().map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          
          className={` ${page===currentpage?"bg-gray-400  ":"bg-white "} px-2 py-1 rounded-sm   focus-within:scale-105  
              `}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => handlePageClick(currentpage + 1)} 
        disabled={currentpage >= totalPages}
          className='disabled:hidden  hover:bg-gray-400 rounded-sm px-2 py-1  bg-white  focus-within:bg-gray-400 focus-within:scale-105 '
      >
        {'>'}
      </button>
    </div>
  );
};

export default Page;
