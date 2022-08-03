import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/HeaderHome.css'

export default class LoginComponent extends Component {

   

  render() {


    return (
      <div className='px-2 py-2' style={{display:'inline-block', width:'250px', marginLeft:'-52px', zIndex:'2', position:'relative'}}>

          <div className='login2' style={{ display:'inline-block', fontSize:'18px'}}><Link style={{textDecoration:'none', color:'whitesmoke'}} to='#' onClick={(e) => this.props.onClickButton(e)}>Login</Link></div>
          <div className="createacc px-2 py-2" style={{ display:'inline-block', border:'2px solid whitesmoke'}}> <Link style={{textDecoration:'none', color:'whitesmoke'}} to='#' onClick={(e) => this.props.handleRegister(e)}> Create Account </Link></div> 

      </div>
      
    )
  }
}
