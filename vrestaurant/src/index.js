import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { MenuCartContextProvider } from './Contexts/MenuCartContext'


ReactDOM.render(

    
            <MenuCartContextProvider>
            <App />
            </MenuCartContextProvider>

   
 
  , document.getElementById('root')
);


