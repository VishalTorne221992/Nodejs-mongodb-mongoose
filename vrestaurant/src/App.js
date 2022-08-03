import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import RestaurantDetails from './Components/RestaurantDetails';
import RestaurantFilter from './Components/RestaurantFilter';
import Cart from './Components/Cart';
import { MenuCartContextProvider } from './Contexts/MenuCartContext'
import { UserContextProvider } from './Contexts/UserContext';
import {RestaurantContextProvider} from './Contexts/RestaurantContext'



function App() {


  return (
    <BrowserRouter>
    <UserContextProvider>
      <MenuCartContextProvider>
        <RestaurantContextProvider>
      <Routes>
        
          <Route path="/" element={<Home />}></Route>
          <Route path="/restaurants/filter/:pageNo" element={<RestaurantFilter />}></Route>
          <Route path="/RestaurantDetails/:name" element={<RestaurantDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          
          

      </Routes>

      </RestaurantContextProvider>
      </MenuCartContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}


export default App;
