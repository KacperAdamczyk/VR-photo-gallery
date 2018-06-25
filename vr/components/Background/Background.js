import React from 'react';
import { Environment } from 'react-360';

class Background extends React.Component {
    constructor(props) {
        super(props);
        Environment.setBackgroundImage(props.uri);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.uri !== this.props.uri || nextProps.format !== this.props.format) {
            Environment.setBackgroundImage(nextProps.uri);
        }
    }

    render() {
        return null;
    }
}

export default Background;