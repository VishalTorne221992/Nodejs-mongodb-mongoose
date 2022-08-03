import React, { useEffect, useState } from 'react';
import '../Styles/HeaderHome.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import 'bootstrap/dist/css/bootstrap.min.css'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


export default function VrestHome2() {

  const [locations, setLocations] = useState([])
  const [Restaurants, setRestaurants] = useState([])
  const [IsModalOpen, SetIsModalOpen] = useState(false)
 

  // const ModalStyle ={

  //   top:"50%",
  //   left:'50%',
  //   right:'auto',
  //   bottom:'auto',
  //   width:'450px',
  //   marginRight: '-50%',
  //   transform: "tranlate(-50%, -50%)"
  
  // }



  useEffect(() => {
    fetch('http://localhost:5252/zomato/locations')
      .then(res => res.json())
      .then(data => setLocations(data.data))
  }, [])


  const fetchRestaurants = (event) => {

    console.log(event.target.value);
    console.log(fetch(`http://localhost:5252/zomato/restaurants/${event.target.value}`, { method: 'GET' })
                   .then(res => res.json())
                   .then(data => setRestaurants(data.result))
    )
      
     
  }
   
 
  let locationList = locations.map((item) => <option key={item.name} value={item.city_id}>{item.name}</option>)

  let RestaurantList = Restaurants.length && <ul>{Restaurants.map((item) => <Link to={`/RestaurantDetails/${item.name}`}><li key={item.name}>{item.name}</li></Link>)}</ul>

  return (
    <div className='ContainerHome'>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />

      <div className="container-fluid back-img">

        <div className="row text-end pt-4 login-signup-row">
          <div className="col-5 col-md-6 col-lg-7 col-sm-2"></div>
          <div className="col-2 col-sm-4 col-md-2 text-end">
            <Link className="login" to="#" onClick={() => SetIsModalOpen(true)}> Login </Link>
          </div>
          <div className="col-5 col-md-4 col-lg-3 col-sm-6 text-start">
            <a className="createacc px-2 py-2" style={{ border: '1px solid white' }} href="/"> Create an account </a>
          </div>
        </div>

        <div className="row pt-5 text-center mx-auto">
          <div className="col-12" style={{ paddingRight: "80px" }}>
            <p className="logo py-2 px-4 py-lg-4 px-lg-5" > Vi </p>
          </div>

        </div>

        <div className="row text-center pt-4">
          <div className="col-12">
            <p className="restaurant-title"> Find the best restaurants, cafe's, and bars </p>
          </div>
        </div>



        <div className="row pt-4" >
          <div className="col-0 col-lg-1" style={{ width: '320px' }}></div>
          <div className="col-12 col-lg-3 text-end location-selector-div" style={{ marginBottom: '20px' }}>
            <div className="location-selector" style={{ paddingLeft: '90px' }}>
              <select className='locationDropdown px-3' onChange={(event) => fetchRestaurants(event)}>
                <option value="0" style={{ display: 'none' }}>Please type a location</option>
                {locationList}
              </select>
            </div>
          </div>

          <div className="col-0 col-lg-5 text-start" >
            <div className="restaurantSelector" style={{ paddingLeft: '20px' }}>
              <input className="icon" type="text" placeholder="  Search for restaurants"
                style={{ paddingLeft: '50px', fontFamily: 'Poppins', opacity: "85%" }} />

              <>
                {
                  RestaurantList ? RestaurantList : ''
                }

              </>
            </div>
          </div>
        </div>

      </div>

       <Modal show={IsModalOpen}>
         <ModalHeader>Modal Header</ModalHeader>
         <ModalBody>Hi Login

                      <div className='mt-4'>

                        <FacebookLogin></FacebookLogin>
                      </div>

                      <div>
                        <GoogleLogin></GoogleLogin>
                      </div>

         </ModalBody>
         <ModalFooter>
           <Button id="hello" onClick={() => SetIsModalOpen(false)}> Close Modal </Button>
         </ModalFooter>
       </Modal>

      

    </div>

  );
}
