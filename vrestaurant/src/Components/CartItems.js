import React from 'react'
import '../Styles/RestaurantDetailsMobile.css'

export default function CartItems({ item }) {


  const { itemName, itemPrice, quantity, itemTotalPrice } = item

  return (

    <div style={{ padding: '5px', overflow:'hidden' }}>



      <span className='modalCartItemName'> {itemName} </span>

      <div className='modalCartItemsDetails'>

        <span className='CartdetailsMainPricemenuitemscart'> {itemPrice} </span>

        <span className='Cartdetailsmenuitemscart'> X </span>

        <span className='Cartdetailsmenuitemscart'> {quantity} </span>

        <span className='Cartdetailsmenuitemscart'> = </span>

        <span className='CartdetailsTOTmenuitemscart'>{itemTotalPrice}</span>

      </div>


    </div>




  )
}
