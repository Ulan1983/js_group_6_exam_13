import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {deleteLocation, fetchLocations} from "../../store/actions/locationsActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto',
		padding: '10px'
	},
	root: {
		minWidth: 275,
		textAlign: 'center',
		marginTop: '2%'
	},
	media: {
		height: 200,
		marginBottom: '2%'
	},
	gridBtn: {
		marginBottom: '3%'
	}
});

const MainPage = () => {
	const locations = useSelector(state => state.locations.locations);
	const user = useSelector(state => state.users.user);
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		dispatch(fetchLocations());
	}, [dispatch]);


	return (
		<>
			<Grid container direction="column" spacing={2}>
				<Grid container>
					{locations && locations.map(location => (
						<Grid item xs={12} sm={6} md={4} className={classes.grid} key={location._id} >
							<Card className={classes.root}>
								<CardContent>
									<NavLink to={`/location/${location._id}`}>
										<CardMedia
											id="img"
											className={classes.media}
											image={location.image ?
												`http://localhost:8000/uploads/locationImage/${location.image}`
												: ''}
											title={location.title}
										/>
										<Typography color="textSecondary" gutterBottom>
											{location.title}
										</Typography>
									</NavLink>
								</CardContent>
								{user && user.role === 'admin' &&
								<Grid className={classes.gridBtn}>
									<Button
										variant="contained"
										color="secondary"
										type="submit"
										onClick={() => dispatch(deleteLocation(location._id))}
									>
										Удалить заведение
									</Button>
								</Grid>
								}
							</Card>
						</Grid>
					))
					}
				</Grid>
			</Grid>
		</>
	);
};

export default MainPage;