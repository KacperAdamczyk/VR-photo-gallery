import * as React from 'react';
import {Image} from '../../../models/Image';

interface IProps {
    image: Image
}

function ImageItem(props: IProps) {
    return (
      <li className='list-group-item'>
          {props.image.originalname}
      </li>
    );
}

export default ImageItem;