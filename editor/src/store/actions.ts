import {Image} from '../models/Image';

export const SET_IMAGES: 'SET_IMAGES' = 'SET_IMAGES';

export interface IImagesAction {
    type: typeof SET_IMAGES
    payload: Image[]
}

function setImages(images: Image[]): IImagesAction {
    return {
        payload: images,
        type: SET_IMAGES
    };
}

export function setImagesAsyncFactory(url: string) {
    return (dispatch: any) => fetch(url)
            .then(res => res.json())
            .then((images: Image[]) => dispatch(setImages(images)));

}

export const SET_SELECTED_IMAGE: 'SET_SELECTED_IMAGE' = 'SET_SELECTED_IMAGE';

export interface ISelectedImageAction {
    type: typeof SET_SELECTED_IMAGE
    payload: number | null
}

export function selectImage(id: number | null): ISelectedImageAction {
    return {
        payload: id,
        type: SET_SELECTED_IMAGE
    };
}