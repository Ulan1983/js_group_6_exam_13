import {
	CREATE_LOCATION_FAILURE,
	CREATE_LOCATION_SUCCESS, DELETE_LOCATION_FAILURE, DELETE_LOCATION_SUCCESS,
	FETCH_LOCATION_FAILURE,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATIONS_FAILURE,
	FETCH_LOCATIONS_SUCCESS
} from "./actionTypes";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from "connected-react-router";

export const fetchLocationsSuccess = locations => ({type: FETCH_LOCATIONS_SUCCESS, locations});
export const fetchLocationsFailure = error => ({type: FETCH_LOCATIONS_FAILURE, error});

export const fetchLocationSuccess = location => ({type: FETCH_LOCATION_SUCCESS, location});
export const fetchLocationFailure = error => ({type: FETCH_LOCATION_FAILURE, error});

export const createLocationSuccess = () => ({type: CREATE_LOCATION_SUCCESS});
export const createLocationFailure = error => ({type: CREATE_LOCATION_FAILURE, error});

export const deleteLocationSuccess = () => ({type: DELETE_LOCATION_SUCCESS});
export const deleteLocationFailure = error => ({type: DELETE_LOCATION_FAILURE, error});

export const fetchLocations = () => {
	return async dispatch => {
		try {
			const response = await axiosApi.get('/locations');
			dispatch(fetchLocationsSuccess(response.data));
		} catch (error) {
			fetchLocationsFailure(error);
		}
	}
};

export const fetchLocation = id => {
	return async dispatch => {
		try {
			const response = await axiosApi.get(`/locations/${id}`);
			dispatch(fetchLocationSuccess(response.data));
		} catch (error) {
			dispatch(fetchLocationFailure(error));
		}
	}
};

export const createLocation = locationData => {
	return async dispatch => {
		try {
			await axiosApi.post('/locations', locationData);
			dispatch(createLocationSuccess());
			toast.info('Вы успешно создали заведение', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/'));
		} catch (error) {
			dispatch(createLocationFailure(error));
		}
	}
};

export const deleteLocation = id => {
	return async dispatch => {
		try {
			await axiosApi.delete(`/locations/${id}`);
			dispatch(deleteLocationSuccess());
			toast.info('Вы успешно удалили заведение', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(push('/'));
			dispatch(fetchLocations());
		} catch (error) {
			dispatch(deleteLocationFailure(error));
		}
	}
};