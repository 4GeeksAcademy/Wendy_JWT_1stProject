import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";



export const Navbar = () => {
  const navigate= useNavigate();

  function test_JWT_function2(){
    const token = localStorage.getItem('jwt-token');
  
    fetch(process.env.BACKEND_URL + "api/test/protected", {
      method: 'GET',
      headers: {
        //'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
         if(res.status ===200) {
         alert("you're good")
       
         } else {

          alert("Please log in to see your cart");
          navigate('/login')
         }
        
      })
      .then(response => console.log('Success:', response))
      .catch(error => console.error(error));
  
  }


	return (
		
<nav className="navbar navbar-light bg-light justify-content-between">
	<Link to='/'>
  <span><a className="navbar-brand">JWT chapter</a></span>
  </Link>

  {/* <form className="form-inline"> */}

    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>test_JWT_function2()}>My Cart</button>


  {/* </form>

   */}
</nav>

	);
};
