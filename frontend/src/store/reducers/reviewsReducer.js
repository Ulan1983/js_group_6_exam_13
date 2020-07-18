import {
	FETCH_REVIEW_FAILURE,
	FETCH_REVIEW_SUCCESS,
	FETCH_REVIEWS_FAILURE,
	FETCH_REVIEWS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
	reviews: [],
	review: null,
	error: null
};

const reviewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REVIEWS_SUCCESS:
			return {...state, reviews: action.reviews};
		case FETCH_REVIEWS_FAILURE:
			return {...state, error: action.error};
		case FETCH_REVIEW_SUCCESS:
			return {...state, review: action.review};
		case FETCH_REVIEW_FAILURE:
			return {...state, error: action.error};
		default:
			return state;
	}
};

export default reviewsReducer;