import * as React from 'react';
import {baseUrl} from '../../config';

import './ImageUploader.css';

interface IProps {
    refreshFiles: () => void;
}

class ImageUploader extends React.Component<IProps> {
    private inputRef = React.createRef<HTMLInputElement>();

    public render() {
        return (
            <div className='image-uploader'>
                <div className='input-group'>
                    <input className='form-control' type="file" multiple={true} ref={this.inputRef}/>
                </div>
                <button className='btn btn-outline-primary' onClick={this.handleUpload}>Upload</button>
            </div>
        );
    }

    private handleUpload = async () => {
        const files = this.inputRef.current && this.inputRef.current.files;
        if (files) {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                const file = files.item(i);
                if (file) {
                    data.append('images', file);
                }
            }
            try {
                await fetch(`${baseUrl}/images`, {method: 'POST', body: data});
                this.props.refreshFiles();
            } catch (e) {
                console.log(e);
            }
        }
    };
}

export default ImageUploader;