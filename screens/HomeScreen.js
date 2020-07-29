import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import { HOME_MENUS } from '../data/HomeMenuData';
import Colors from '../constants/Colors';
import MenuGridTitle from '../components/MenuGridTitle';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = props => {

    const [sessionId, setSessionId] = useState('');
    const [loading, setLoading] = useState(false);
     useEffect(()=>{
         setLoading(true);
        fetch(`http://covid-assistant-simple-sowmiya.eu-gb.mybluemix.net/api/session`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                const resjson = response.json();
                resjson.then((json) => {
                    console.log(json.result.session_id)
                    setSessionId(json.result.session_id)
                    var postBody = {
                        session_id: json.result.session_id,
                        input: { message_type: 'text', text: "" }
                    }
                    fetch(`http://covid-assistant-simple-sowmiya.eu-gb.mybluemix.net/api/message`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(postBody)
            
                    }).then((response) => {
                        if (response.ok) {
                          setLoading(false);    
                        }
                    })
                })
            } 
        })
     },[])

    const renderItem = (itemData) => {
        return (
           <MenuGridTitle title={itemData.item.title} color={itemData.item.color} onSelect={()=>{
            props.navigation.navigate(itemData.item.routerPath,sessionId)
           }} />
        )
    }

    return (
loading?<Spinner visible={loading} textContent={'Loading...'} />:
        <FlatList data={HOME_MENUS} numColumns={1} renderItem={renderItem} />
    )
}

HomeScreen.navigationOptions = {
    headerTitle: 'Covid-19-Crisis'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})

export default HomeScreen;