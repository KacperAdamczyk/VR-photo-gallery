import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {Image} from '../models/Image';
import {imagesReducer, selectedImageReducer} from './reducers';

interface IStore {
    images: Image[];
    selectedImage: number | null;
}

const rootReducer = combineReducers({
    images: imagesReducer,
    selectedImage: selectedImageReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export {
    store as default,
    IStore
};