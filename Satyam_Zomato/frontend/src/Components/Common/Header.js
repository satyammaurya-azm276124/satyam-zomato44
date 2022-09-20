 
import React,{useState} from 'react'
import '../../Styles/Header.css'
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';



Modal.setAppElement('#root');

const customStyles = {
   content: {
      left:"30%",
      height:'65%',
      width:'40%',
     top:"20%",
    
     overflow:'hidden'
     },
 };



export default function Header() {

   const [isLoginModalOpen,setIsLoginModalOpen]=useState(false)

   const [isSignUp,setSignUp]=useState(false)

   const fbCallback=(response)=>{
    console.log("facebook callback response:",response)
 }


  return (
 <div className="header">
    <div className="header-logo">
        <b>e!</b>
    </div>

    <div className=" login-block ">
        <button className="login2" onClick={()=>setIsLoginModalOpen(true)}>Login</button>
        <button className="account" onClick={()=>setSignUp(true)}>SignUp</button>
    </div>

       <Modal  isOpen={isLoginModalOpen}
                           style={customStyles}>

         <div>
            
         <h2>Login Modal
            <button className='btn btn-danger' style={{height:'40px',width:"50px",background:"red", float:"right"}} onClick={()=>setIsLoginModalOpen(false)}>X </button>
          </h2>   
            
         </div>  

                            {/* three different options of login 1.username and password  2. use facebook account 3. use google account */}

            <div>
                <form>
                    <input type="text" placeholder="enter your email"/><br/><br/>
                    <input type="password" placeholder='enter your password'/><br/><br/>
                    <button className='btn btn-secondary' style={{height:'40px',width:"100px",background:"red"}}>Login</button>
                </form>
            </div><br/><br/>
            <div>
            <FacebookLogin  
                appId='2897870303852979'
                autoLoad={true}
                fields="name,email,picture"
                callback={fbCallback}
                /><br/><br/>
            <GoogleLogin
            clientId=''
            />            
          
            </div>
            
                 
         
       </Modal>

       <Modal
              isOpen={isSignUp}
              style={customStyles}>
            
       <div>
            
            <h2>Sign Up
               <button className='btn btn-danger' style={{height:'40px',width:"50px",background:"red", float:"right"}} onClick={()=>setSignUp(false)}>X </button>
             </h2>   
               
            </div>  

            <div >
            <form >
                    <input placeholder='Enter your email' id="email" type="email"/><br/><br/>
                    <input placeholder='Enter your password' type="password" /><br/><br/>
                    <input placeholder='Enter your password again' type="password" /><br/><br/>
                    <button className='btn btn-primary' style={{height:'40px',width:"100px",background:"red"}}>Sign Up</button>
                </form>


            </div>
   

       </Modal>
</div>
  )
}
