import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFav, setIsOpenFav] = useState(false);
  const [cart, setCart] = useState([]);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [itemsAmountFav, setItemsAmountFav] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountFav, setAmountFav] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const amount = cart.reduce((a, c) => a + c.amount, 0);
    setItemsAmount(amount);
  }, [cart]);

  useEffect(() => {
    const amountFav = fav.reduce((a, c) => a + c.amount, 0);
    setItemsAmountFav(amountFav);
  }, [fav]);


  useEffect(() => {
    const total = cart.reduce((a, c) => a + c.attributes.price * c.amount, 0);
    setTotal(total);
  }, [cart]);


  

  const addToCart = (item, id, selectedSize) => {
    // Check if the item with the same product ID is already in the cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      // If the item already exists, check if the size is different
      if (existingItem.selectedSize !== selectedSize) {
        // If the size is different, add the item as a new entry with a unique ID
        const newItem = { ...item[0], amount: 1, selectedSize: selectedSize, id: parseInt(id) + 1 };
        setCart([...cart, newItem]);
      } else {
        // If the size is the same, increase the amount of the existing item
        const updatedCart = cart.map(item => {
          if (item.id === id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
        setCart(updatedCart);
      }
    } else {
      // If the item does not exist in the cart, add it as a new entry
      const newItem = { ...item[0], amount: 1, selectedSize: selectedSize, id: id };
      setCart([...cart, newItem]);
    }

    setIsOpen(true);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };


  // add to cart fav


  const addToCartFav = (item, id) => {
    const existingItemIndex = fav.findIndex(favItem => favItem.id === id);
  
    if (existingItemIndex !== -1) {
      // Item already exists in favorites, remove it
      const updatedFav = [...fav];
      updatedFav.splice(existingItemIndex, 1); // Remove item from favorites array
      setFav(updatedFav);
      
    } else {
      // Item does not exist in favorites, add it
      const newItem = { ...item[0], amount: 1, id: id };
      setFav([...fav, newItem]);
      setIsOpenFav(true); // Set isOpenFav to true to show the favorites component
    }
  };
  


  const removeFromCartFav = (id) => {
    const updatedFav = fav.filter(item => item.id !== id);
    setFav(updatedFav);
    setItemsAmountFav(prevAmountFav => prevAmountFav - 1);
  };


  
  const handleInput = (e, id) => {
    const value = parseInt(e.target.value);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          if (isNaN(value)) {
            setAmount(1);
            return { ...item, amount: 1 };
          } else {
            setAmount(value);
            return { ...item, amount: value };
          }
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    setIsOpen(true);
  };

  const handleInputFav = (e, id) => {
    const value = parseInt(e.target.value);
    const cartItem = fav.find(item => item.id === id);

    if (cartItem) {
      const newFav = fav.map(item => {
        if (item.id === id) {
          if (isNaN(value)) {
            setAmountFav(1);
            return { ...item, amount: 1 };
          } else {
            setAmountFav(value);
            return { ...item, amount: value };
          }
        } else {
          return item;
        }
      });
      setFav(newFav);
    }
    setIsOpenFav(true);
  };


  const handleSelect = (e,id)=>{

    const value = parseInt(e.target.value);
    const cartItem = cart.find(item =>{
      return item.id ===id;
    })

    if(cartItem){
      const newCart = [...cart].map(item=>{

        if(item.id === id){
          setAmount(value);
          return{...item,amount:value};
        }else{
          return item;
        }
      })

      setCart(newCart);
    }

  }

  // handleSelect, handleSelectFav, clearCart, and clearCartFav functions remain unchanged

  const clearCart = () => {
    setCart([]);
  };

  const clearCartFav = () => {
    setFav([]);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isOpenFav,
        setIsOpenFav,
        cart,
        addToCart,
        removeFromCart,
        itemsAmount,
        fav,
        addToCartFav,
        removeFromCartFav,
        itemsAmountFav,
        handleInput,
        handleInputFav,
        total,
        clearCart,
        clearCartFav,
        selectedSize,
        setSelectedSize,
        handleSelect,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
