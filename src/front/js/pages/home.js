import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Home = () => {
const { store, actions } = useContext(Context);
const navigate= useNavigate();
const context = useContext(AppContext);

function log_out(){
	localStorage.clear();
	console.log('Local storage has been cleared');
	let test= [0,'Log in '];
	context.setCurrentUser(test);
	
}

function test_JWT_function(){
	const token = localStorage.getItem('jwt-token');
	 const context = useContext(AppContext);

	fetch(process.env.BACKEND_URL + "api/test/protected", {
		method: 'GET',
		headers: {
			//'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	})
		.then(res => {
			 if(res.status === 401) {
			alert("Please log in to see your cart");
			navigate('/login')
			//alert('Not today')
		   } else {
			return res.json()
		   }
		})
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));

}


	return (
		<div className="text-center mt-5">
		<button type="button" className="btn btn-primary" onClick={()=>test_JWT_function()}>My favorites</button> 
		<button type="button" className="btn btn-danger" onClick={()=>log_out()}>{context.currentUser[1]}</button> 
		
		</div>
	);
};
