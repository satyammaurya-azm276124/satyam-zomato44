


import React, { Component } from 'react'

import '../../Styles/Wallpaper.css'
import { Link } from 'react-router-dom';


export default class Wallpaper extends Component {

    constructor(){
        super();
        this.state={
            locations:[],
            restaurants:[]
        }
    }


     fetchRestaurants =(event)=>{
        console.log(event.target.value)
        fetch(`http://localhost:9090/restaurant/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({restaurants:data.data}))
        
     }


      componentDidMount(){
        fetch('http://localhost:9090/location',{method:'Get'})
        .then(response=>response.json())
        .then(data=>this.setState({locations:data.data}))
        
      }



  render() {
    
   const locationList=this.state.locations.length && this.state.locations.map(item=><option key={item.name} value={item.city_id}>{item.name}</option>)
    const restaurantList=this.state.restaurants.length &&
    <ul>
        {this.state.restaurants.map(item=>
            <li key={item.name}>
                <Link to={`/details/${item.name}`}>
                   {item.name}
                </Link>
               
            </li>
            
            )}
        
        </ul> 

    return (
      
   
 
        <div className="container-fluid back-img">

            <div className="row text-end pt-4 login-signup-row">
                <div className="col-2 col-md-6 col-lg-7"></div>
                <div className="col-2 col-lg-2 pe-4 text-end">
                    <a className="login" href="#">Login</a>
                </div>
                <div className="col-8 col-md-4 col-lg-3 text-start">
                    <a className="createacc px-2 py-2" href="#">Create an account</a>
                </div>
            </div>
            <div className="row pt-4 mx-auto text-center logo-row">                
                <div className="col-12">
                    <p className="px-4 py-3 px-md-4 py-md-2 logo">e!</p>
                </div>  
            </div>
            <div className="row pt-4 mx-auto text-center restaurant-title-row">
                <div className="col-12">
                    <p className="restaurant-title" >Find the best restaurants, cafés, and bars</p>
                </div>
            </div>
                
            <div className="row pt-4 mx-auto text-center search-bar-row">
                <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-4">
                    <div className="locationSelector">
                        <select className="locationDropdown px-2 py-3" onChange={this.fetchRestaurants}>
                            <option value="0">Select</option>
                           {locationList}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                    <div className="notebooks">
                        <input className="restaurantsinput ps-5 py-3" type="text" placeholder="Search for restaurants" />
                            
                            {restaurantList}
                           
                        <span className='glyphicon glyphicon-search search'></span>
                    </div>
                </div>
                
            </div>
        </div>








      
    )
  }
}
