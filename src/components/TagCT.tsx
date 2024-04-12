import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';
import RowCT from './RowCT';
interface Props {
  icon?: ReactNode;
  title: string;
  isFill?: boolean;
  color?: string;
}
const TagCT = (props: Props) => {
  const {icon, title, isFill, color} = props;
  return <RowCT>{icon && icon}</RowCT>;
};

export default TagCT;
