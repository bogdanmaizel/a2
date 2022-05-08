import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function FrontPage() {
	return (
		<div className="card">
			<h1>Welcome to</h1>
			<h1 className="poodfanda">PoodFanda</h1>
			<Nav>
				<Nav.Item>
					<Nav.Link
						href="/admin-auth"
						style={{ color: "black", fontSize: 20 }}>
						Admin
					</Nav.Link>
				</Nav.Item>
				<br />
				<Nav.Item>
					<Nav.Link
						href="/customer-auth"
						style={{ color: "black", fontSize: 20 }}>
						Customer
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</div>
	);
}

export default FrontPage;
