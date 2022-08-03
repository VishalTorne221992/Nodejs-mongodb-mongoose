import React, { useContext, useEffect } from 'react';
import '../Styles/HeaderAllPages.css'
import LogOut from '../Components/LogOutComponent'
import {MenuCartContext}  from '../Contexts/MenuCartContext'
import '../Styles/RestFilterMobile.css'



export default function HeaderAllPage() {

    const { user, LoggedIn } = useContext(MenuCartContext)
 

    return (

   

        <div>

            <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />

            <div className='headerDetails'>

                <div className='RestaurantICON'> Vi </div>
                <div className='LoginDiv'>{
                    user === 'Guest' ?
                    <div className='GuestOrUser'>   <span>Hi !</span> {user} </div>
                    :
                    <div className='userLogin'>
                    <div style={{marginTop:'2px'}}>   <span>Hi !</span> {user} </div>
                    <div className='userLogoutdiv'><LogOut/></div>
                    </div>
                }
                </div>

            </div>
        </div>
           

    )
}
