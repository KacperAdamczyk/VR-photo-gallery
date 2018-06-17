import * as React from 'react';

import ImagesList from './components/ImagesList/ImagesList';
import ImageUploader from './components/ImageUploader/ImageUploader';
import {baseUrl} from './config';
import {Image} from './models/Image';

import './App.css';

interface IState {
    images: Image[];
}

class App extends React.Component<{}, IState> {
    public state ={
        images: []
    };

    public componentDidMount() {
        this.updateImages();
    }

    public render() {
        return (
            <div className='app-container'>
                <div className='app-container__vr-btn'>
                    <a href={`${baseUrl}/vr`}><button className='btn btn-primary'>Go to VR!</button></a>
                </div>
                <ImageUploader refreshFiles={this.updateImages}/>
                <ImagesList images={this.state.images}/>
            </div>
        );
    }

    private updateImages = () =>
        fetch(`${baseUrl}/images`)
        .then(res => res.json())
        .then((images: Image[]) => this.setState({images}));
}

export default App;
