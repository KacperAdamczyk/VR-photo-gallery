import React, {Component} from 'react';
import { View, Text, asset, Image, AppRegistry } from 'react-360';

class Images extends Component {
    render() {
        return (
          <View>
              <Text>Test</Text>
              <Image source={asset('1024.jpeg')}/>
          </View>
        );
    }
}

export default Images;

AppRegistry.registerComponent('Images', () => Images);