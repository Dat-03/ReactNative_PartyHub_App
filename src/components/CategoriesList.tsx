import React, {ReactNode} from 'react';
import {FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Food} from '../assets';
import {appColors} from '../constants/themeColor';
import {globalStyles} from '../styles/globalStyles';
import RowCT from './RowCT';
import SpaceCT from './SpaceCT';
import TextCT from './TextCT';

interface Props {
  isColor?: boolean;
}

interface Category {
  key: string;
  title: string;
  icon: ReactNode;
  iconColor: string;
}

const CategoriesList = (props: Props) => {
  const {isColor} = props;

  const categories: Category[] = [
    {
      key: '1',
      icon: (
        <Ionicons
          name="basketball"
          size={22}
          color={isColor ? appColors.white : '#EE544A'}
        />
      ),
      iconColor: '#EE544A',
      title: 'Sports',
    },
    {
      key: '2',
      icon: (
        <FontAwesome
          name="music"
          size={22}
          color={isColor ? appColors.white : '#F59762'}
        />
      ),
      iconColor: '#F59762',
      title: 'Music',
    },
    {
      key: '3',
      icon: <Food color={isColor ? appColors.white : '#29D697'} />,
      iconColor: '#29D697',
      title: 'Food',
    },
    {
      key: '4',
      icon: (
        <Ionicons
          name="color-palette-sharp"
          size={22}
          color={isColor ? appColors.white : '#46CDFB'}
        />
      ),
      iconColor: '#46CDFB',
      title: 'Art',
    },
  ];

  const renderTagCategory = (item: Category) => {
    return (
      <RowCT
        onPress={() => {}}
        styles={[
          globalStyles.tag,
          {
            backgroundColor: isColor ? item.iconColor : appColors.white,
          },
        ]}>
        {item.icon}
        <SpaceCT width={8} />
        <TextCT
          text={item.title}
          color={isColor ? appColors.white : appColors.gray}
        />
      </RowCT>
    );
  };

  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      renderItem={({item}) => renderTagCategory(item)}
    />
  );
};

export default CategoriesList;
