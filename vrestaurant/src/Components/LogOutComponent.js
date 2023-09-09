import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/HeaderHome.css'


export default class LogOutComponent extends Component {
    

  handleLogout(){

    // const res =await fetch('http://localhost:5252/zomato/logout', {
    //   method:'DELETE',
    //   redirect:'follow'
    // }).then(res => {
    //   if(res.redirected){window.location.href = res.url}
    // })

    fetch('https://vrestaurantapp.onrender.com/zomato/logout', {
      method:'DELETE',
      redirect:'follow'
    }).then(res => {
      if(res.redirected){
        window.location.href = res.url
      }
    })
    
    localStorage.setItem('user','Guest')
    
      
  }
  
  render() {


    return (
      <div className='px-2 py-2 logoutDiv' >
           
           <div className="logoutLabel px-2 tx-1 py-2" style={{ display:'inline-block', marginLeft:'-10px', border:'2px solid white'}}><Link to='#' onClick={() => this.handleLogout()} style={{textDecoration:'none', color:'white', marginLeft:'0px', fontSize:'20px'}}> LogOut </Link></div>

      </div>
    )
  }
}
 
