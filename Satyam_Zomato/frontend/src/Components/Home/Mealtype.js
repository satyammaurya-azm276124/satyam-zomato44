import React from 'react'


export default function Mealtype(props) {
  return (
    <div className="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
    <div className="row">
        <div className="col-6 px-0 mx-0">
            <img src={require('../../'+props.item.image)} height="160" width="140"/>
        </div>
        <div className="col-6 px-3 py-3">
            <div className="card-title">{props.item.name}</div>
            <div className="card-description">
               {props.item.content} 
               </div>
        </div>
    </div>
</div>
  )
}
