import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { sendOrder } from "../api/customerAPI";

function CustomerMainMenu() {
	function get(key) {
		const info = localStorage.getItem(key);
		return JSON.parse(info);
	}

	const categories = [
		"BREAKFAST",
		"LUNCH",
		"DINNER",
		"DESSERT",
		"SNACK",
		"BEVERAGE",
	];

	const customerToken = get("customer-token").access_token;
	console.log("Customer token -> ", customerToken);

	const [restaurantsList, setRestaurantsList] = useState([]);
	const [currentMenu, setCurrentMenu] = useState([]);
	const [currentCart, setCart] = useState([]);
	const [orderTotal, setOrderTotal] = useState(0);
	const [currentFilter, setFilter] = useState(categories);
	const [orderHistory, setHistory] = useState([]);

	const getAllRestaurants = () => {
		axios.get("http://localhost:8080/api/restaurants", {
			headers: {
				"Access-Control-Allow-Origin": "*",
				Authorization: "Bearer " + customerToken,
			},
		}).then((resp) => {
			const allRestaurants = resp.data;
			setRestaurantsList(allRestaurants);
			//console.log(allRestaurants);
		});
	};

	const getMenu = (restaurantId) => {
		axios.get("http://localhost:8080/api/foods/menu-" + restaurantId, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				Authorization: "Bearer " + customerToken,
			},
		}).then((resp) => {
			const menu = resp.data;
			setCurrentMenu(menu);
			//console.log(allRestaurants);
		});
	};

	const getOrderHistory = () => {
		axios.get(
			"http://localhost:8080/api/orders/from-user/" +
				get("customer-info").customer,
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + customerToken,
				},
			}
		).then((resp) => {
			const orders = resp.data;
			setHistory(orders);
		});
	};

	const restaurantComp = restaurantsList.map((restaurant) => {
		//console.log(restaurant);
		return (
			<div className="card" key={restaurant.id}>
				<h3>{restaurant.name}</h3>
				<p>📍{restaurant.location}</p>
				<p>🗺️{restaurant.zones}</p>
				<button
					onClick={() => {
						restaurant.id !== currentMenu
							? getMenu(restaurant.id)
							: setCurrentMenu([]);
					}}>
					Show Menu
				</button>
			</div>
		);
	});

	useEffect(() => {
		getAllRestaurants();
		getTotalPrice(currentCart);
		getOrderHistory();
	}, [currentCart]);

	const addToCart = (food) => {
		if (currentCart.length === 0) setCart([food]);
		else if (
			food.restaurant === currentCart[0].restaurant &&
			!currentCart.find((fd) => fd === food)
		)
			setCart([...currentCart, food]);
	};

	const getTotalPrice = (cart) => {
		const sum = cart
			.reduce((acc, item) => acc + item.price, 0)
			.toFixed(2);
		setOrderTotal(sum);
	};

	function sendCurrentOrder() {
		const foodIds = currentCart.map((cartItem) => cartItem.id);
		const customerId = get("customer-info").customer;
		const orderDetails = {
			customer: customerId,
			restaurant: currentCart[0]?.restaurant,
			orderFoods: [...foodIds],
		};
		sendOrder(orderDetails, customerToken).then((r) => {
			setCart([]);
			return <div>Order successful!</div>;
		});
	}

	console.log(currentFilter);

	return (
		<div className="column">
			<h1>
				<Link to={"/"}>Home</Link>
			</h1>
			<div>
				<h1>Restaurants</h1>
				{restaurantComp}
			</div>
			<div>
				{currentMenu.length === 0 ? null : (
					<div>
						<h1>Menu:</h1>
						{categories.map((cat) => {
							return (
								<div>
									<input
										type={"checkbox"}
										defaultChecked={currentFilter.includes(
											cat
										)}
										onChange={(e) => {
											if (!e.target.checked)
												setFilter(
													currentFilter.filter(
														(ctg) =>
															ctg !==
															cat
													)
												);
											else
												setFilter([
													...currentFilter,
													cat,
												]);
										}}></input>
									<label>{cat}</label>
								</div>
							);
						})}
					</div>
				)}
				{currentMenu
					.filter((menuItem) =>
						currentFilter.includes(menuItem.category)
					)
					.map((menuItem) => {
						return (
							<div className="card" key={menuItem.id}>
								<h3>
									{menuItem.name} - {menuItem.price}{" "}
									RON
								</h3>
								<p>{menuItem.category}</p>
								<p>{menuItem.description}</p>
								<button
									onClick={() =>
										addToCart(menuItem)
									}>
									Add to cart
								</button>
							</div>
						);
					})}
			</div>
			<div>
				{currentCart.length === 0 ? null : (
					<div className="card">
						<h1>Order:</h1>
						{currentCart.map((cartItem) => {
							return (
								<p key={cartItem.id}>
									{cartItem.name} - {cartItem.price}{" "}
									RON
								</p>
							);
						})}
						<p>TOTAL: {orderTotal} RON</p>
						<button onClick={() => setCart([])}>
							Clear order
						</button>
						<button onClick={sendCurrentOrder}>
							Send Order
						</button>
					</div>
				)}
				<div>
					{orderHistory.length === 0 ? null : (
						<div>
							<h1>Order History:</h1>
							{orderHistory.map(order => <div>
								<div className="card">
									<h3>Order # {order.id} - {order.status}</h3>
								</div>
							</div>)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CustomerMainMenu;
