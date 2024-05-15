import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import userAPI from '../apis/userApi';
import {
  ButtonCT,
  ButtonImagePicker,
  ChoiceLocation,
  ContainerCT,
  DateTimePicker,
  DropDownPicker,
  InputCT,
  RowCT,
  SectionCT,
  SpaceCT,
  TextCT,
} from '../components';
import {appColors} from '../constants/themeColor';
import {SelectModel} from '../models/SelectModel';
import {authSelector} from '../redux/reducers/authReducer';
import {Validate} from '../utils/Validate';

const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  category: '',
};

const AddNewScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });
  const [usersSelects, setUsersSelects] = useState<SelectModel[]>([]);
  const [fileSelected, setFileSelected] = useState<any>();
  const [errorsMess, setErrorsMess] = useState<string[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    const mess = Validate.EventValidation(eventData);

    setErrorsMess(mess);
  }, [eventData]);

  const handleChangeValue = (key: string, value: string | Date | string[]) => {
    const items = {...eventData};
    items[`${key}`] = value;

    setEventData(items);
  };

  const handleGetAllUsers = async () => {
    const api = `/get-all`;

    try {
      const res: any = await userAPI.HandleUser(api);

      if (res && res.data) {
        const items: SelectModel[] = [];

        res.data.forEach(
          (item: any) =>
            item.email &&
            items.push({
              label: item.email,
              value: item.id,
            }),
        );

        setUsersSelects(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEvent = async () => {
    if (fileSelected) {
      const filename = `${fileSelected.filename ?? `image-${Date.now()}`}.${
        fileSelected.path.split('.')[1]
      }`;
      const path = `images/${filename}`;

      const res = storage().ref(path).putFile(fileSelected.path);

      res.on(
        'state_changed',
        snap => {
          console.log(snap.bytesTransferred);
        },
        error => {
          console.log(error);
        },
        () => {
          storage()
            .ref(path)
            .getDownloadURL()
            .then(url => {
              eventData.photoUrl = url;
            });
        },
      );
    }
  };

  const handleFileSelected = (val: ImageOrVideo) => {
    setFileSelected(val);
    handleChangeValue('photoUrl', val.path);
  };

  const handleLocation = (val: any) => {
    const items = {...eventData};
    items.position = val.postion;
    items.locationAddress = val.address;

    setEventData(items);
  };

  return (
    <ContainerCT isScroll>
      <SectionCT>
        <TextCT text="Add new" title />
      </SectionCT>
      <SectionCT>
        {eventData.photoUrl || fileSelected ? (
          <Image
            source={{uri: eventData.photoUrl}}
            style={{width: '100%', height: 250, marginBottom: 12}}
            resizeMode="cover"
          />
        ) : (
          <></>
        )}
        <ButtonImagePicker
          onSelect={(val: any) =>
            val.type === 'url'
              ? handleChangeValue('photoUrl', val.value as string)
              : handleFileSelected(val.value)
          }
        />

        <InputCT
          placeholder="Title"
          value={eventData.title}
          allowClear
          onChange={val => handleChangeValue('title', val)}
        />
        <InputCT
          placeholder="Description"
          multiline
          allowClear
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
        />

        <DropDownPicker
          selected={eventData.category}
          values={[
            {
              label: 'Sport',
              value: 'sport',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
        />

        <RowCT>
          <DateTimePicker
            label="Start at: "
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceCT width={20} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowCT>

        <DateTimePicker
          label="Date:"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />

        <DropDownPicker
          label="Invited users"
          values={usersSelects}
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          selected={eventData.users}
          multible
        />
        <InputCT
          placeholder="Title Address"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />
        <ChoiceLocation onSelect={val => handleLocation(val)} />
        <InputCT
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
      </SectionCT>

      {errorsMess.length > 0 && (
        <SectionCT>
          {errorsMess.map(mess => (
            <TextCT
              text={mess}
              key={mess}
              color={appColors.danger}
              styles={{marginBottom: 12}}
            />
          ))}
        </SectionCT>
      )}

      <SectionCT>
        <ButtonCT
          disable={errorsMess.length > 0}
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionCT>
    </ContainerCT>
  );
};

export default AddNewScreen;
