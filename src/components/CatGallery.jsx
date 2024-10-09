import React, { useEffect, useRef, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { useCatGallery } from "../hooks/useCatGallery";
import CatCard from "./catCards";

const CatGallery = () => {
  const {
    cats,
    loading,
    error,
    currentPage,
    hasMore,
    isInitialized,
    fetchCats,
  } = useCatGallery(); 

  const loader = useRef(null); 

  const [isInfiniteScroll, setIsInfiniteScroll] = useState(true); // State to toggle infinite scroll vs pagination
  const [storedCats, setStoredCats] = useState([]); // State to hold cats from local storage

  // Load cats from local storage on component mount
  useEffect(() => {
    const catsFromStorage = JSON.parse(localStorage.getItem("cats")) || [];
    if (catsFromStorage.length > 0) {
      setStoredCats(catsFromStorage);
    }
  }, []);

  // Save cats to local storage whenever cats are fetched
  useEffect(() => {
    if (isInitialized && cats.length > 0) {
      localStorage.setItem("cats", JSON.stringify(cats));
    }
  }, [cats, isInitialized]);

  // Infinite scroll observer logic
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading && isInitialized) {
        fetchCats(currentPage + 1, true); 
      }
    },
    [hasMore, loading, currentPage, isInitialized, fetchCats]
  );

  useEffect(() => {
    if (isInfiniteScroll) {
      const observerOptions = {
        root: null,
        rootMargin: "20px",
        threshold: 0,
      };
      const observer = new IntersectionObserver(
        handleObserver,
        observerOptions
      );
      if (loader.current) observer.observe(loader.current);

      return () => {
        if (loader.current) observer.unobserve(loader.current);
      };
    }
  }, [handleObserver, isInfiniteScroll]);

  // Manual pagination handlers
  const handleNextPage = () => {
    if (!loading && hasMore) fetchCats(currentPage + 1); // Fetch next page
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !loading) fetchCats(currentPage - 1); // Fetch previous page
  };

  return (
    <div className="p-4">
      {/* Toggle button for infinite scroll / pagination */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsInfiniteScroll(!isInfiniteScroll)} // Toggle between infinite scroll and pagination
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
        >
          {isInfiniteScroll
            ? "Switch to Pagination"
            : "Switch to Infinite Scroll"}
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => fetchCats(1)} 
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
        >
          {!isInitialized ? (
            loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load Cats"
            )
          ) : (
            "Refresh Cats"
          )}
        </button>
      </div>

      {!isInitialized && !loading && (
        <div className="text-center text-gray-500 my-4">
          Click the 'Load Cats' button to start!
        </div>
      )}

     
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {/* Grid Display for Cats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(isInitialized ? cats : storedCats).map((cat, index) => (
          <CatCard key={`${cat.id}-${index}`} cat={cat} index={index} /> // Using CatCard for each cat
        ))}
      </div>

      {/* Loader for Infinite Scrolling */}
      {isInfiniteScroll && (
        <div ref={loader} className="h-10 flex items-center justify-center">
          {loading && <Loader2 className="h-6 w-6 animate-spin" />}{" "}
          {/* Show loader while loading */}
        </div>
      )}

      {/* Pagination Controls */}
      {!isInfiniteScroll && (
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={loading || currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="text-center text-gray-500">Page {currentPage}</div>

          <button
            onClick={handleNextPage}
            disabled={loading || !hasMore}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* No More Cats Message */}
      {!hasMore && cats.length > 0 && (
        <div className="text-center text-gray-500 mt-2">
          No more cats to load!
        </div>
      )}
    </div>
  );
};

export default CatGallery;
