import { useState, useCallback } from "react";

export const useCatGallery = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchCats = async (page, isAppending = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=6&page=${page}&order=Desc`
      );
      if (!response.ok) throw new Error("Failed to fetch cats");
      const newCats = await response.json();
      if (newCats.length === 0) {
        setHasMore(false);
      } else if (isAppending) {
        setCats((prevCats) => [...prevCats, ...newCats]);
      } else {
        setCats(newCats);
      }
      setCurrentPage(page);
      if (!isInitialized) setIsInitialized(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    cats,
    loading,
    error,
    currentPage,
    hasMore,
    isInitialized,
    fetchCats,
    setCats,
  };
};
