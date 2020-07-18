import {
	CREATE_REVIEW_FAILURE,
	CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_SUCCESS,
	FETCH_REVIEWS_FAILURE,
	FETCH_REVIEWS_SUCCESS
} from "./actionTypes";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const fetchReviewsSuccess = reviews => ({type: FETCH_REVIEWS_SUCCESS, reviews});
export const fetchReviewsFailure = error => ({type: FETCH_REVIEWS_FAILURE, error});

export const createReviewSuccess = () => ({type: CREATE_REVIEW_SUCCESS});
export const createReviewFailure = error => ({type: CREATE_REVIEW_FAILURE, error});

export const deleteReviewSuccess = () => ({type: DELETE_REVIEW_SUCCESS});
export const deleteReviewFailure = error => ({type: DELETE_REVIEW_FAILURE, error});

export const fetchReviews = () => {
	return async dispatch => {
		try {
			const response = await axiosApi.get('/reviews');
			dispatch(fetchReviewsSuccess(response.data));
		} catch (error) {
			dispatch(fetchReviewsFailure(error));
		}
	}
};

export const createReview = (id, reviewData) => {
	return async dispatch => {
		try {
			await axiosApi.post(`/reviews/${id}`, reviewData);
			dispatch(createReviewSuccess());
			toast.info('Вы успешно добавили отзыв', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(fetchReviews());
		} catch (error) {
			dispatch(createReviewFailure(error));
		}
	}
};

export const deleteReview = id => {
	return async dispatch => {
		try {
			await axiosApi.delete(`/reviews/${id}`);
			dispatch(deleteReviewSuccess());
			toast.info('Вы успешно удалили отзыв', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(fetchReviews());
		} catch (error) {
			dispatch(deleteReviewFailure(error));
		}
	}
};