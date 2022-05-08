import { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { sendLogin, sendLoginAdmin, sendRegisterAdmin } from "../api/authAPI";


function AdminAuth() {
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
			localStorage.setItem("admin-token", JSON.stringify(data));
		});

		sendLoginAdmin(credentials).then((data) => {
            localStorage.setItem("admin-info", JSON.stringify(data));
            if (data.restaurant == null)
                nav("/admin/create-restaurant");
            else nav("/admin/restaurant");
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

		sendRegisterAdmin(credentials).then(data => {
				return <div>Register successful!</div>;
			},
			() => {
				return <div>Register failed!</div>;
			}
		);
	}

	return (
		<div>
            <div className="card">
                <Link to="/">Go back</Link>
				<h1>Hello Admin! Please log in</h1>
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

export default AdminAuth;