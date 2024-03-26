import React from "react";
import { useState, useEffect, useContext } from "react";
import '../../styles/home.css'
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Login = () => {
    const [userN, setUserN] = useState('')
    const [userLabel, setUserLabel] = useState(['Username', 'Email','Password', 'Log in'])
    const [userU, setUserU] = useState('')
    const [userP, setUserP] = useState('')
  
    const navigate = useNavigate();
    const context = useContext(AppContext);

    useEffect(() => {


    }, []);


    function createNewUser(){
        let test= [' Create Username', 'Create Email',' Create Password', 'Create Account'];
        setUserLabel(test)


    }

    function get_username(val) {
        let test = val.target.value;
        setUserU(test)
    }

    
    function get_email(val) {
        let test = val.target.value;
        setUserN(test)
    }

    function get_password(val) {
        let test = val.target.value;
        setUserP(test)
    }


    function login_function() {
        if(userLabel[0]=='Username'){

        if (userN.length > 5 && userP.length >5) {

        let test= [userN,userP]
      
        
        fetch(process.env.BACKEND_URL + "/api/user/login", {
                method: 'POST',
                body: JSON.stringify(test), 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => {
                    context.setCurrentUser(response);
                    navigate('/')
                
                } )
                .catch(error => alert(error));    
           
        }

        else {
            alert('Please enter a valid username and/or password')
            setUserN('')
            setUserP('')
        }
    }
    else{
        let test=['Username', 'Email','Password', 'Log in'];
        setUserLabel(test)
        if (userN.length > 5 && userP.length >5 && userU.length>5) {
            fetch_newUser();
        }
        else {
            alert('Please enter a valid username, email and/or password')
            setUserN('')
            setUserP('')
            setUserU('')
        }

       


    }
function fetch_newUser(){
   
		let testArray = [userU,userN,userP];
		fetch('', {
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
         
                <form>
                
               <label htmlFor="username" style={userLabel[0]=='Username'? {display:'none' } : {display:'block' }}>{userLabel[0]}</label>
               <input type="" placeholder="username" style={userLabel[0]=='Username'? {display:'none' } : {display:'block' }} value={userU} id="username" onChange={(e) => get_username(e)} />

                <label htmlFor="email">{userLabel[1]}</label>
                <input type="text" placeholder="Email or Phone" value={userN} id="email" onChange={(e) => get_email(e)} />

                <label for="password">{userLabel[2]}</label>
                <input type="password" placeholder="Password" value={userP} id="password" onChange={(e) => get_password(e)} />
               

                <button onClick={() => login_function()}>{userLabel[3]}</button>
              <span onClick={()=>createNewUser()} id='newaccount_text'>  <p  >Don't have an account? click here</p></span>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
          
                </form>
        </div>
    );
}