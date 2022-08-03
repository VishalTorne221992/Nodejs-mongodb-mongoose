import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HeaderAllPages.css'
import HeaderAllPage from './HeaderAllPage';
import '../Styles/FilterpageStyle.css'
import '../Styles/RestFilterMobile.css'


export default function RestaurantFilter() {

    const [currentPage, setCurrentPage] = useState(1)
    const [restaurantList, setRestaurantList] = useState([])
    const [filter, setFilter] = useState({
        city_id: '',
        cuisine: [],
        lcost: '',
        hcost: '',
        sort: 1
    })
    const [pageCount, SetPageCount] = useState(0)

    const[locations, setLocations] = useState([])

    const requestOptions = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter)

    }

    useEffect(() => {

        // Fetch data for restaurants list using post method for filters
             
             fetch(`http://localhost:5252/zomato/restaurants/filter/${currentPage}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setRestaurantList(data.data1)
                SetPageCount(data.TotalRecords / 2)
            }
            )

        // fetch locations data for locations filter

        

            fetch('http://localhost:5252/zomato/locations', { method: 'GET' })
                .then(res => res.json())
                .then(data => setLocations(data.data))
        


       


    }, [filter, currentPage]);

     // fetch restaurant data as per locations selected from options based on city_id

    const fetchRestaurantsforFilter = (event) => {

        filter.city_id = event.target.value
        setFilter({...filter})

    }
      

    const handleCuisineChange = (event) => {

        
        if (event.target.checked) {
            filter.cuisine.push(event.target.name)
        }
        else {

            let index = filter.cuisine.indexOf(event.target.name)
            if (index > -1)
                filter.cuisine.splice(index, 1)

        }

        setFilter({ ...filter })
        

    }

    const handleCostChange = (lcost, hcost) => {

        filter.hcost = hcost;
        filter.lcost = lcost;
        setFilter({ ...filter })
    }

    const handleSort = (value) => {
        filter.sort = value

        setFilter({ ...filter })
    }


    const paginationItems = []

    for (let i = 1; i <= pageCount; i++) {
        paginationItems[i] = <div key={i} className='paginationdiv'> <Link to='#' className='pageNum' onClick={() => setCurrentPage(i)}><span className='pagnumText'>{i}</span></Link> </div>
    }

    let locationFilterList = locations.map((item) => <option key={item.name} value={item.city_id}>{item.name}</option>)
    
    return (
      
        <div >

            <HeaderAllPage/>

            <section className='filterSection'>

                <div className="title-text"> Breakfast Places in Mumbai </div>

                <article className="filters-article" style={{ overflowY: 'initial' }}>

                    <span className="Filters">
                        Filters
                    </span>
                    <span className="Select-Location-label">
                        Select Location
                    </span>

                    <div className="Select_Location">
                        <select id="Select_Location_box" onChange={(event) => fetchRestaurantsforFilter(event)}>
                            <option value=""> Select Location </option>
                              {locationFilterList}
                        </select>
                    </div>

                    <div className="cuisine_type">
                        <span id="cuisine_type_text">Cuisine</span>

                        <div className="cuisine_type_checkbox">
                            <input type="checkbox" id="North_Indian" name="North Indian" onChange={(event) => handleCuisineChange(event)} />
                            North Indian
                            <br />
                            <input type="checkbox" id="South_Indian" name="South Indian" onChange={(event) => handleCuisineChange(event)} />
                            South Indian
                            <br />
                            <input type="checkbox" id="Chinese" name="Chinese" onChange={(event) => handleCuisineChange(event)} />
                            Chinese
                            <br />
                            <input type="checkbox" id="Fast_Food" name="Fast Food" onChange={(event) => handleCuisineChange(event)} />
                            Fast Food
                            <br />
                            <input type="checkbox" id="Street_Food" name="Street Food" onChange={(event) => handleCuisineChange(event)} />
                            Street Food
                        </div>
                    </div>

                    <div className="cuisine_filter_cost">
                        <span id="cuisine_filter_cost_text">Cost For Two</span>
                        <div className="cuisine_type_radio">
                            <input type="radio" name='cost' onChange={() => handleCostChange(1, 500)} />
                            Less than Rs. 500
                            <br />
                            <input type="radio" name='cost' onChange={() => handleCostChange(500, 1000)} />
                            Rs. 500 to Rs. 1000
                            <br />
                            <input type="radio" name='cost' onChange={() => handleCostChange(1000, 1500)} />
                            Rs. 1000 to Rs. 1500
                            <br />
                            <input type="radio" name='cost' onChange={() => handleCostChange(1500, 2000)} />
                            Rs. 1500 to Rs. 2000
                            <br />
                            <input type="radio" name='cost' onChange={() => handleCostChange(2000, 10000)} />
                            Rs. 2000 +
                        </div>
                    </div>

                    <div className="cuisine_filter_sort">
                        <span className="Sort">
                            Sort
                        </span>

                        <div className='form-check' style={{ color: '#8c96ab' }}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => handleSort(-1)} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Price Low to High
                            </label>
                        </div>
                        <div className='form-check' style={{ color: '#8c96ab' }}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  onClick={() => handleSort(1)} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Price High to Low
                            </label>
                        </div>

                    </div>

                </article>

            </section>

            {

                restaurantList.length > 0 && restaurantList.map((item) =>
                    <article key={item.name} className="result1-article">
                        <div className="result1-image">
                            <img className="shutterstock_1154073754" src={require('../Assets/Images/breakfast.jpg')} alt='' />

                            <div className="cat-title">
                                <span className="The-Big-Chill-Cakery">
                                    <Link to={`/RestaurantDetails/${item.name}`} style={{textDecoration:'none', color:'inherit'}}>{item.name}</Link>
                                </span>
                                <span className="location1"> {item.locality} </span>
                                <span className="Address1">
                                    {item.address}
                                </span>
                            </div>

                        </div>
                        <div className="Path-6195"></div>
                        <div className="cuisine-cost">
                            <span className="CUISINES-COST-FOR-TWO">
                                CUISINES: <br />
                                COST FOR TWO:
                            </span>
                        </div>
                        <div className="cuisine-content">

                            {item.Cuisine.map((item) => item.name).join(" , ")}
                            <br />

                            Rs. {item.cost}

                        </div>


                    </article>

                )

            }

            <div className="pagination">

                <div className='paginationdiv'><a className='pageNum' href="/"><span className='pagnumText'> &lt; </span></a></div>
                 
                {
                     paginationItems.length === 0 ? <div style={{paddingTop:'5px', paddingLeft:'20px', color:'red', fontWeight:'bolder'}}> No Data Available</div> : paginationItems 
                }

                <div className='paginationdiv'><a className='pageNum' href="/"><span className='pagnumText'> &gt; </span></a></div>
            </div>

        </div>
    )
}

