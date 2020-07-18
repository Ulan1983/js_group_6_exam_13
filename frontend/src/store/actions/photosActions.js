import {
	CREATE_PHOTO_FAILURE,
	CREATE_PHOTO_SUCCESS, DELETE_PHOTO_FAILURE,
	DELETE_PHOTO_SUCCESS,
	FETCH_PHOTOS_FAILURE,
	FETCH_PHOTOS_SUCCESS
} from "./actionTypes";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const fetchPhotosSuccess = photos => ({type: FETCH_PHOTOS_SUCCESS, photos});
export const fetchPhotosFailure = error => ({type: FETCH_PHOTOS_FAILURE, error});

export const createPhotoSuccess = () => ({type: CREATE_PHOTO_SUCCESS});
export const createPhotoFailure = error => ({type: CREATE_PHOTO_FAILURE, error});

export const deletePhotoSuccess = () => ({type: DELETE_PHOTO_SUCCESS});
export const deletePhotoFailure = error => ({type: DELETE_PHOTO_FAILURE, error});

export const fetchPhotos = () => {
	return async dispatch => {
		try {
			const response = await axiosApi.get('/pictures');
			dispatch(fetchPhotosSuccess(response.data));
		} catch (error) {
			dispatch(fetchPhotosFailure(error));
		}
	}
};

export const createPhoto = (id, photoData) => {
	return async dispatch => {
		try {
			await axiosApi.post(`/pictures/${id}`, photoData);
			dispatch(createPhotoSuccess());
			toast.info('Вы успешно добавили фото', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(fetchPhotos());
		} catch (error) {
			dispatch(createPhotoFailure(error));
		}
	}
};

export const deletePhoto = id => {
	return async dispatch => {
		try {
			await axiosApi.delete(`/pictures/${id}`);
			dispatch(deletePhotoSuccess());
			toast.info('Вы успешно удалили фото', {
				position: toast.POSITION.TOP_RIGHT
			});
			dispatch(fetchPhotos());
		} catch (error) {
			dispatch(deletePhotoFailure(error));
		}
	}
};