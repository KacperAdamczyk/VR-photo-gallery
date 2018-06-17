import React from 'react';
import { AppRegistry, Environment, Image, StyleSheet, Text, View, VrButton, } from 'react-360';

class Background extends React.Component {
    constructor(props) {
        super(props);
        Environment.setBackgroundImage(props.uri, {format: props.format});
        this.type = '2D';
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.uri !== this.props.uri || nextProps.format !== this.props.format) {
            Environment.setBackgroundImage(nextProps.uri, {format: nextProps.format});
        }
    }

    render() {
        return null;
    }
}

class App extends React.Component {
    url = 'http://localhost:8080/images';
    state = {
        index: 0,
        images: []
    };

    componentDidMount() {
        fetch(this.url)
          .then(res => res.json())
          .then(images => images.map(image => ({
              id: image.$loki,
              name: image.originalname
          })))
          .then(images => console.log(images) || this.setState({images}))
          .catch(e => console.log(e));
    }

    _prevPhoto = () => {
        let next = this.state.index - 1;
        if (next < 0) {
            next += this.state.images.length;
        }
        this.setState({
            index: next,
        });
    };

    _nextPhoto = () => {
        this.setState({
            index: (this.state.index + 1) % this.state.images.length,
        });
    };

    render() {
        const selected = this.state.images[this.state.index];
          const current = selected ?
            {
              uri: `${this.url}/${selected.id}`,
              format: '2D',
              name: selected.name
          } : {uri: null};
        return (
          <View style={styles.wrapper}>
              {
                  true ?
                    <Image source={{uri: current.uri}} style={styles.image}/> :
                    <Background uri={current.uri} format={current.format}/>
              }
              <View style={styles.controls}>
                  <VrButton onClick={this._prevPhoto} style={styles.button}>
                      <Text style={styles.buttonText}>{'<'}</Text>
                  </VrButton>
                  <View>
                      <Text style={styles.title}>{current.name}</Text>
                  </View>
                  <VrButton onClick={this._nextPhoto} style={styles.button}>
                      <Text style={styles.buttonText}>{'>'}</Text>
                  </VrButton>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 600,
        width: 1000,
    },
    controls: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 600,
        padding: 10,
    },
    title: {
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 36,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#c0c0d0',
        borderRadius: 5,
        width: 40,
        height: 44,
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        width: 600,
        height: 500
    }
});

AppRegistry.registerComponent('App', () => App);