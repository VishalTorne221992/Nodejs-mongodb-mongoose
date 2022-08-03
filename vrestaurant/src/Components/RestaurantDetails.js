import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '../Styles/HeaderAllPages.css'
import HeaderAllPage from './HeaderAllPage';
import MenuItem from './MenuItem';
import Modal from 'react-modal';
import {MenuCartContext}  from '../Contexts/MenuCartContext'
import '../Styles/Modal-menustyle.css'
import '../Styles/RestaurantDetailsMobile.css'

import { Link } from 'react-router-dom';

Modal.setAppElement('#root')
export default function RestaurantDetails() {

  const { name } = useParams();

  const { user, LoggedIn, cartItems, RestaurantUsermenu , dispatch } = useContext(MenuCartContext)

  let navigate = useNavigate()
  const [restaurant, setRestaurant] = useState([])
  const [IsMenuModalopen, setIsMenuModalopen] = useState(false);
  var [TotalPrice, setTotalPrice] = useState(0);
  

  useEffect(() => {
    
    if(cartItems.length !== 0)
    return setIsMenuModalopen(true)
  }, [cartItems])

  useEffect(() => {
 

    const prices = cartItems.reduce((total, item) => {
          return total + item.itemTotalPrice
    },0)

    setTotalPrice(prices)
    

  },[cartItems])


  useEffect(() => {
 
    // dispatching name when Restaurant name changes by any component through link or whatever
    
    dispatch({type:'getRestaurantname', payload: {name: name}})

  const fetchData = async () => await (fetch(`http://localhost:5252/zomato/restaurantsDetails/${name}`)
    .then(res => res.json())
    .then(data => setRestaurant(data.result))
  )

  fetchData()
     
  }, [name])


  function handleClose() {

    if(cartItems.length === 0)
    {
      setIsMenuModalopen(false)
      
    }else{


      if (window.confirm("you have delicious items in your order.. Sure you want to continue?") === true ){
        setIsMenuModalopen(false)

        dispatch({type:'ClearCart'})
        dispatch({type:'RefreshMenu'})
        setTotalPrice(0)
        
      }

    }
 
  
  }

  function handleGuestLogin(e){
       
    e.preventDefault()

       if(!user && !LoggedIn){
          alert('Please login to continue')
       }
       else{
        navigate("/cart", { replace: true });
       }

  }


  const RestaurantName = restaurant.map((item) => item.name)
  const cuisinenames = restaurant.map((item) => <p key={item.name}>{item.Cuisine.map(c => c.name).join(" , ")}</p>)

  const costRestaurant = restaurant.map((item) => item.cost)

  const RestaurantAddress = restaurant.map((item) => item.address)

  const RestaurantContactnumber = restaurant.map((item) => item.contact_number)


  return (
  
    <div className='RestaurantDetailsContainer'>

      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />

      <HeaderAllPage />
      <div className='RestaurantDetailImage'>

        <div > <button className='galleryButton'> Click to see Image Gallery </button> </div>

      </div>




      <div className='ContainerRestaurantDetails'>

        <div className='RestaurantName' style={{ marginLeft: "8px" }}>{RestaurantName}</div>

        <div>
          <button className='btn btn-danger PlaceOrder' onClick={() => setIsMenuModalopen(true)} style={{ margin: "17px", backgroundColor: '#ce0505', float: 'right' }}> Place Online Order </button>
        </div>

        <div className="tabs">
          <input type="radio" className="tabs__radio" name="tabs-example" id="tab1" defaultChecked />
          <label htmlFor="tab1" className="tabs__label">Overview</label>
          <div className="tabs__content">
            <br />

            <p id='AboutThisPlace'>About this place</p>


            <p id='CuisineHeading'>Cuisine</p>
            {cuisinenames}

            <p id='AvgCost'>Average Cost</p>
            <div>
              <p id='RestCost' style={{ wordSpacing: '-1px' }}>Rs. {costRestaurant} &nbsp; for  two people (approx.)</p></div>
          </div>
          <input type="radio" className="tabs__radio" name="tabs-example" id="tab2" />
          <label htmlFor="tab2" className="tabs__label">Contact</label>
          <div className="tabs__content">
            <div id='ContactTab'>
              <br />
              <p id='RestAddress'>Address</p>
              <p>{RestaurantAddress}</p>
              <p id='RestContactNumber'>Contact Number: </p>
              <p>{RestaurantContactnumber}</p>
            </div>
          </div>
        </div>



      </div>


      <Modal isOpen={IsMenuModalopen} style={{
        position: 'absolute',
        width: '900px',
        height: '700px',
        right: '100px',
        left: '220px',
        padding: '30px',
        top: '30px',
        bottom: '10px',
        backgroundColor: 'white',
        boxShadow: '0 8px 6px 5px rgba(0, 0, 0, 0.16)'
      }}>


        <button className='btn btn-danger' onClick={() => handleClose()} style={{ float: 'right', width: '50px', height: '50px', fontSize: '25px', overflow: 'hidden', fontWeight: "bolder" }}>  X   </button>
        <h2 style={{ display: 'inline' }} > Menu </h2>
        <br />
        <br />
        <h3 className='NameInModal' >
          {name}
        </h3>

        <div className='btn btn-dark clearItems' onClick={ () => { 
          dispatch({ type: 'ClearCart' })
          dispatch({ type: 'RefreshMenu' })
        }}> Clear Items </div>

       <div>
        
       {  
           RestaurantUsermenu.length && RestaurantUsermenu.map((item, index) => {

            return <MenuItem key={item._id} item={item} handleClose={handleClose} setTotalPrice={setTotalPrice} TotalPrice={TotalPrice} index={index} name={name} />
                  
          })
        }

       </div>
       

        <h2 className='TotalPriceMenuDisplay'>TotalPrice : {TotalPrice <= -1 ? setTotalPrice(0) : TotalPrice} </h2>
        <Link to='#' onClick={(e) => handleGuestLogin(e)} style={{textDecoration: "none", color:'white'}}><button className='btn btn-danger ConfirmButton' >  <span className='confirmbtnText'> CONFIRM ORDER </span>   </button> </Link>

      </Modal>

      

    </div>
 
  )
}
