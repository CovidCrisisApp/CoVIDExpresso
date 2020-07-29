import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CovidCases from '../screens/CovidCases';
import ChatScreen from '../screens/ChatScreen';
import NewsUpdate from '../screens/NewsUpdates';
import Colors from '../constants/Colors';
import EconomyScreen from '../screens/EconomyScreen';

const CrisisAppNaviator = (props) => {

    const Stack = createStackNavigator();
    
    return(
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: Colors.primaryColor}, headerTintColor: 'white', headerTitle: 'CoVIDExpresso'}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CovidCases" component={CovidCases} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="NewsUpdates" component={NewsUpdate} />
        <Stack.Screen name="Economy" component={EconomyScreen} />
    </Stack.Navigator>
    )
}

export default CrisisAppNaviator