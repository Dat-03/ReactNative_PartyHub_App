import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {Food, Food_color, images} from '../assets';
import {TextCT} from '.';
import {globalStyles} from '../styles/globalStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress?: () => void;
  type: string;
}

const MarkerCT = (props: Props) => {
  const {type, onPress} = props;
  console.log(type);

  const renderIcon = (type: string) => {
    let icon;

    switch (type) {
      case 'art':
        icon = <Ionicons name="color-palette" color="#46CDFB" size={24} />;
        break;
      case 'sports':
        icon = (
          <FontAwesome5 name="basketball-ball" color="#F0635A" size={24} />
        );
        break;
      case 'food':
        icon = <Food_color />;
        break;

      default:
        icon = <FontAwesome5 name="music" color="#F59762" size={24} />;
        break;
    }
    return icon;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        imageStyle={{resizeMode: 'contain', width: 56, height: 56}}
        source={images.border_location}
        style={[
          globalStyles.shadow,
          {
            width: 56,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {renderIcon(type)}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MarkerCT;
