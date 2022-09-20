import React, { Component } from 'react'


import Mealtype from './Mealtype';

export default class Quicksearch extends Component {

   constructor(){
    super();
    this.state={
        mealtypes:[]
    }
   }


   componentDidMount(){
    fetch('http://localhost:9090/mealtype',{method:'GET'})
    .then(response=>response.json())
    .then(data=>this.setState({mealtypes:data.data}))
   }




  render() {
      
   const mealtypesList= this.state.mealtypes.length && this.state.mealtypes.map(item=> <Mealtype item={item}></Mealtype>)


    return (
      
       
        <div>
       
        <div className="container mb-5">
     <div className="quick-searches mt-5 ms-4">Quick Searches</div>
     <div className="qs-subtitle mt-3 ms-4">Discover restaurants by type of meal</div>
     <div className="row mt-3">


         {mealtypesList}



     </div>
</div>

      </div>

      
    )
  }
}
