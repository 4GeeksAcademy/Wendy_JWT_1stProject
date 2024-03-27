import React, { useContext } from "react";


export const my_JWT_function=()=>{    
	const token = localStorage.getItem('jwt-token');

	fetch(process.env.BACKEND_URL + "api/test/protected", {
		method: 'GET',
		headers: {
			//'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	})
		.then(res => {
			 if(res.status === 401) {
			throw error('Invalid')
		
		   } else {
			return res.json()
		   }
		})
		.then(response => console.log('Success:', response))
		.catch(error => {let test=error });

        return test;
}