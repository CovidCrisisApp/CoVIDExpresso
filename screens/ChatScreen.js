import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardItem, Content, Text, Button, Form, Grid, Row, Col, Item, Label, Input, View } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import UUIDGenerator from 'react-native-uuid-generator';
import Spinner from 'react-native-loading-spinner-overlay';
const ChatScreen = (props) => {

   
    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const onSend = useCallback((messages = []) => {
        console.log(messages);
        setChatList(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log("callback*************"+props.route.params);
        fetchAndAppendData(messages[0].text)

    }, [])

    const fetchAndAppendData = (text) => {
        setLoading(true);        
        console.log("another*********"+props.route.params)
        var postBody = {
            session_id: props.route.params,
            input: { message_type: 'text', text: text }
        }
        console.log("******************", postBody)
        fetch(`http://covid-assistant-simple-sowmiya.eu-gb.mybluemix.net/api/message`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postBody)

        }).then((response) => {
            if (response.ok) {

                const resdata = response.json();
                resdata.then((json) => {
                    var messageStr = "";
                    for (var i = 0; i < json.result.output.generic.length; i++) {
                        messageStr = messageStr + " " + json.result.output.generic[i].text;
                    }
                    console.log("test message" + messageStr)
                    UUIDGenerator.getRandomUUID((uuid) => {
                        var messageResponseObj = [{
                            _id: uuid,
                            text: messageStr,
                            createdAt: new Date(),
                            user: {
                                _id: 2,
                                name: 'Assitant',
                                avatar: 'https://placeimg.com/140/140/tech'
                            }
                        }]
                        setLoading(false);
                        console.log(messageResponseObj)
                        setChatList(previousMessages => GiftedChat.append(previousMessages, messageResponseObj))
                    })

                })
            }else{
                console.log(response)
                setLoading(false)
            }
        })
    }


    return (
        loading?
       <View>
             <Spinner visible={loading} textContent={'Thinking....'} />
             </View>:
        <GiftedChat messages={chatList} onSend={messages => onSend(messages)} user={{ _id: 1, }} />
       
    )
}

export default ChatScreen;