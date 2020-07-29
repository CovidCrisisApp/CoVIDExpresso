import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Dimensions,View } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';

const screenWidth = Dimensions.get("window").width - 35;
import { StackedBarChart } from 'react-native-chart-kit';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NumberFormat from 'react-number-format';

const initialChartData = {
    labels: [],
    data: [],
    barColors: ["#dfe4ea", "#ced6e0"]
}
const CovidCases = (props) => {

    const [casesData, setCasesData] = useState([]);
    const [chartData, setChartData] = useState(initialChartData);

    useEffect(() => {
        getDatas();
    }, [])

    useEffect(() => {
        getChartDatas();
    }, [casesData])

    const getChartDatas = () => {
        const sortedCasesData = casesData.sort((a, b) => (a.totalConfirmed < b.totalConfirmed) ? 1 : -1)
        const labels = [];
        const legend = ["Confirmed", "Deaths"];
        const colors = ["blue", "red"];
        const datas = [];
        if (casesData.length > 0) {


            for (var i = 0; i < 3; i++) {
                const data = sortedCasesData[i];
                labels.push(data.country);
                datas.push([data.totalConfirmed, data.totalDeaths]);
            }
            setChartData({
                labels: labels,
                data: datas,
                legend:["Confirmed","Deaths"],
                barColors: colors
            })
        }
    }

    const getDatas = () => {
        fetch(`http://api.coronatracker.com/v3/stats/worldometer/country`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                const rescon = response.json();
                rescon.then((json) => {
                    setCasesData(json);
                })

            }
        }).catch(ex => {
            setCasesData(ex)
        })
    }



    const renderData = (itemData) => {
        return (
            <Card>
                <CardItem header bordered>
                    <Text style={styles.headerStyle}>{itemData.item.country}</Text>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>Total Cases: {itemData.item.totalConfirmed}</Text>
                        <Text>Active Cases: {itemData.item.activeCases}</Text>
                        <Text>Recovered Cases: {itemData.item.totalRecovered}</Text>
                        <Text>Fatel Cases: {itemData.item.totalDeaths}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }

    return (
        <View>
        <Card>
        <CardItem header>
            <Text style={styles.headerStyle}>Top 3 Countries</Text>
        </CardItem>
       <CardItem >
            <Body>
            <StackedBarChart data={chartData} chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => "black",
            strokeWidth: 2, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false, // optional
            propsForLabels:{
                fontSize:14,
                fontWeight: 700,
                wordSpacing: 0,
            },
            
            
            
        }}
            style={{
                borderRadius: 0,
                alignContent:"center",
                justifyContent:"space-around"
            }} width={screenWidth} height={220} barPercentage={0} decimalPlaces={0} hideLegend={true}  yLabelsOffset={-7}  />
            </Body>
       </CardItem>
        

</Card>

        <FlatList keyExtractor={(item, index) => item.countryCode} data={casesData} renderItem={renderData} />
       
</View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        fontWeight: "bold"
    }
})

export default CovidCases;