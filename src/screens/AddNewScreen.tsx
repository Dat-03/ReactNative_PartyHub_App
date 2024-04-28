import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonCT,
  ChoiceLocation,
  ContainerCT,
  DateTimePicker,
  InputCT,
  RowCT,
  SectionCT,
  SpaceCT,
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

  const handleChangeValue = (key: string, value: string | Date) => {
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
        <RowCT>
          <DateTimePicker
            label="Start at"
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            Selected={eventData.startAt}
          />
          <SpaceCT width={20} />
          <DateTimePicker
            label="End at"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            Selected={eventData.endAt}
          />
        </RowCT>
        <DateTimePicker
          label="Date"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          Selected={eventData.date}
        />
        <InputCT
          placeholder="Title address"
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
