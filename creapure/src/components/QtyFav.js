import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Qty = ({ item }) => {
  const { handleSelect, handleInputFav } = useContext(CartContext);

  const handleSelectChange = (e) => {
    handleSelect(e, item.id);
  };

  const handleInputBlur = (e) => {
    handleInputFav(e, item.id);
  };

  return (
    <div className='flex gap-x-6 items-center text-primary'>
      {item.amount < 10 ? (
        <select
          onChange={handleSelectChange}
          value={item.amount}
          className='p-2 rounded-lg w-[100px] h-12 outline-none text-primary'
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
          <option value="10">10+</option>
        </select>
      ) : (
        <input
          onBlur={handleInputBlur}
          className='text-primary placeholder:text-primary h-12 rounded-md p-4 w-[120px] outline-accent'
          type='text'
          placeholder={`${item.amount}`}
        />
      )}
    </div>
  );
};

export default Qty;
