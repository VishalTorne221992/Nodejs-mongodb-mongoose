import React, { Component } from 'react'
import '../Styles/HeaderHome.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import '../Styles/FilterpageStyle.css'
import '../Styles/RestFilterMobile.css'
import Modal from 'react-modal'
import Login from '../Components/LoginComponent'
import LogOut from '../Components/LogOutComponent'

import { MenuCartContext } from '../Contexts/MenuCartContext'




Modal.setAppElement('#root')
export default class Vrestauranthome extends Component {

    static contextType = MenuCartContext


    constructor(props) {
        super(props)


        this.state = {
            locations: [],
            restaurants: [],
            isOpen: false,
            registerOpen: false,
            registerMessage: '',
            currentUsername: 'Guest',
            usernameLogin: '',
            passwordLogin: '',
            useremail: '',
            userAddress: '',
            isHovering: false,
            RestaurantSearchList: []
        }



    }



    componentDidMount() {

        
        this.setState({ currentUsername: localStorage.getItem('user') })

        fetch('http://localhost:5252/zomato/locations', { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ locations: data.data }))

        const Localuser = localStorage.getItem('user')

        this.setState({ currentUsername: Localuser })


    }



    fetchRestaurants = (event) => {

        fetch(`http://localhost:5252/zomato/restaurants/${event.target.value}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                this.setState({ restaurants: data.result })
                this.setState({ RestaurantSearchList: data.result })
            })
            .catch(error => error)

        this.setState({ isHovering: true })
    }

    modalStyle = {

        overlay: {
            backgroundColor: 'rgb(136, 136, 136, 0.65)',

        },

        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '500px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflow: "hidden",

        }
    }

    RegisterModalStyle = {

        content: {

            left: '280px',
            width: '700px',
            height: '500px'

        }

    }


    onClickButton = e => {
        e.preventDefault()
        this.setState({ isOpen: true })
    }

    onCloseModal = () => {
        this.setState({ isOpen: false })
    }


    facebookLogin = (response) => {
        console.log(response);
    }




    googleLogin = () => (response) => {
        console.log(response);
    }

    handleRegister = e => {
        e.preventDefault()
        this.setState({ registerOpen: true })

    }



    // Register user section

    handleformSubmit(e) {
        e.preventDefault()

        const userDetails = {

            usernameForm: '',
            userPasswordForm: '',
            useremailForm: '',
            userAddressForm: ''

        }

        const userForm = document.getElementById('userregisterForm')

        const userFormdata = new FormData(userForm)

        userDetails.usernameForm = userFormdata.get('username')
        userDetails.userPasswordForm = userFormdata.get('password')
        userDetails.useremailForm = userFormdata.get('useremail')
        userDetails.userAddressForm = userFormdata.get('userAddress')


        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails)

        }

        // When users gives user details post to node and get register success or failure message

            fetch('http://localhost:5252/zomato/register', requestOptions)
                .then(res => res.json())
                .then(data => this.setState({ registerMessage: data.message }))




    }


    handleLogin(e) {

        e.preventDefault()

        const { dispatch } = this.context

        const userLoginForm = document.getElementById('LoginForm')

        const Loginform = new FormData(userLoginForm)

        const usernameLogin = Loginform.get('usernameLogin')
        const passwordLogin = Loginform.get('passwordLogin')

        this.setState({ usernameLogin: usernameLogin, passwordLogin: passwordLogin })


        const LoginInfo = {
            username: usernameLogin,
            password: passwordLogin
        }


        fetch('http://localhost:5252/zomato/login', {
            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(LoginInfo)
        }).then(res => res.json())
            .then(data => {
                dispatch({ type: 'UserLoggedIN', payload: { username: data.user.username } })
                dispatch({ type: 'AddUserData', payload: { user: data.user } })
                localStorage.setItem('user', data.user.username)
                this.setState({ currentUsername: data.user.username })

            })
            .finally(() => {
                this.onCloseModal()
            })
        //   .then(resdata => {
        //       if(resdata.redirected){
        //           window.location.href= resdata.url
        //       }
        //   })
        //   .then(data => this.setState({ currentUsername: data.username }))
        //   .finally(() => {
        //        this.onCloseModal()
        //   })

    }

    handleSearchChange(e) {


        let SearchText = e.target.value

        let matches = []

        if (SearchText.length > 0) {

            matches = this.state.restaurants.filter(rest => {
                const Searchregex = new RegExp(`${SearchText}`, 'gi')
                return rest.name.match(Searchregex)

            })



            return this.setState({ RestaurantSearchList: matches })
        }





        return this.setState({ RestaurantSearchList: this.state.restaurants })


    }


    render() {


        let locationList = this.state.locations.length && this.state.locations.map((item) => <option key={item.name} value={item.city_id}>{item.name}</option>)

        // Create Restaurant unordered List to show when user selects Restaurant name from dropdown

        let restaurantList = this.state.RestaurantSearchList.length && <ul className='searchresultsDropDown'>{
            this.state.RestaurantSearchList.map((item) => <li className='searchresultsDropDownList' key={item.name}>
                <Link to={`/RestaurantDetails/${item.name}`} onClick={() => {
                    const { dispatch } = this.context
                    dispatch({ type: 'getRestaurantname', payload: { name: item.name } })
                    dispatch({ type: 'ClearCart' })
                    dispatch({ type: 'RefreshMenu' })
                }} style={{ textDecoration: 'none', color: 'red', fontWeight: 'bolder' }}>{item.name}</Link></li>)}</ul>


        return (

            <div className='ContainerHome'>

                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />

                <div className="container-fluid back-img">

                    <div className="row p-2 login-signup-row" >
                        <div className="col-7 col-md-6 col-lg-6 col-xs-6" >  </div>
                        <div className="col-5 col-xs-6 col-lg-6 col-md-2 px-2 py-2" >
                            <div className='login' style={{ display: 'inline-block', width: '250px' }}>

                                <div style={{marginLeft:'20px'}} >Welcome !  {this.state.currentUsername}</div>

                            </div>
                            {this.context.user === 'Guest' ? <Login handleRegister={this.handleRegister} onClickButton={this.onClickButton} /> : <LogOut />}</div>
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

                    <div className='RestSearch'>

                        <div className='RestSearchDropDown'>

                            <select className='RestlocationDropdown' onChange={this.fetchRestaurants} onMouseEnter={() => this.setState({ isHovering: true })}>
                                <option value="0">Please type a location</option>
                                {locationList}
                            </select>

                        </div>

                        <div className='SearchInputMain'>

                            <div className='RestSearchInput'>

                                <input className="icon" type="text" placeholder="  Search for restaurants" onMouseEnter={() => this.setState({ isHovering: true })}
                                    style={{ paddingLeft: '50px', fontFamily: 'Poppins', opacity: "85%" }} onChange={(e) => this.handleSearchChange(e)} />

                            </div>

                            <div className='RestSearchDetails'>

                                {
                                    this.state.isHovering &&
                                    <div className='RestaurantListCSS1' onMouseLeave={() => this.setState({ isHovering: false })}>
                                        {

                                            <>
                                                {
                                                    restaurantList ? restaurantList : ''
                                                }
                                            </>



                                        }

                                    </div>
                                }

                            </div>

                        </div>

                    </div>



                </div>


                <Modal isOpen={this.state.isOpen} style={this.modalStyle}>



                    <button className='btn btn-danger' onClick={this.onCloseModal} style={{ float: "right" }}> X </button>
                    <h2>Login</h2>

                    <form id='LoginForm'>

                        <div style={{ marginBottom: '10px', marginTop: '15px' }}><input type='text' id='usernameLogin' name='usernameLogin' placeholder='Email or Username' className='form-control' /></div>

                        <div> <input type='password' placeholder='Password' id='passwordLogin' name='passwordLogin' className='form-control' /> </div>

                        <div style={{ marginTop: '25px', marginBottom: '35px' }}><button className="btn btn-primary" onClick={(e) => this.handleLogin(e)} >Login</button> &nbsp; | &nbsp;
                            Not an user ? <button className="btn btn-outline-danger" onClick={(e) => this.handleRegister(e)}> Please create an V! account </button> </div>


                        <div>
                            <FacebookLogin
                                appId="1403102836812000"
                                textButton='Continue with Facebook'
                                fields="name,email,picture"
                                //callback={this.facebookLogin()}
                                icon="fa-facebook" />
                        </div>

                        <div>
                            <GoogleLogin
                                clientId="347163203091-r5pqhapbv0acolul6pr1rlev1svviuj7.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={this.googleLogin()}
                                onFailure={this.googleLogin()}
                                cookiePolicy={'single_host_origin'}
                                icon={true}
                            />
                        </div>



                    </form>




                </Modal>

                <Modal isOpen={this.state.registerOpen} style={this.RegisterModalStyle}>

                    <form method='POST' id='userregisterForm'>

                        <div className='grid-container'>


                            <label> Name : </label>
                            <input type={'text'} id='username' name='username' onChange={(e) => this.setState({ username: e.target.value })} style={{ width: '250px' }} required></input>


                            <label> password : </label>
                            <input type={'password'} id='password' name='password' onChange={(e) => this.setState({ userPassword: e.target.value })} style={{ width: '250px' }} required></input>


                            <label> Email : </label>
                            <input type={'email'} id='useremail' name='useremail' onChange={(e) => this.setState({ useremail: e.target.value })} style={{ width: '250px' }} required></input>

                            <label> Address : </label>
                            <input type={'text'} id='userAddress' name='userAddress' onChange={(e) => this.setState({ userAddress: e.target.value })} style={{ width: '250px' }} required></input>


                            <label hidden> Submit : </label>
                            <input type={'submit'} name='usersubmit' onClick={(e) => this.handleformSubmit(e)} className='grid-item grid-item-sub btn btn-primary' ></input>


                        </div>

                    </form>

                    <div>


                        <div>{this.state.registerMessage}</div>


                    </div>



                    <div className='btn btn-danger' onClick={() => this.setState({ registerOpen: false, registerMessage: [] })}>  Go Back </div>

                </Modal>



            </div>





        )

    }
}



