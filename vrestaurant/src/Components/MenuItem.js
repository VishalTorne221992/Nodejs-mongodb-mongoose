import React, { useContext } from 'react';
import { MenuCartContext } from '../Contexts/MenuCartContext'
import 'bootstrap/dist/css/bootstrap.css'
import '../Styles/RestaurantDetailsMobile.css'


function MenuItem({ item, setTotalPrice, index, TotalPrice }) {


  const { cartItems, dispatch } = useContext(MenuCartContext)

 
  const handleIncrement = () => {

    // Handle cart increment

  const foundItem = cartItems.find(obj => obj._id === item._id)


  
  if(foundItem){

    dispatch({ type:'UpdateAddeditem', payload: { foundItem: foundItem}})
    dispatch({ type:'UpdateMenu', payload: { item: foundItem}})
    dispatch({type:'updateItemTotal', payload: { item: foundItem}})

  }else{

    dispatch({ type:'additem', payload: { item: item}})
    dispatch({ type:'UpdateMenu', payload: { item: item}})

  }

        // set total price for cart

        setTotalPrice( prevPrice => {
          return prevPrice += item.itemPrice
        })
    

    
  }

  function handleDecrement() {

    

    try {

      const foundItem = cartItems.find(obj => obj._id === item._id)

      if(foundItem.quantity === 1){
        dispatch({type:'ChktoDelItem', payload:{ item: foundItem}})
      }
  
      
  
      if(foundItem.quantity > 0){
  
      
      dispatch({ type:'DecItem', payload: { item: item}})
      dispatch({ type:'DecrementUpdateMenu', payload: { item: item}})
      }
      
    } catch (error) {
     
      console.log('cannot further decrement')
   
    }

    

    if(item.quantity > 0){

        setTotalPrice( prevPrice => {
        return prevPrice -= item.itemPrice
        
     })
    }

    


  }



  return <div>

    <ul className='ulModalMenu' style={{border: '1px solid black', marginBottom:'15px', borderStyle: 'dashed', 
                 
                backgroundColor: item.quantity > 0 ? 'lightblue' : '', paddingBottom:'20px',
                paddingTop:'20px'
  }} >
      {


        <div key={item._id}>

          <div className='ModalItemName'> <li> {item.itemName} </li> </div>

          <div className='ModalItemPrice' > Price : &#8377; {item.itemPrice}</div>

          <div className='ModalItemDescription'>{item.itemDescription}</div>

          <div className='MenuButtonModal'>

            <button type="button" className="btn btn-danger minus" value={item._id} onClick={() => handleDecrement()}  >  <span className='minusSign'> - </span>  </button>
            <button type="button" className="btn btn-danger quantityMenuStyle" >  <span className='quantityMenuStyleDisplay'> {item.quantity < 0 ? 0 : item.quantity} </span>  </button>
            <button key={item.id} onClick={() => handleIncrement()} type="button" className="btn btn-danger plus"> <span className='plusSign'> + </span>   </button>

          </div>

        </div>




      }
    </ul>


  </div>;
}

export default MenuItem;

