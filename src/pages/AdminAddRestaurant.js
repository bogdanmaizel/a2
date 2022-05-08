import { useRef } from "react";
import { useNavigate } from "react-router";

import { addRestaurant } from '../api/adminAPI';

function AdminAddRestaurant() {

	function get(key) {
		const info = localStorage.getItem(key);
		return JSON.parse(info);
	}

    const nav = useNavigate();
	const nameRef = useRef();
	const locRef = useRef();
	const zRef = useRef();

	function createRestaurant(e) {
		e.preventDefault();

		const nameVal = nameRef.current.value;
		const locVal = locRef.current.value;
        const zVal = zRef.current.value;
        const adminInfo = get('admin-info');
		const adminId = adminInfo.user;
		const adminToken = get('admin-token');

		const restaurantDTO = {
			name: nameVal,
			location: locVal,
			zones: zVal,
			admin: adminId,
        };
        
        addRestaurant(restaurantDTO, adminToken)
			.then(data => {
				console.log(data);
                localStorage.setItem('restaurant', data);
                nav("/admin/restaurant");
        })
	}

	return (
		<div>
			<h1>To begin, add a restaurant below:</h1>
			<form onSubmit={createRestaurant}>
				<input type="text" placeholder="Restaurant name" ref={nameRef}/>
				<br/>
				<input type="text" placeholder="Location" ref={locRef} />
				<br/>
				<input type="text" placeholder="Delivery Zones" ref={zRef} />
				<br/>
				<input type="submit" value="Create" />
			</form>
		</div>
	);
}

export default AdminAddRestaurant;
