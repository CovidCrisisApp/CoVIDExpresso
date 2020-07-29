import React, { Component } from 'react';
 
import { Linking, StyleSheet, Platform, View, ActivityIndicator, FlatList, Text, Image, Alert, YellowBox } from 'react-native';
 
export default class NewsUpdates extends Component {
 
 constructor(props) {
 
   super(props);
 
   this.state = {
 
     isLoading: true
 
   }
 
   YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
  ]);
 
 }
 
GetItem (flower_name) {
  
 Alert.alert(flower_name);
 
 }
 
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }
 
 webCall=()=>{
 
  return fetch('https://newsapi.org/v2/top-headlines?language=en&q=covid&sortBy=popularity&apiKey=469e8d0a97d2471ca3ca30ab52cb58cc')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
 
 }
 
 componentDidMount(){
 
  this.webCall();
 
 }
 
 render() {
 
   if (this.state.isLoading) {
     return (
 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
         <ActivityIndicator size="large" />
 
       </View>
       
     );
 
   }
 
   return (
 
     <View style={styles.MainContainer}>
 
       <FlatList
       
        data={ this.state.dataSource.articles }
        
        ItemSeparatorComponent = {this.FlatListItemSeparator}
 
        renderItem={({item}) => 
        
            <View style={{flex:1, flexDirection: 'row'}}>
    
              <Image source = {{ uri: item.urlToImage }} style={styles.imageView} />
            
              <Text onPress={ ()=>{ Linking.openURL(item.url)}} style={styles.textView} >{item.description}</Text>
 
            </View>
        
          }
 
        keyExtractor={(item, index) => index.toString()}
        
        />
 
     </View>
   );
 }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
 
imageView: {
 
    width: '50%',
    height: 100 ,
    margin: 7,
    borderRadius : 7
 
},
 
textView: {
 
    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
 
});