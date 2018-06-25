import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

import {baseUrl} from '../../../config';
import {Image} from '../../../models/Image';
import {ISelectedImageAction, selectImage, setImagesAsyncFactory} from '../../../store/actions';

import './ImageItem.css';

interface IProps {
    image: Image;
    selectImage: (id: number | null) => ISelectedImageAction;
    updateImages: () => void;
}

class ImageItemBase extends Component<IProps> {
    public render() {
        return (
            <li className='image-item'>
                <span className='image-item__text'>{this.props.image.originalname}</span>
                <button className='image-item__action-btn btn btn-outline-secondary' onClick={this.openPreview}>
                    <i className="material-icons">visibility</i>
                </button>
                <button className='image-item__action-btn btn btn-outline-danger' onClick={this.deleteImage}>
                    <i className="material-icons">delete</i>
                </button>
            </li>
        );
    }

    private openPreview = () => this.props.selectImage(this.props.image.$loki);
    private deleteImage = async () => {
        try {
            await fetch(`${baseUrl}/images/${this.props.image.$loki}`, {method: 'delete'});
        } catch (e) {
            console.log(e);
        }
        this.props.updateImages();
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    selectImage: (id: number | null) => dispatch(selectImage(id)),
    updateImages: () => dispatch(setImagesAsyncFactory(`${baseUrl}/images`))
});

const ImageItem = connect(null, mapDispatchToProps)(ImageItemBase);

export default ImageItem;