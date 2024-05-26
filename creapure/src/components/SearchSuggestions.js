// SearchSuggestions.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SearchSuggestions = ({ suggestions, onSelectSuggestion }) => {
  const limitedSuggestions = suggestions.slice(0, 5); // Display only the first 5 suggestions

  return (
    <div className="absolute z-50 bg-white text-black p-4 rounded-md w-full mt-1">
      <div className="suggestions-dropdown">
        {limitedSuggestions.length > 0 ? (
          limitedSuggestions.map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="suggestion-item flex items-center space-x-4">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <img
                    src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-container">
                  <div className="title">{product.attributes.title}</div>
                </div>
              </div>
              {index !== limitedSuggestions.length - 1 && (
                <hr className="my-2 border-gray-300" />
              )}
            </Link>
          ))
        ) : (
          <div className="text-gray-500">Nu am gasit produsul</div>
        )}
      </div>
    </div>
  );
};

export default SearchSuggestions;
