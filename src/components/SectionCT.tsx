import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles';

interface Props {
    children: React.ReactNode;
    styles?: StyleProp<ViewStyle>;
}

const SectionCT = (props : Props) => {
    const { children, styles } = props;
  return (
    <View style={[globalStyles.section,styles]}>
      {children}
    </View>
  )
}

export default SectionCT