import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class Button extends Component {
  render() {
    const { title, color, onPress } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: color ? color : 'blue',
            fontSize: 10,
            alignItems: 'center',
            margin: 10,
            width: 100,
            height: 50,
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={onPress}
        >
          <Text style={{ color: '#fff' }}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Button;
