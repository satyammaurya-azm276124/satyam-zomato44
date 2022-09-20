import React,{useEffect, useState} from 'react'
import Header from '../Common/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import '../../Styles/Details.css'
import Modal from 'react-modal';


export default function RestaurantDetails() {
 
  
  //hooks
  const [restaurant,setRestaurant]=useState({})
  const[isMenuModalOpen, setMenuModal]=useState(false)
  const[menu,setMenu]=useState([])
  const[totalPrice,setTotalPrice]=useState(0)


  let {rName}=useParams()

  const fetchMenu=()=>{
   fetch(`http://localhost:9090/menu/${rName}`,{method:'GET'})
   .then(response=>response.json())
   .then(data=>setMenu(data.data))
 }


 const calTotalPrice=(item)=>{
   let price=totalPrice+ item.itemPrice;
   setTotalPrice(price)
 }


 
 const loadScript=(rpScript)=>{
   console.log("script is getting added..",rpScript)
   return new Promise((resolve)=>{
       const script=document.createElement("script");
       script.src=rpScript;
       script.onload=()=>{
         console.log("success"); 
         openRazorpay();
         resolve(true)
       }
 
       script.onerror=()=>{
       console.log("failure") ;
         resolve(false);
       }
       document.body.appendChild(script);
       console.log(document.body.getElementsByTagName('script'))
   })
    
     

  }

  const openRazorpay=async()=>{
  try{
       //call API that would generate order in the backend 
      let orderData;
      orderData= await fetch('http://localhost:9090/payment',{
           method:'POST',
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify({amount:totalPrice})
       }).then(resp=>resp.json())
       
       

       const options={
           key:"rzp_test_SbJ72RlNKJdx6e",
           amount:orderData.amount,
           order_id:orderData.id,
           currency:orderData.currency,
           name:'Satyam Zomato food delivery app',

           prefill:{
               email:'satyammaurya101@gmail.com',
               contact:'9578768894'  
           },
           handler:function(response){
            console.log(response)
            fetch('http://localhost:9090/payment/save',{
               method:'POST',
               headers:{'Content-Type':'application/json'},
               body:JSON.stringify({
                  razorpay_orderid:response.razorpay_order_id,
                  razorpay_paymentid:response.razorpay_payment_id,
                  razorpay_signature:response. razorpay_signature,
                  razorpay_amount:orderData.amount

               })
           }).then(resp=>console.log(resp))
           }
       }
   
       const paymentWindow= new window.Razorpay(options);
       paymentWindow.open()
  



  }catch(error){
   console.log(error)
  }

   
      
      
  }



   //lifecycle hooks: componentDidMount and componentdidUpdate

   useEffect(()=>{
    fetch(`http://localhost:9090/restaurant/details/${rName}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=>setRestaurant(data.data))
   },[]) // dependancy array as blank this useEffect behaves like componentDidMount
    

    const{name,thumb,cost,address,Cuisine}=restaurant
    const cuisineList=!(Cuisine==undefined) && Cuisine.length && <ul>{Cuisine.map(item=><li key={item.name}>{item.name}</li>)}</ul>


    const customStyles = {
      content: {
         left:"10%",
         height:'90%',
         width:'80%',
        top:"5%",
       
        
        },
    };


  return (
    <div>
         
         <Header/>
         <div>
            <img src={thumb} height="400px" width="100%"/>
         </div>

         <div>
            <h2>{name}
            <button className='btn btn-danger' style={{height:'40px',width:"200px",background:"red",float:"right"}} onClick={()=>{fetchMenu();setMenuModal(true)}}>Place Online Order</button>
            </h2>
         </div>

         <div>
         <Tabs>
              <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Contact</Tab>
              </TabList>

              <TabPanel>
                   <div className='about'>About the Place</div>
                   <div className='head'>Cuisine</div>
                      {cuisineList}
                   <div className='head'>Average Cost</div>
                   <div className='value'>&#8377;{cost}</div>
              </TabPanel>
              <TabPanel>
                    <div className='head'>Phone Number</div>
                    <div >+91-123456789</div>
                    <div className='head'>{name}</div>
                    <div className='value'>{address}</div>
              </TabPanel>
          </Tabs>

         </div>

             <Modal
                 isOpen={isMenuModalOpen}
                 style={customStyles} >

                 <div>
                   <h2>Menu
                   <button onClick={()=>setMenuModal(false)} className="btn btn-danger" style={{height:'40px',width:"50px",background:"red",float:"right"}}>X</button>
                    </h2>
                 </div>
                 <div>
            <ul>
                {
                  menu.length && 
                    menu.map((item,index)=><li key={index}>
                       
                           <div>
                                 {item.isVeg ? <span className='text-success'>{item.itemName}</span>: <span className='text-danger'>{item.itemName}</span>}
                  
                            </div>   
                            <div>
                                 {item.itemPrice}
                            </div>   
                            <div>
                                 {item.itemDescription}
                            </div>    
                            <div>
                                <button className='btn btn-primary' style={{height:'40px',width:"50px",background:"red",float:"right",textAlign:'center'}} onClick={()=>calTotalPrice(item)}>Add</button>
                            </div>
                           
                    </li>)
                }
            </ul><br/>
            <hr/>
              <h3>
                Total Price:{totalPrice}

                 {/* two steps to get executed : 1.  to attach a js to the current web page  2. call a method from that attached js to see payment window*/}
                 <button className='btn btn-danger'style={{height:'40px',width:"100px",background:"red",float:"right"}}  onClick={()=>{setMenuModal(false);loadScript('https://checkout.razorpay.com/v1/checkout.js')}}>Pay Now</button>

              </h3>
        </div>


             </Modal>
    </div>
  )
}
