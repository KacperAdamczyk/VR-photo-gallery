import * as React from 'react';
import {Image} from '../../models/Image';
import ImageItem from './ImageItem/ImageItem';

interface IProps {
    images: Image[];
}

function ImagesList(props: IProps) {
    return (
        <ul className='list-group'>
            {props.images.map(image => <ImageItem image={image} key={image.$loki}/>)}
        </ul>
    );
}

export default ImagesList;