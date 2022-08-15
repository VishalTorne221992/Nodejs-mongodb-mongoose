import React from 'react';
import RestaurantHome from './Vrestauranthome'
import QuickSearch from './QuickSearch'



export default function Home() {

  return <div style={{ width:'100vw', position:'fixed'}}><React.Fragment><RestaurantHome/> <QuickSearch/> </React.Fragment></div>;
}
