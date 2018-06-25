import * as React from 'react';
import {Component} from 'react';
import * as Modal from 'react-modal';
import {connect} from 'react-redux';

import {baseUrl} from '../../config';
import {ISelectedImageAction, selectImage} from '../../store/actions';
import {IStore} from '../../store/store';

import './PreviewModal.css';

interface IProps {
    selectedImage: number | null;
    selectImage: (id: number | null) => ISelectedImageAction;
}

Modal.setAppElement('#root');

class PreviewModalBase extends Component<IProps> {
    public render() {
        return (
            <Modal isOpen={!!this.props.selectedImage} onRequestClose={this.closeModal}>
                <div className='preview-modal'>
                    <button className='preview-modal__close btn btn-outline-primary' onClick={this.closeModal}>
                        <i className="material-icons">close</i>
                    </button>
                    {
                        this.props.selectedImage &&
                        <img className='preview-modal__image' src={`${baseUrl}/images/${this.props.selectedImage}`}
                             alt="image preview"/>
                    }
                </div>
            </Modal>
        );
    }

    private closeModal = () => this.props.selectImage(null);
}

const mapStateToProps = (state: IStore) => ({
    selectedImage: state.selectedImage
});

const mapDispatchToProps = {
    selectImage
};

const PreviewModal = connect(mapStateToProps, mapDispatchToProps)(PreviewModalBase);

export default PreviewModal;