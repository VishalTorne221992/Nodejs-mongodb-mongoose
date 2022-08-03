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
        fetch('http://localhost:5252/zomato/mealtype', { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ mealtypes: data.data }))
    }


    render() {

        let quickSearchList = this.state.mealtypes.length && this.state.mealtypes.map((item) => <MealTypeItem item={item} key={item.name} />)

        return (

            <div className='ContainerQuicksearch'>

                    <Link to='/restaurants/filter/1' > <button className='btn btn-success Search_More' > Search restaurants All over India !!! Click Here !! </button> </Link>
                      
                
                <div className='transitionImage1'><img className='transitionImage' src={require('../Assets/Images/148-1484366_saturday-october-19-red-right-arrow-png.png')} alt='NoImage' /></div>
                <div className="Quick-Searches pt-4" style={{ paddingLeft: '96px' }}>
                     <b>Quick Searches</b>
                </div>

                <div className="Discover-restaurants-by-type-of-meal" style={{ paddingLeft: '96px' }}>
                    Discover restaurants by type of meal
                </div>



                <div className="row pt-4 py-4 qs_menu2" style={{ paddingLeft: '60px', paddingRight: '60px', paddingBottom: '50px' }}>


                    {quickSearchList}

                </div>




            </div>


        );
    }
}
