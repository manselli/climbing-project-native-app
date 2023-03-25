import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { serverUrl } from "../../App";


const GuidePage = () => {
    const [regions, setRegions] = useState<Region[]>([])
    const [crags, setCrags] = useState<Crag[]>([])
    useEffect(() => {
        loadGuideData()
    }, [])

    const loadGuideData = async () => {
        try {
            console.log('loading guide data')
            const data = await AsyncStorage.getItem('regions')
            const cragData = await AsyncStorage.getItem('crags')
            if (data === null) {
                console.log('region not found fetching from server')
                const response = (await axios.get(`${serverUrl}/regions`)).data as Region[]
                await AsyncStorage.setItem('regions', JSON.stringify(response))
                setRegions(response)
            } else {
                console.log('regions found locally')
                setRegions(JSON.parse(data) as Region[])
            }
            if (cragData === null) {
                console.log('crags not found fetching from server')
                const response = (await axios.get(`${serverUrl}/crags`)).data as Crag[]
                await AsyncStorage.setItem('crags', JSON.stringify(response))
                setCrags(response)
            } else {
                console.log('crags found locally')
                setCrags(JSON.parse(cragData) as Crag[])
            }
            console.log('all done')
        }
        catch (err) {
            console.log(err)
        }

    }

    console.log(`got ${regions.length} regions and ${crags.length} crags`)
    return (
        <View>
            <Text>GUIDE PAGE COMPONENT</Text>
            {regions.map((elm) => {
                return (
                    <Text>{elm.regionName}</Text>
                )
            })}
        </View>
    )
}

export default GuidePage


const styles = StyleSheet.create({
    listText: {
        color: 'black'
    }
});


type Region = {
    _id: string,
    regionName: string
    nationId: string
}

type Crag = {
    _id: string,
    cragName: string,
    regionId: string,
    position?: {
        lat: number,
        lon: number
    },
    geo?: {
        type: string,
        coordinates: number[]
    }
    description?: string
}