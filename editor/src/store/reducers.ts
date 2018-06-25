import {IImagesAction, ISelectedImageAction, SET_IMAGES, SET_SELECTED_IMAGE} from './actions';

export function imagesReducer(state = [], action: IImagesAction) {
    switch (action.type) {
        case SET_IMAGES:
            return action.payload;
        default:
            return state;
    }
}

export function selectedImageReducer(state = null, action: ISelectedImageAction) {
    switch (action.type) {
        case SET_SELECTED_IMAGE:
            return action.payload;
        default:
            return state;
    }
}