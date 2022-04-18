import { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContextProvider from './store/CartContextProvider';

import Header from './components/Layout/Header';

function App() {
  console.log('app');
  const [cartVisible,setCartVisible] = useState(false);
  const [message, setMessage] = useState('venusq');
  function showCart(){
    setCartVisible(true);
  };

  function hideCart(){
    console.log('close');
    setCartVisible(false);
  };

  function chngState(){
    console.log('click');
    setMessage(m=>{
      console.log('inside');
      return 'venusq1';
    });
  };
  return (
    
    <CartContextProvider>
      {cartVisible && <Cart hideCart ={hideCart}/>}
      <Header showCart={showCart}/>
      <button onClick={chngState}>change state</button>
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
