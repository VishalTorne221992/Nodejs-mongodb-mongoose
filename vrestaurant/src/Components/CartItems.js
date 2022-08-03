import React from 'react'
import '../Styles/CartPagecss.css'

export default function CartItems({ item }) {


  const { itemName, itemPrice, quantity, itemTotalPrice } = item

  return (

    <div style={{ padding: '5px', overflow:'hidden' }}>



      <span style={{ marginLeft: '70px', width: '200px', display: 'inline-block' }}> {itemName} </span>

      <div style={{ float: 'right', color: 'white', fontFamily: 'Calibri', marginRight: '80px' }}>

        <span style={{ backgroundColor: 'rgb(13, 2, 63)', width: '40px', display: 'inline-block', textAlign: 'center' }}> {itemPrice} </span>

        <span style={{ backgroundColor: 'darkblue', width: '40px', display: 'inline-block', textAlign: 'center' }}> X </span>

        <span style={{ backgroundColor: 'darkblue', width: '40px', display: 'inline-block', textAlign: 'center' }}> {quantity} </span>

        <span style={{ backgroundColor: 'darkblue', width: '40px', display: 'inline-block', textAlign: 'center' }}> = </span>

        <span style={{ backgroundColor: 'darkblue', width: '90px', display: 'inline-block', textAlign: 'center' }}>{itemTotalPrice}</span>

      </div>


    </div>




  )
}
