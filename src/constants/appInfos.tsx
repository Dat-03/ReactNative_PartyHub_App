import {Dimensions} from 'react-native';

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
  BASE_URL: 'http://192.168.242.87:3000', // Change this to your own base url
  GOOGLE_MAP_API_KEY: 'AIzaSyBZcyZTOYFS551Zo9PMNx3X5LnFFFBfohc',
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};
