import {
	FETCH_LOCATION_FAILURE,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATIONS_FAILURE,
	FETCH_LOCATIONS_SUCCESS
} from "../actions/actionTypes";

const initialState ={
	locations: [],
	location: null,
	error: null
};

const locationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_LOCATIONS_SUCCESS:
			return {...state, locations: action.locations};
		case FETCH_LOCATIONS_FAILURE:
			return {...state, error: action.error};
		case FETCH_LOCATION_SUCCESS:
			return {...state, location: action.location};
		case FETCH_LOCATION_FAILURE:
			return {...state, error: action.error};
		default:
			return state;
	}
};

export default locationsReducer;