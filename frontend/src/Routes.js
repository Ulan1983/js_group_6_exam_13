import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import MainPage from "./containers/MainPage/MainPage";
import {useSelector} from "react-redux";
import AddNewLocation from "./containers/AddNewLocation/AddNewLocation";

const ProtectedRoute = ({isAllowed, ...props}) => (
	isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);


const Routes = () => {
	const user = useSelector(state => state.users.user);

	return (
		<>
			<Switch>
				<Route path="/" exact component={MainPage} />
				<Route path="/register" exact component={Register}/> />
				<Route path="/login" exact component={Login}/> />
				<ProtectedRoute isAllowed={user} path="/locations/new" exact component={AddNewLocation} />
			</Switch>
		</>
	);
};

export default Routes;