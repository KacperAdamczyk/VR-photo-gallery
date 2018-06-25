import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

import {baseUrl} from '../../config';
import {Image} from '../../models/Image';
import {setImagesAsyncFactory} from '../../store/actions';
import {IStore} from '../../store/store';
import ImageItem from './ImageItem/ImageItem';

import './ImagesList.css';

interface IProps {
    images: Image[];
    updateImages: () => void;
}

class ImagesListBase extends Component<IProps> {
    public componentDidMount() {
        this.props.updateImages();
    }

    public render() {
        return (
            <ul className='images-list'>
                {this.props.images.map(image => <ImageItem image={image} key={image.$loki}/>)}
            </ul>
        );
    }
}


const mapStateToProps = (state: IStore) => ({
    images: state.images
});

const mapDispatchToProps = (dispatch: any) => ({
    updateImages: () => dispatch(setImagesAsyncFactory(`${baseUrl}/images`))
});

const ImagesList = connect(mapStateToProps, mapDispatchToProps)(ImagesListBase);

export default ImagesList;