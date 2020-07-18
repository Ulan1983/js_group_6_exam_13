import React from 'react';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const AnonymousMenu = () => (
	<>
		<Button color="inherit" component={NavLink} to="/register" exact>Регистрация</Button>
		<Button color="inherit" component={NavLink} to="/login" exact>Логин</Button>
	</>
);

export default AnonymousMenu;