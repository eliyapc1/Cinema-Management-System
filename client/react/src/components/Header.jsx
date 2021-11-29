import HomeNavBar from "./HomeNavBar";
import STO from "./STO";

const Home = ({ history }) => {
	const loggedIn = sessionStorage.loggedIn === "true" ? true : false;
	const isAdmin = sessionStorage.isAdmin === "true" ? true : false;
	const fullName = sessionStorage.fullName;
	return (
		<header className="App-header">
			<br />
			{/* <h1>Movies - Subscriptions Web Site</h1> */}
			<h1>Cinema Management System</h1>
			{loggedIn && !isAdmin ? (
				<div>
					<STO />
					<br />
					<h3>
						User: <strong>{fullName}</strong>
					</h3>
				</div>
			) : (
				<h3>Welcome Admin</h3>
			)}
			<HomeNavBar history={history} />
		</header>
	);
};

export default Home;
