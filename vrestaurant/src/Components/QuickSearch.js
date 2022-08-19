import React, { Component } from 'react';
import '../Styles/HeaderHome.css'
import '../Styles/Animation.css'
import 'bootstrap/dist/css/bootstrap.css'
import MealTypeItem from './MealTypeItem';
import { Link, Navigate  } from 'react-router-dom';



import { UserContext } from '../Contexts/UserContext';




export default class QuickSearch extends Component {

    static contextType = UserContext

    constructor() {
        super()
        this.state = {
            mealtypes: []
        }
    }

    componentDidMount() {
        fetch('https://v-restaurant.herokuapp.com/zomato/mealtype', { method: 'GET', mode: 'cors', headers: {"Access-Control-Allow-Origin": "*"} })
            .then(response => response.json())
            .then(data => this.setState({ mealtypes: data.data }))
            .catch(e => console.log(e,'this is the error'))
    }


    render() {

        let quickSearchList = this.state.mealtypes.length && this.state.mealtypes.map((item) => <MealTypeItem item={item} key={item.name} />)

        return (

            <div className='ContainerQuicksearch'>

                    <Link to='/restaurants/filter/1' style={{display:'inline-block'}} > <button className='btn btn-success Search_More' > <span className='Search_MoreText'> Search restaurants in India ! Click Here !!</span> </button> </Link>
                      
                
                <div className='transitionImage1'><img className='transitionImage' src={require('../Assets/Images/148-1484366_saturday-october-19-red-right-arrow-png.png')} alt='NoImage' /></div>
                <div className="Quick-Searches" style={{ paddingLeft: '96px' }}>
                     <b>Quick Searches</b>
                </div>

                <div className="Discover-restaurants-by-type-of-meal">
                    Discover restaurants by type of meal
                </div>



                <div className="row pt-0 py-3 qs_menu2">


                    {quickSearchList ? quickSearchList : <p> Loading .....</p> }

                </div>




            </div>


        );
    }
}
