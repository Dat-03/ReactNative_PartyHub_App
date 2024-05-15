import {View, Text, Modal, TouchableOpacity, Button} from 'react-native';
import React, {ReactNode, useRef, useState} from 'react';
import ButtonCT from './ButtonCT';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {InputCT, RowCT, SpaceCT, TextCT} from '.';
import {Camera, Image, Link} from 'iconsax-react-native';
import {appColors} from '../constants/themeColor';
import {fontFamilies} from '../constants/fontFamilies';
import ImageCropPicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import {globalStyles} from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  onSelect: (val: {type: 'url' | 'file'; value: string | ImageOrVideo}) => void;
}
const ButtonImagePicker = (props: Props) => {
  const {onSelect} = props;

  const modalizeRef = useRef<Modalize>();

  const [imageUrl, setImageUrl] = useState('');
  const [isVisibleModalAddUrl, setIsVisibleModalAddUrl] = useState(false);
  const options: Options = {
    cropping: true,
    mediaType: 'photo',
  };
  const choiceImages = [
    {
      key: 'camera',
      title: 'Take a picture',
      icon: <Camera size={22} color={appColors.text} />,
    },
    {
      key: 'library',
      title: 'From libary',
      icon: <Image size={22} color={appColors.text} />,
    },
    {
      key: 'url',
      title: 'From url',
      icon: <Link size={22} color={appColors.text} />,
    },
  ];

  const renderItem = (item: {icon: ReactNode; key: string; title: string}) => (
    <RowCT
      key={item.key}
      styles={{marginBottom: 20}}
      onPress={() => handleChoiceImage(item.key)}>
      {item.icon}
      <SpaceCT width={12} />
      <TextCT text={item.title} flex={1} font={fontFamilies.medium} />
    </RowCT>
  );
  const handleChoiceImage = (key: string) => {
    switch (key) {
      case 'library':
        ImageCropPicker.openPicker(options).then(res => {
          onSelect({type: 'file', value: res});
        });
        break;

      case 'camera':
        ImageCropPicker.openCamera(options).then(res => {
          onSelect({type: 'file', value: res});
        });
        break;
      default:
        setIsVisibleModalAddUrl(true);
        break;
    }

    modalizeRef.current?.close();
  };
  return (
    <View style={{marginBottom: 20}}>
      <ButtonCT
        text="Update Image"
        onPress={() => modalizeRef.current?.open()}
        type="link"
      />
      <Portal>
        <Modalize
          adjustToContentHeight
          ref={modalizeRef}
          handlePosition="inside">
          <View style={{marginVertical: 30, paddingHorizontal: 20}}>
            {choiceImages.map(item => renderItem(item))}
          </View>
        </Modalize>
      </Portal>
      <Modal
        visible={isVisibleModalAddUrl}
        style={{flex: 1}}
        statusBarTranslucent
        transparent
        animationType="slide">
        <View
          style={[
            globalStyles.container,
            {
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              backgroundColor: appColors.white,
              margin: 20,
              borderRadius: 12,
              width: '90%',
              padding: 20,
            }}>
            <RowCT justify="flex-end">
              <TouchableOpacity
                onPress={() => {
                  setImageUrl('');
                  setIsVisibleModalAddUrl(false);
                }}>
                <AntDesign name="close" size={24} color={appColors.text} />
              </TouchableOpacity>
            </RowCT>
            <TextCT text="Image URL" title size={18} />
            <InputCT
              placeholder="URL"
              value={imageUrl}
              onChange={val => setImageUrl(val)}
              allowClear
            />
            <RowCT justify="flex-end">
              <ButtonCT
                type="primary"
                text="Agree"
                styles={{height: 54, width: 100}}
                onPress={() => {
                  setIsVisibleModalAddUrl(false);
                  onSelect({type: 'url', value: imageUrl});
                  setImageUrl('');
                }}
              />
            </RowCT>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ButtonImagePicker;
