import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import CrisisAppNaviator from './navigation/AppNavigator';
export default function App(){
  return(
    <NavigationContainer>
      <CrisisAppNaviator />
    </NavigationContainer>
  )
}