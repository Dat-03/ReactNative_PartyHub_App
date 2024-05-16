import React, {ReactNode} from 'react';
import {FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors} from '../constants/themeColor';
import {Food, Food_color} from '../assets';
import {TagCT} from '.';

interface Props {
  isColor?: boolean;
}

interface Category {
  icon: ReactNode;
  color: string;
  label: string;
  key: string;
}

const CategoriesList = (props: Props) => {
  const {isColor} = props;

  const categories: Category[] = [
    {
      key: 'sports',
      label: 'Sports',
      icon: (
        <FontAwesome5
          name="basketball-ball"
          color={isColor ? appColors.white : '#F0635A'}
          size={20}
        />
      ),
      color: '#F0635A',
    },
    {
      key: 'mucsic',
      label: 'Music',
      icon: (
        <FontAwesome5
          name="music"
          color={isColor ? appColors.white : '#F59762'}
          size={20}
        />
      ),
      color: '#F59762',
    },
    {
      key: 'food',
      label: 'Food',
      icon: isColor ? (
        <Food color={isColor ? appColors.white : '#29D697'} />
      ) : (
        <Food_color color={isColor ? appColors.white : '#29D697'} />
      ),
      color: '#29D697',
    },
    {
      key: 'art',
      label: 'Art',
      icon: (
        <Ionicons
          name="color-palette"
          color={isColor ? appColors.white : '#46CDFB'}
        />
      ),
      color: '#46CDFB',
    },
  ];

  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({item, index}) => (
        <TagCT
          styles={{
            marginRight: index === categories.length - 1 ? 28 : 12,
            minWidth: 82,
          }}
          bgColor={isColor ? item.color : appColors.white}
          onPress={() => {}}
          icon={item.icon}
          label={item.label}
          textColor={isColor ? appColors.white : appColors.text2}
        />
      )}
    />
  );
};

export default CategoriesList;
