import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Switch, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { serverUrl } from "../../App";



function Map() {
    const [location, setLocation] = useState<number[]>([])
    const [mapData, setMapData] = useState<CragsData[]>([])
    const [showCragMarker, setShowCragMarker] = useState(true)
    useEffect(() => {
        console.log('loading data')
        loadMapData()
        getLocation()

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

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.log('Please grant location permission')
        } else {
            const pos = await Location.getCurrentPositionAsync()
            console.log(pos)
            setLocation([pos.coords.latitude, pos.coords.longitude])
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
            <Text>Show Crags:</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={showCragMarker ? '#089ba6' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={ev => setShowCragMarker(!showCragMarker)}
                value={showCragMarker}
            />
            <MapView
                style={styles.map}
                initialRegion={region}
                scrollEnabled={true}
            >
                {showCragMarker ? mapData.map(elm => {
                    // console.log(`showing ${elm.cragName}`)
                    return (
                        <Marker
                            title={elm.cragName}
                            coordinate={{ latitude: elm.position.lat, longitude: elm.position.lon }}
                            key={elm._id}>

                        </Marker>
                    )
                }) : <></>}
                {location.length > 0 ?
                    <Marker
                        title="user Location"
                        coordinate={{ latitude: location[0], longitude: location[1] }}>
                        <Image source={require('./../../assets/bluedot.png')} style={{ height: 18, width: 18 }} />
                    </Marker> : <></>}
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