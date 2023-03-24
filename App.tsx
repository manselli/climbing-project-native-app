import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect } from 'react';
import MainContainer from './src/MainContainer';

export const serverUrl = 'https://g0en7qmppb.execute-api.us-east-1.amazonaws.com/'
export let data: MainAppData[] = []

export default function App() {

  useEffect(() => {

    console.log('loading data')
    loadData()
  }, [])

  const loadData = async () => {
    await loadMainData()
  }

  return (
    <MainContainer />
  );
}




export const loadMainData = async () => {
  try {
    const test = await AsyncStorage.getItem('mainAppData')
    if (test === null) {
      console.log('main data not found i need to download it from server..')
      const response = (await axios.get(`${serverUrl}/nations/unusedId`, { timeout: 30 * 1000 })).data as any as object[] as MainAppData[]
      console.log('..server responded!!')
      await AsyncStorage.setItem('mainAppData', JSON.stringify(response))
      console.log('..data loaded from server!!')
      return response
    } else {
      console.log('data was loaded locally ')
      return JSON.parse(test) as MainAppData[]
    }
  }
  catch (err) {
    console.log(err)

  }
}

export type Crag = {
  cragName: string,
  regionId: string,
  position?: {
    lat: number,
    lon: number
  },
  description?: string,
}

export type Sector = {
  sectorName: string,
  cragId: string
  description?: string,
  sectorSeason?: {
    spring: boolean,
    summer: boolean,
    autumn: boolean,
    winter: boolean
  },
}

export type Route = {
  cragId: string,
  sectorId?: string
  routeName: string,
  grade: string,
  suggestedGrade?: string,
  routeNote?: string,
  CBIndex?: number
}

export type MainAppData = {
  _id: string,
  regionName: string
  nationId: string,
  crags: (Crag & {
    sectors: (Sector & {
      routes: Route[]
    })[]
  })[]
}