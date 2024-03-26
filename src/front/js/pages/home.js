import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);


function test_JWT_function(){
	const token = localStorage.getItem('jwt-token');

	fetch(process.env.BACKEND_URL + "api/test/protected", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	})
		.then(res => {
			if (!res.ok){ 
				throw Error(res.statusText);
			}
			else if(res.status === 403) {
				throw Error("Missing or invalid token");
		   } else {
			   throw Error("Unknown error");
		   }
		})
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));

}


	return (
		<div className="text-center mt-5">
		<button type="button" class="btn btn-primary" onClick={()=>test_JWT_function()}>Test Private routes</button>
		
		</div>
	);
};
