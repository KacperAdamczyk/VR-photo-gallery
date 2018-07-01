import React from 'react';
import { AppRegistry, Image, StyleSheet, Text, View, VrButton, } from 'react-360';

import Background from './components/Background/Background';
import { baseUrl } from './config';

class App extends React.Component {
    defaultHeight = 700;
    state = {
        index: 0,
        images: [],
        size: {
            height: this.defaultHeight,
            width: '100%'
        },
        background: false
    };

    componentDidMount() {
        fetch(baseUrl)
          .then(res => res.json())
          .then(images => images.map(image => ({
              id: image.$loki,
              name: image.originalname
          })))
          .then(images => this.setState({images}),
            e => console.log(e));
    }

    prevImage = () => {
        let next = this.state.index - 1;
        if (next < 0) {
            next += this.state.images.length;
        }
        this.setState({
            index: next,
        });
    };

    nextImage = () => {
        this.setState({
            index: (this.state.index + 1) % this.state.images.length,
        });
    };

    changeMode = () => this.setState({background: !this.state.background});
    handleInput = (e) => {
        if (e.nativeEvent.inputEvent && e.nativeEvent.inputEvent.type !== 'button') {
            this.nextImage();
        }
    };

    render() {
        const selected = this.state.images[this.state.index];
        const current = selected ?
          {
              uri: `${baseUrl}/${selected.id}`,
              name: selected.name
          } : {uri: null, name: '(select image)'};
        return (
          <View style={styles.wrapper}>
              <Image source={{uri: this.state.background ? null : current.uri}} style={this.state.size}/>
              <Background uri={{uri: this.state.background ? current.uri : null}}/>
              <View style={styles.controls} onInput={this.handleInput}>
                  <VrButton onClick={this.prevImage} style={styles.button}>
                      <Text style={styles.buttonText}>{'<'}</Text>
                  </VrButton>
                  <View>
                      <Text style={styles.title}>{current.name}</Text>
                  </View>
                  <VrButton onClick={this.nextImage} style={styles.button}>
                      <Text style={styles.buttonText}>{'>'}</Text>
                  </VrButton>
                  <VrButton onClick={this.changeMode} style={styles.buttonWide}>
                      <Text style={styles.buttonTextSmall}>{'Change mode'}</Text>
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
        alignContent: 'space-between',
        justifyContent: 'flex-end',
        height: 1000,
        width: 1000,
    },
    controls: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 80,
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
    buttonWide: {
        marginLeft: 80,
        backgroundColor: '#c0c0d0',
        borderRadius: 5,
        width: 130,
        height: 30
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonTextSmall: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

AppRegistry.registerComponent('App', () => App);