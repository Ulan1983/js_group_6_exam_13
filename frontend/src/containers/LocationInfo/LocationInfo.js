import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchLocation} from "../../store/actions/locationsActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {createReview, deleteReview, fetchReviews} from "../../store/actions/reviewsActions";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import {createPhoto, deletePhoto, fetchPhotos} from "../../store/actions/photosActions";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto'
	},
	root: {
		minWidth: 275,
	},
	card: {
		textAlign: 'center'
	},
	btn: {
		marginBottom: '2%'
	},
	media: {
		height: 200,
		marginBottom: '1%'
	},
	gridFormElement: {
		textAlign: 'center',
		marginTop: '2%'
	},
	gridBtn: {
		textAlign: 'center',
		marginTop: '2%',
		marginBottom: '5%'
	},
	div: {
		marginTop: '2%'
	},
	title: {
		marginTop: '2%',
		marginBottom: '2%'
	},
	deleteBtn: {
		marginBottom: '3%'
	},
	reviewTitle: {
		textAlign: 'center',
		marginTop: '5%'
	},
	img: {
		maxWidth: '150px'
	},
	gallery: {
		textAlign: 'center'
	}
});

const LocationInfo = props => {
	const [review, setReview] = useState({
		comment: '',
		foodRating: 1,
		serviceRating: 1,
		interiorRating: 1
	});

	const [photo, setPhoto] = useState({
		photo: ''
	});

	const ratings = [1, 2, 3, 4, 5];
	const reviews = useSelector(state => state.reviews.reviews);
	const singleLocation = useSelector(state => state.locations.location);
	const photos = useSelector(state => state.photos.photos);
	const user = useSelector(state => state.users.user);
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		dispatch(fetchLocation(props.match.params.id));
		dispatch(fetchReviews());
		dispatch(fetchPhotos());
	}, [dispatch, props.match.params.id]);

	const inputChangeHandler = event => setReview({...review, [event.target.name]: event.target.value});

	const photoChangeHandler = event => setPhoto({...photo, photo: event.target.files[0]});

	const submitFormHandler = event => {
		event.preventDefault();

		dispatch(createReview(props.match.params.id, review));
	};

	const submitPhotoHandler = event => {
		event.preventDefault();

		const photoData = new FormData();

		Object.keys(photo).forEach(key => {
			let value = photo[key];
			photoData.append(key, value);
		});
		dispatch(createPhoto(props.match.params.id, photoData));
	};

	const ratingOptions = ratings && ratings.map(rating => ({title: rating, id: rating}));

	let overallRating;
	let foodRating = 0;
	let serviceRating = 0;
	let interiorRating = 0;


	singleLocation && reviews && reviews.forEach(review => {
		if (singleLocation._id === review.location._id) {
			foodRating += review.foodRating / reviews.length;
			serviceRating += review.serviceRating / reviews.length;
			interiorRating += review.interiorRating / reviews.length;
		}
	});

	overallRating = (foodRating + serviceRating + interiorRating) / 3;

	return (
		<>
			{singleLocation &&
			<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid}>
				<Card className={classes.card}>
					<CardContent>
						<CardMedia
							className={classes.media}
							image={singleLocation.image ?
								`http://localhost:8000/uploads/locationImage/${singleLocation.image}`
								: ''}
							title={singleLocation.title}
						/>
						<Typography variant="h6"><b>Название: </b>{singleLocation.title}</Typography>
						<Typography variant="h6"><b>Описание: </b>{singleLocation.description}</Typography>
					</CardContent>
				</Card>

				<Typography variant="h5" className={classes.gallery}>
					Фотогалерея
				</Typography>

				<Grid container>
					{singleLocation && photos && photos.map(photo => (
						<Grid item xs={12} md={6} lg={2} key={photo._id}>
							{singleLocation._id === photo.location._id &&
							<Grid item>
								<img
									src={`http://localhost:8000/uploads/photoGallery/${photo.photo}`}
									alt={photo._id}
									className={classes.img}
								/>

								{user && user.role === 'admin' &&
								<Grid className={classes.deleteBtn}>
									<Button
										variant="contained"
										color="secondary"
										type="submit"
										onClick={() => dispatch(deletePhoto(photo._id))}
									>
										Удалить фото
									</Button>
								</Grid>
								}
							</Grid>
							}
						</Grid>
					))}
				</Grid>

				<Typography variant="h5" className={classes.title}>
					Средние рейтинги
				</Typography>
				<Grid item>
					<div className={classes.div}>
						<Box component="fieldset" mb={3} borderColor="transparent">
							<Typography component="legend">Общий средний рейтинг:</Typography>
							<Rating name="read-only" value={overallRating} readOnly/>
						</Box>
					</div>
					<div className={classes.div}>
						<Box component="fieldset" mb={3} borderColor="transparent">
							<Typography component="legend">Средний рейтинг качества еды:</Typography>
							<Rating name="read-only" value={foodRating} readOnly/>
						</Box>
					</div>
					<div className={classes.div}>
						<Box component="fieldset" mb={3} borderColor="transparent">
							<Typography component="legend">Средний рейтинг качества обслуживания:</Typography>
							<Rating name="read-only" value={serviceRating} readOnly/>
						</Box>
					</div>
					<div className={classes.div}>
						<Box component="fieldset" mb={3} borderColor="transparent">
							<Typography component="legend">Средний рейтинг интерьера:</Typography>
							<Rating name="read-only" value={interiorRating} readOnly/>
						</Box>
					</div>
				</Grid>

				<Typography variant="h5" className={classes.title}>
					Отзывы
				</Typography>
				{singleLocation && reviews && reviews.map(review => (
					<Grid item key={review._id}>
						{singleLocation._id === review.location._id &&
						<Grid item>
							{review.date} <b>{review.user.username}</b> написал:
							<div><b>"{review.comment}"</b></div>
							<div className={classes.div}>
								<Box component="fieldset" mb={3} borderColor="transparent">
									<Typography component="legend">Качество еды:</Typography>
									<Rating name="read-only" value={review.foodRating} readOnly/>
								</Box>
							</div>
							<div className={classes.div}>
								<Box component="fieldset" mb={3} borderColor="transparent">
									<Typography component="legend">Качество обслуживания:</Typography>
									<Rating name="read-only" value={review.serviceRating} readOnly/>
								</Box>
							</div>
							<div className={classes.div}>
								<Box component="fieldset" mb={3} borderColor="transparent">
									<Typography component="legend">Интерьер:</Typography>
									<Rating name="read-only" value={review.interiorRating} readOnly/>
								</Box>
							</div>
							{user && user.role === 'admin' &&
							<Grid className={classes.deleteBtn}>
								<Button
									variant="contained"
									color="secondary"
									type="submit"
									onClick={() => dispatch(deleteReview(review._id))}
								>
									Удалить отзыв
								</Button>
							</Grid>
							}
						</Grid>
						}
					</Grid>
				)).reverse()
				}
				{user &&
				<Grid>
					<Typography variant="h5" className={classes.reviewTitle}>
						Добавить отзыв
					</Typography>
					<form onSubmit={submitFormHandler}>
						<Grid item className={classes.gridFormElement}>
							<FormElement
								required
								propertyName="comment"
								title="Комментарий"
								onChange={inputChangeHandler}
								type="text"
								value={review.comment}
								autoComplete="current-comment"
								placeholder="Введите комментарий"
							/>
						</Grid>
						<Grid item className={classes.gridFormElement}>
							<FormElement
								type="select"
								title="Качество еды"
								propertyName="foodRating"
								onChange={inputChangeHandler}
								options={ratingOptions}
								value={review.foodRating}
							/>
						</Grid>
						<Grid item className={classes.gridFormElement}>
							<FormElement
								type="select"
								title="Качество обслуживания"
								propertyName="serviceRating"
								onChange={inputChangeHandler}
								options={ratingOptions}
								value={review.serviceRating}
							/>
						</Grid>
						<Grid className={classes.gridFormElement}>
							<FormElement
								type="select"
								title="Интерьер"
								propertyName="interiorRating"
								onChange={inputChangeHandler}
								options={ratingOptions}
								value={review.interiorRating}
							/>
						</Grid>
						<Grid className={classes.gridBtn}>
							<Button variant="contained" color="primary" type="submit">
								Добавить
							</Button>
						</Grid>
					</form>
				</Grid>
				}

				{user &&
				<Grid>
					<Typography variant="h5" className={classes.reviewTitle}>
						Добавить фото в галерею
					</Typography>
					<form onSubmit={submitPhotoHandler}>
						<Grid item className={classes.gridFormElement}>
							<FormElement
								required
								propertyName="photo"
								title="Фото"
								value={photo.photo}
								onChange={photoChangeHandler}
								type="file"
							/>
						</Grid>
						<Grid className={classes.gridBtn}>
							<Button variant="contained" color="primary" type="submit">
								Добавить
							</Button>
						</Grid>
					</form>
				</Grid>
				}
			</Grid>
			}
		</>
	);
};

export default LocationInfo;