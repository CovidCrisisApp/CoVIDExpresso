import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions,View } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import * as data from '../data/Economy.json';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Colors from '../constants/Colors';
const screenWidth = Dimensions.get("window").width - 35;
const initialChartData = {
    labels: [],
    datasets:[{
        data:[]
    }]
}
const EconomyScreen = (props) => {
  
    return (
        <View>
        <Card>
        <CardItem header>
            <Text style={styles.headerStyle}>GDP Growth</Text>
        </CardItem>
       <CardItem >
            <Body>
            <LineChart
    data={data.gdpGrowth}
    width={screenWidth} // from react-native
    height={220}
    yAxisSuffix="%"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: Colors.primaryColor,
      
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  <BarChart
  style={{
    marginVertical: 8,
    borderRadius: 16
  }}
  data={data.annualChange}
  width={screenWidth}
  height={220}
  chartConfig={{
    backgroundColor: Colors.primaryColor,
    
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  }}
  verticalLabelRotation={30}
/>
            </Body>
       </CardItem>
        

</Card>
</View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        fontWeight: "bold"
    }
})

export default EconomyScreen;