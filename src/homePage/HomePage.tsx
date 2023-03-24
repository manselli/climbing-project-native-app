import { Dimensions, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { serverUrl } from "../../App";



function Map() {
    const geo = Geolocation.toString()
    console.log(geo)
    const [mapData, setMapData] = useState<CragsData[]>([])
    useEffect(() => {
        console.log('loading data')
        loadMapData()

    }, [])

    const loadMapData = async () => {
        try {
            const data = await AsyncStorage.getItem('mapData')
            if (data === null) {
                console.log('fetching data from server')
                const response = (await axios.get(`${serverUrl}/crags/maps`)).data as any as object[] as CragsData[]
                await AsyncStorage.setItem('mapData', JSON.stringify(response))
                setMapData(response)
            } else {
                console.log('data found locally')
                setMapData(JSON.parse(data) as CragsData[])
            }
        }
        catch (err) {
            console.log(err)
        }

    }


    const region = {
        latitude: 43.11,
        longitude: 12.39,
        latitudeDelta: 5,
        longitudeDelta: 3
    };
    console.log(`mapdata length: ${mapData.length}`)

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                scrollEnabled={true}
            >
                {mapData.map(elm => {
                    console.log(`showing ${elm.cragName}`)
                    return (
                        <Marker
                            title={elm.cragName}
                            coordinate={{ latitude: elm.position.lat, longitude: elm.position.lon }}
                            key={elm._id}>

                        </Marker>
                    )
                })}
            </MapView>
        </View >
    );
}



const HomePage = () => {
    return (
        <View style={styles.mainConatiner}>
            <Text>HOME PAGE COMPONENT</Text>
            <Map />
        </View>
    )
}


const styles = StyleSheet.create({
    mainConatiner: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    map: {
        width: Dimensions.get("window").width,
        height: "90%"
    },
});


type CragsData = {
    _id: string,
    cragName: string,
    regionId: string,
    position: {
        lat: number,
        lon: number
    },
    geo: {
        type: string,
        coordinates: number[]
    }
    description?: string
}



export default HomePage