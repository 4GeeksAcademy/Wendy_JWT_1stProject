import React from "react";
import { useState, useEffect, useContext } from "react";
import '../../styles/home.css'
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Login = () => {
  
    const [userLabel, setUserLabel] = useState(['Username', 'Email','Password', 'Log in',"Don't have an account? click here"])
    const [userE, setUserE] = useState('')
    const [userU, setUserU] = useState('')
    const [userP, setUserP] = useState('')
  
    const navigate = useNavigate();
    const context = useContext(AppContext);

    useEffect(() => {


    }, []);


    function createNewUser(){
        let test= [' Create Username', 'Create Email',' Create Password', 'Create Account', "Maybe I have an account Log in"];
        setUserLabel(test)


    }

    function get_username(val) {
        let test = val.target.value;
        setUserU(test)
    }

    
    function get_email(val) {
        let test = val.target.value;
        setUserE(test)
    }

    function get_password(val) {
        let test = val.target.value;
        setUserP(test)
    }


    function login_function() {
        if(userLabel[0]=='Username'){

        if (userE.length > 5 && userP.length >5) {

        let log_request= [userE,userP]
      
        
        fetch(process.env.BACKEND_URL + 'api/user/login', {
                method: 'POST',
          
                body: JSON.stringify(log_request), 
              //  Authorization: 'JWT '+token,
                headers: {
                    'Content-Type': 'application/json',
                   
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => {
                    //let test_log_info= 
                   // context.setCurrentUser(response);
                  
                  console.log(response)
                  localStorage.setItem("jwt-token",response.token)
                   navigate('/home')
                 
                
                } )
                .catch(error => console.log(error));    
           
        }

        else {
            alert('Please enter a valid username and/or password')
          //  setUserE('')
          //  setUserP('')
        }
    }
    else{
        let test=['Username', 'Email','Password', 'Log in', "Don't have an account? click here"];
        setUserLabel(test)
        if (userE.length > 5 && userP.length >5 && userU.length>5) {
            fetch_newUser();
        }
        else {
            alert('Please enter a valid username, email and/or password')
            setUserE('')
            setUserP('')
            setUserU('')
        }

       


    }
function fetch_newUser(){
   
		let testArray = [userU,userE,userP];
		fetch(process.env.BACKEND_URL + "/api/user/new", {
			method: 'POST',
			body: JSON.stringify(testArray),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error));


	
}


    }



    return (

        <div className="container ">
               
                <h3>Login Here</h3>
         
                
                
               <label htmlFor="username" style={userLabel[0]=='Username'? {display:'none' } : {display:'block' }}>{userLabel[0]}</label>
               <input type="" placeholder="username" style={userLabel[0]=='Username'? {display:'none' } : {display:'block' }} value={userU} id="username" onChange={(e) => get_username(e)} />

                <label htmlFor="email">{userLabel[1]}</label>
                <input type="text" placeholder="Email or Phone" value={userE} id="email" onChange={(e) => get_email(e)} />

                <label for="password">{userLabel[2]}</label>
                <input type="password" placeholder="Password" value={userP} id="password" onChange={(e) => get_password(e)} />
               
                <button onClick={() => login_function()}>{userLabel[3]}</button>

              <span onClick={()=>createNewUser()} id='newaccount_text'>  <p style={{textDecoration:'underline'}}>{userLabel[4]}</p></span>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
          
                
        </div>
    );
}