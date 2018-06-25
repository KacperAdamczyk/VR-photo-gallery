import * as React from 'react';
import {Component, Fragment} from 'react';
import {Provider} from 'react-redux';

import ImagesList from './components/ImagesList/ImagesList';
import ImageUploader from './components/ImageUploader/ImageUploader';
import PreviewModal from './components/PreviewModal/PreviewModal';
import {baseUrl} from './config';
import {Image} from './models/Image';
import store from './store/store';

import './App.css';

interface IState {
    images: Image[];
}

class App extends Component<{}, IState> {
    public render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <PreviewModal/>
                    <div className='app-container'>
                        <div className='app-container__vr-btn'>
                            <button className='btn btn-primary' onClick={this.navigate}>Go to VR!</button>
                        </div>
                        <ImageUploader/>
                        <ImagesList/>
                    </div>
                </Fragment>
            </Provider>
        );
    }

    private navigate = () => window.open(`${baseUrl}/vr`);
}

export default App;
