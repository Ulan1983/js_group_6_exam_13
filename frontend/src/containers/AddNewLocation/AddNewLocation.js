import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {createLocation} from "../../store/actions/locationsActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto',
	},
	gridFormElement: {
		textAlign: 'center'
	},
	typography: {
		textAlign: 'center',
		marginBottom: '2%'
	},
	gridBtn: {
		textAlign: 'center',
		marginTop: '2%'
	},
	box: {
		width: '60%',
		margin: '2% auto'
	},
	btn: {
		width: '30%'
	},
	checkBox: {
		marginLeft: '19%'
	}
});

const AddNewLocation = () => {
	const [location, setLocation] = useState({
		title: '',
		description: '',
		image: '',
		isRulesAccepted: false
	});

	const dispatch = useDispatch();
	const error = useSelector(state => state.locations.error);
	const classes = useStyles();

	const inputChangeHandler = event => setLocation({...location, [event.target.name]: event.target.value});

	const fileChangeHandler = event => setLocation({...location, image: event.target.files[0]});

	const checkboxChangeHandler = () => setLocation({...location, isRulesAccepted: !location.isRulesAccepted});

	const submitFormHandler = event => {
		event.preventDefault();

		const data = new FormData();

		Object.keys(location).forEach(key => {
			let value = location[key];
			data.append(key, value);
		});

		dispatch(createLocation(data));
	};

	return (
		<>
			<Container justify="center">
				<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid} >
					<Box component="div" p={2}>
						<Typography variant="h5" className={classes.typography}>
							Добавление заведения
						</Typography>
						<form onSubmit={submitFormHandler}>
							<Grid className={classes.gridFormElement}>
								<FormElement
									required
									propertyName="title"
									title="Название"
									value={location.title}
									onChange={inputChangeHandler}
									type="text"
									autoComplete="current-title"
									placeholder="Введите название заведения"
								/>
							</Grid>
							<Grid className={classes.gridFormElement}>
								<FormElement
									required
									propertyName="description"
									title="Описание"
									value={location.description}
									onChange={inputChangeHandler}
									type="text"
									autoComplete="current-description"
									placeholder="Введите описание заведения"
								/>
							</Grid>
							<Grid item className={classes.gridFormElement}>
								<FormElement
									propertyName='image'
									title="Выбрать фото"
									onChange={fileChangeHandler}
									type='file'
								/>
							</Grid>
							<Grid item className={classes.checkBox}>
								<FormElement
									required={!location.isRulesAccepted}
									type='checkbox'
									propertyName='isRulesAccepted'
									title="Вы соглашаетесь с нашими правилами"
									value={location.isRulesAccepted}
									onChange={checkboxChangeHandler}
								/>
							</Grid>
							<Grid className={classes.gridBtn}>
								<Button variant="contained" color="primary"
										type="submit" className={classes.btn} >
									Создать
								</Button>
							</Grid>
						</form>
						<Box className={classes.box}>
							{error && (
								<Alert severity="error">{error.error}</Alert>
							)}
						</Box>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default AddNewLocation;