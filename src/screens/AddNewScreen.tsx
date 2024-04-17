import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonCT,
  ChoiceLocation,
  ContainerCT,
  InputCT,
  SectionCT,
  TextCT,
} from '../components';
import {authSelector} from '../redux/reducers/authReducer';
import {useSelector} from 'react-redux';

const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: ' ',
  },
  imageUrl: '',
  users: '',
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  Date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });

  const handleChangeValue = (key: string, value: string) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };
  const handleAddEvent = async () => {
    console.log(eventData);
  };
  return (
    <ContainerCT isScroll>
      <SectionCT>
        <TextCT text="Add new" title />
      </SectionCT>
      <SectionCT>
        <InputCT
          placeholder="Title"
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)}
          allowClear
        />
        <InputCT
          placeholder="Description"
          multiline
          numberOfLines={3}
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
          allowClear
        />
        <InputCT
          placeholder="Title address"
          multiline
          numberOfLines={3}
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', {...eventData.location, title: val})
          }
          allowClear
        />
        <ChoiceLocation />
      </SectionCT>
      <SectionCT>
        <ButtonCT text="Add new" type="primary" onPress={handleAddEvent} />
      </SectionCT>
    </ContainerCT>
  );
};

export default AddNewScreen;
