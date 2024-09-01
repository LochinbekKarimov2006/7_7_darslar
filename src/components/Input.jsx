import React, { useState, useEffect } from 'react';

// useDebounce custom hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// SearchPage component
function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Qidiruv funksiyasi yoki API chaqiruvi
      console.log('Qidiruv natijalari:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-col items-center justify-center h-[56vh] bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Qidiruv sahifasi</h1>
      <input
        type="text"
        placeholder="Biror narsa qidiring..."
        value={searchTerm}
        onChange={handleSearch}
        className="input input-bordered w-full max-w-xs"
      />
      {debouncedSearchTerm && (
        <p className="mt-4 text-lg">Siz qidirayotgan narsa: {debouncedSearchTerm}</p>
      )}
    </div>
  );
}

function Input() {
  return <SearchPage />;
}
export default Input;
