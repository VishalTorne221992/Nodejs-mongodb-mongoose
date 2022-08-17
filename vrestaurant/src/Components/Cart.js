import React, { useContext, useState, useEffect, useRef } from 'react';
import { MenuCartContext } from '../Contexts/MenuCartContext'
import CartItems from '../Components/CartItems';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import '../Styles/RestaurantDetailsMobile.css'


import { useNavigate } from 'react-router-dom';


export default function Cart() {

  const [isCartMOdalOpen, setisCartMOdalOpen] = useState(true)
  const [savedCartTotal, setsavedCartTotal] = useState(0)
  const cartTotal = useRef(0)
  const [isUserdetailsModalOpen, setisUserdetailsModalOpen] = useState(false)
  const { user, userData, LoggedIn, cartItems, Restaurantname, dispatch } = useContext(MenuCartContext)

  let navigate = useNavigate()

  window.onpopstate = () => {
        
        navigate("/")
  }
  
  window.onbeforeunload = () => {

    navigate(`/RestaurantDetails/${Restaurantname}`, { replace: false})

  }


  const newCartTotal = cartItems.reduce((newTotal, item) => {

    return newTotal + item.itemTotalPrice
  }, 0)

  useEffect(() => {
    setsavedCartTotal(newCartTotal)
   
    cartTotal.current = savedCartTotal
    
  }, [newCartTotal, savedCartTotal])


  function jsPdfGenerator() {


    html2canvas(document.getElementById('pdfdiv'), {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById('pdfdiv').style.visibility = 'visible';
      }
    }).then(function (canvas) {
      const divImage = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(divImage, 'PNG', 0, 0);
      pdf.save("Your-Invoice.pdf");
    })


  }

  const customStyles= {
    overlay: {
      
      overflowY:"scroll"
    },
    content:{
      marginLeft:'180px',
      paddingTop:'0px',
      width:'900px',
      border:'2px solid black',
      
    }
  }

  const customStylesUser= {
    overlay: {
      
      overflowY:"scroll"
    },
    content:{
      marginLeft:'180px',
      paddingTop:'10px',
      width:'900px',
      border:'2px solid black'
    }
  }

  const openRazorPay = async () =>{

    let data;

      data = await fetch('https://v-restaurant.herokuapp.com/payment/razorpay', 
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amount : newCartTotal})
      })
      .then(res => res.json())


      //show the complete transaction data :
      //console.log(data)

      const options = {
          key:'rzp_test_VEYin9OA6337Rm',
          currency: data.currency,
          amount: data.amount,
          name:'zomato -  Food Delivery',
          description: 'Transaction',
          order_id: data.id,

          handler : function(response){
               // save transcation

               //Display handler methods response
               //console.log('handler method', response)

               var values = {
                razorpay_signature: response.razorpay_signature,
                razorpay_order_id: response.razorpay_order_id,
                transaction_id: response.razorpay_payment_id,
                transaction_amount: data.amount 
               }

               fetch('https://v-restaurant.herokuapp.com/payment/transactions', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(values)
               }).then(res => res)
               .catch(err => err)

               dispatch({ type: 'ClearCart' })
               dispatch({ type: 'RefreshMenu' })

               const proceedOnSuccess = document.getElementById('ProceedButton')
               proceedOnSuccess.style.visibility = 'hidden'
          },

          "modal": {
            "ondismiss": function(){
                
                var divamount = document.getElementById('Checkoutamountdisplay')

                const paymentFailedString = 'Payment Cancelled Please Go Back and Order Again !!'

                divamount.textContent = paymentFailedString

                const proceedOnFailed = document.getElementById('ProceedButton')
                proceedOnFailed.style.visibility = 'hidden'
                
            }
          },
          prefill:{
            name: user,
            email: userData.email,
            contact: 9999999999,
          }
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      
      
      

  }

  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      };
      script.onerror = () => {
        resolve(false)
      }

       document.body.appendChild(script)

    })
  }


  return (

    <div style={{overflow:'hidden'}}>
      <Modal isOpen={isCartMOdalOpen} className='modalCart' overlayClassName='modalCartOverlay'>

        <div >
          <div className='CartPage' >

            <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />

            <div className='grid-container'>
              <div className='grid-header'> YOUR MENU DETAILS :</div>

              {
                cartItems.map((item) => {

                  return <div key={item._id} className='grid-item gridItemsCart' ><CartItems item={item} key={item._id} cartTotal={cartTotal} /> </div>

                })
              }


            </div>

            <h2 className='modalCartCartTotal'>Cart Total : {newCartTotal}</h2>


            <div id='paynow' className='btn btn-danger modalCartPaynow' onClick={() => {setisCartMOdalOpen(false); setisUserdetailsModalOpen(true)}} > <span className='modalCartPaynowspan'> Click to Pay {newCartTotal} </span> </div>



            <div id='printdetails' className='btn btn-dark modalCartPDFgen' onClick={() => jsPdfGenerator()}> <span className='modalCartPrintdetailstext'> Print Details </span> </div>

            <div className='btn btn-success modalCartGoBackbtn' onClick={() => navigate(`/RestaurantDetails/${Restaurantname}`, { replace: false})}> Go Back </div>


          </div>

        </div>



      </Modal>

      <Modal isOpen={isUserdetailsModalOpen} className='UserPaymentPageModal' overlayClassName='UserPaymentPageOverlay'>

        <div style={{fontSize:'25px', padding:'10px'}}> <label>User Name: </label> <div style={{display:'inline-block'}}> {user} </div> </div>
        <div style={{fontSize:'25px', paddingBottom:'10px', paddingLeft:'10px'}}> <label>Shipping Address: </label> <div style={{display:'inline-block'}}> {userData.Address} </div> </div>
        <div id='Checkoutamountdisplay' style={{fontSize:'25px', paddingBottom:'10px', paddingLeft:'10px'}}>Amount { cartItems.length === 0 ? `Paid ! : ${cartTotal.current}` : `to Pay : ${savedCartTotal}` }  </div>
        <div id='ProceedButton' style={{paddingLeft:'10px'}}> <button className='btn btn-success' style={{fontSize:'20px'}} onClick={() => {loadscript("https://checkout.razorpay.com/v1/checkout.js"); openRazorPay()}}> Proceed </button> </div> 
        <div className='btn btn-danger' onClick={() => navigate(`/RestaurantDetails/${Restaurantname}`, { replace: false})} style={{fontWeight:'bolder', marginTop:'20px', marginLeft:'10px'}}> Go Back </div>
      </Modal>

      <div id='pdfdiv' style={{ visibility: 'hidden' }}>

        <div className='pdfcontent' style={{ padding: '20px' }}>
          <div className='grid-container' >
            <div className='grid-header'> YOUR INVOICE DETAILS :</div>

            {
              cartItems.map((item) => {

                return <div key={item._id} className='grid-item gridItemsCart' style={{ backgroundColor: 'beige', color: 'black' }}>

                  <span className='modalCartItemName'> {item.itemName} </span>

                  <span className='CartdetailsMainPricemenuitemscart'> {item.itemPrice} </span>

                  <span className='Cartdetailsmenuitemscart'> X </span>

                  <span className='Cartdetailsmenuitemscart'> {item.quantity} </span>

                  <span className='Cartdetailsmenuitemscart'> = </span>

                  <span className='CartdetailsTOTmenuitemscart'>{item.itemTotalPrice}</span>



                </div>

              })
            }



          </div>

          <h2 style={{ fontWeight: 'bolder', marginTop: '30px', overflow: 'hidden' }}>Cart Total : {newCartTotal}</h2>


          <div id='paynow' className='btn btn-danger' style={{ fontWeight: 'bolder', fontSize: '18px', marginBottom: '30px', marginTop: '30px', width: "50px", marginLeft: '160px' }}> Total Amount: {newCartTotal} </div>

        </div>



      </div>


    </div>



  )
}


