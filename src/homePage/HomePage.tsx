import { Dimensions, StyleSheet, Text, View } from "react-native";

import React from 'react';
import MapView from 'react-native-maps';

function Map() {


    const region = {
        latitude: 43.11,
        longitude: 12.39,
        latitudeDelta: 5,
        longitudeDelta: 3
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                scrollEnabled={true}
            />
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




export default HomePage