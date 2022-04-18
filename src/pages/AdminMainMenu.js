import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { addFood } from "../api/adminAPI";
import { Link } from "react-router-dom";

function AdminMainMenu() {
	const categories = [
		"BREAKFAST",
		"LUNCH",
		"DINNER",
		"DESSERT",
		"SNACK",
		"BEVERAGE",
	];
	const [currentFilter, setFilter] = useState([]);
	function get(key) {
		const info = localStorage.getItem(key);
		return JSON.parse(info);
	}

	const nameRef = useRef();
	const descriptionRef = useRef();
	const priceRef = useRef();

	const admin = get("admin-info");
	const [addFoodFlag, setFlag] = useState(true);

	const [currentCategory, setCategory] = useState(categories[0]);
	const [allFoodsMenu, setAllFoodsMenu] = useState([]);
	const [currentOrders, setOrders] = useState([]);

	const getMenu = (restaurantId) => {
		axios.get(
			"http://localhost:8080/api/foods/menu-" + restaurantId
		).then((r) => {
			const menu = r.data;
			setAllFoodsMenu(menu);
		});
	};

	const getOrders = (restaurantId) => {
		axios.get(
			"http://localhost:8080/api/orders/from-restaurant/" +
				restaurantId
		).then((r) => {
			const allOrders = r.data;
			setOrders(allOrders);
		});
	};

	useEffect(() => {
		if (addFoodFlag) {
			getMenu(admin.restaurant);
			const sortedFoods = allFoodsMenu.sort((a, b) => {
				for (let cat = 0; cat < categories.length; ++cat) {
					if (a.category === categories[cat]) return a;
					if (b.category === categories[cat]) return b;
				}
			});
			setAllFoodsMenu(sortedFoods);
			getOrders(admin.restaurant);
			setFlag(false);
		}
	}, [addFoodFlag, admin.restaurant, allFoodsMenu, categories]);

	function getCategory(e) {
		setCategory(e.target.value);
	}

	function addFoodItem(e) {
		e.preventDefault();

		const nameVal = nameRef.current.value;
		const descriptionVal = descriptionRef.current.value;
		const priceVal = priceRef.current.value;
		const restaurantVal = get("admin-info").restaurant;
		nameRef.current.value = "";
		descriptionRef.current.value = "";
		priceRef.current.value = "";

		const foodItem = {
			name: nameVal,
			description: descriptionVal,
			price: priceVal,
			category: currentCategory,
			restaurant: restaurantVal,
		};
		addFood(foodItem).then(() => {
			setFlag(true);
		});
		//setAllFoodsMenu(...allFoodsMenu, foodItem);
	}

	function findInMenu(id) {
		const foodItem = allFoodsMenu.find((food) => food.id === id);
		return foodItem ? foodItem : null;
	}

	function updateOrder(id, cancel) {
		axios.put(
			"http://localhost:8080/api/orders/" + id + "/" + cancel
		).then(() => {
			getOrders(admin.restaurant);
		});
	}

	return (
		<div className="column">
			<div>
				<Link to="/">Home</Link>
				<h1>Restaurant</h1>

				<form onSubmit={addFoodItem} className="card">
					<h3>Add a menu item here:</h3>
					<input
						type={"text"}
						placeholder="Name"
						ref={nameRef}
					/>
					<br />
					<input
						type={"text"}
						placeholder="Description"
						ref={descriptionRef}
					/>
					<br />
					<input
						type={"number"}
						step="0.01"
						placeholder="Price"
						ref={priceRef}
					/>{" "}
					<br />
					<select placeholder="Category" onChange={getCategory}>
						{categories.map((category) => {
							return (
								<option key={category} value={category}>
									{category}
								</option>
							);
						})}
					</select>
					<br />
					<input type={"submit"} value="Add food" />
				</form>
			</div>

			<div>
				<h3>Current menu:</h3>
				{categories.map((cat) => {
							return (
								<div>
									<input type={"checkbox"}
										defaultChecked={currentFilter.includes(cat)}
										onChange={(e) => {
											if (!e.target.checked)
												setFilter(currentFilter.filter(
													(ctg => ctg !== cat)
												));
											else setFilter([...currentFilter, cat]);
									}}></input>
									<label>{cat}</label>
								</div>
							);
						})}
				{allFoodsMenu
				.filter((menuItem) => currentFilter.includes(menuItem.category))
				.map((oneFood) => {
					return (
						<div className="card" key={oneFood.id}>
							<h4>
								{oneFood.name} - {oneFood.price} RON
							</h4>
							<p>{oneFood.category}</p>
							<p>{oneFood.description}</p>
						</div>
					);
				})}
			</div>
			{currentOrders.length === 0 ? null : (
				<div>
					<h1>Current Orders:</h1>
					{currentOrders.map((order) => {
						return order.status === "DELIVERED" ||
							order.status === "DECLINED" ? null : (
							<div className="card" key={order.id}>
								<p>
									Order #{order.id} - {order.status}
								</p>
								<p>Items:</p>
								<div>
									{order.orderFoods.map((foodId) => {
										return (
											<div>
												{
													findInMenu(
														foodId
													)?.name
												}
											</div>
										);
									})}
								</div>
								<button
									onClick={() =>
										updateOrder(order.id, 1)
									}>
									Accept
								</button>
								<button
									disabled={
										order.status === "ACCEPTED" ||
										order.status === "IN_DELIVERY"
									}
									onClick={() =>
										updateOrder(order.id, 0)
									}>
									Decline
								</button>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default AdminMainMenu;
