import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SearchSuggestions from './SearchSuggestions';
import useFetch from '../hooks/useFetch';

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { data: suggestions, isLoading, error } = useFetch(`/products?populate=*&filters[title][$contains]=${searchTerm}`);
  const searchInputRef = useRef(null);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownVisible(true);
  };

  const onSelectSuggestion = (selectedProduct) => {
    navigate(`/product/${selectedProduct.id}`);
    setSearchTerm('');
    setIsDropdownVisible(false);

    // Blur the input field to potentially close the dropdown
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const handleSearchSubmit = () => {
    if (searchTerm.length > 0 && !isLoading && !error) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm('');
      setIsDropdownVisible(false);
    } else {
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className={`${isAnimating ? 'animate-shake' : 'animate-none'} w-full relative`}>
      <input
        ref={searchInputRef}
        onChange={handleSearchInput}
        className='input h-[40px] sm:h-[50px]'
        type='text'
        placeholder='Search for a product...'
      />
      <button onClick={handleSearchSubmit} className='btn absolute top-0 right-0 rounded-tl-none rounded-bl-none h-[40px] sm:h-[50px]'>
        <FiSearch className='sm:text-xl text-sm text-black' />
      </button>
      {searchTerm.length > 0 && !isLoading && !error && isDropdownVisible && suggestions && (
        <SearchSuggestions suggestions={suggestions} onSelectSuggestion={onSelectSuggestion} />
      )}
    </form>
  );
};

export default SearchForm;
