import React, {useState} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

const UserMenu = ({user, logout}) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleClick}
				color="inherit"
				id='user'
			>
				<Avatar
					src={user.avatar ? `http://localhost:8000/uploads/userAvatar/${user.avatar}` : ''}
					alt={user.username}/>
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<ListItem disabled>Привет, {user.username}!</ListItem>
				<Divider/>
				<MenuItem onClick={handleClose} component={NavLink} to="/locations/new">Добавить заведение</MenuItem>
				<Divider/>
				<MenuItem onClick={logout}>Выйти</MenuItem>
			</Menu>
		</div>
	);
};

export default UserMenu;