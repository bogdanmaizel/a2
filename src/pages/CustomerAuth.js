import { useRef } from "react";
import { useNavigate } from "react-router";
import { sendLoginCustomer, sendRegisterCustomer, sendLogin } from "../api/authAPI";
import { Link } from 'react-router-dom';

function CustomerAuth() {
	localStorage.clear();
	const uRef = useRef();
	const pRef = useRef();

	const uRef2 = useRef();
	const pRef2 = useRef();

	const nav = useNavigate();

	function login(e) {
		e.preventDefault();
		const uVal = uRef.current.value;
		const pVal = pRef.current.value;

		const credentials = {
			username: uVal,
			password: pVal,
		};
		const tokenCredentials = new URLSearchParams({
			username: uVal,
			password: pVal
		});

		sendLogin(tokenCredentials).then(data => {
			console.log("Customer token ->");
			console.log(data);
			localStorage.setItem('customer-token', JSON.stringify(data));
		})

		sendLoginCustomer(credentials).then((data) => {
			localStorage.setItem("customer-info", JSON.stringify(data));
			if (data!=null)
				nav("/customer/welcome");
		});
	}

	function register(e) {
		e.preventDefault();
		const uVal = uRef2.current.value;
		const pVal = pRef2.current.value;

		const credentials = {
			username: uVal,
			password: pVal,
		};

		sendRegisterCustomer(credentials).then(
			(data) => {
				<div>Register successful!</div>;
			},
			() => {
				<div>Register failed!</div>;
			}
		);
	}

	return (
		<div>
			<div className="card">
			<Link to="/">Go back</Link>
				<h1>Hello Customer! Please log in</h1>
				<form onSubmit={login}>
					<input
						type={"text"}
						placeholder="Username"
						ref={uRef}
					/>
					<input
						type={"password"}
						placeholder="Password"
						ref={pRef}
					/>
					<br />
					<input type="submit" value="Log in" />
				</form>
				<br />
				<h2>Or create a new account</h2>
				<form onSubmit={register}>
					<input
						type={"text"}
						placeholder="Username"
						ref={uRef2}
					/>
					<input
						type={"password"}
						placeholder="Password"
						ref={pRef2}
					/>
					<br />
					<input type="submit" value="Register" />
				</form>
			</div>
		</div>
	);
}

export default CustomerAuth;
