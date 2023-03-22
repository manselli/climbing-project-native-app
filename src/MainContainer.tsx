import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import GuidePage from "./guide/GuidePage";
import HomePage from "./homePage/HomePage";
import SearchPage from "./search/SearchPage";

//screen names
const homeName = 'Home';
const guideName = 'Guide';
const searchName = 'Search';


const Tab = createBottomTabNavigator()


const MainContainer = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = '';
                        let rn = route.name

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === guideName) {
                            iconName = focused ? 'book' : 'book-outline'
                        } else if (rn === searchName) {
                            iconName = focused ? 'search' : 'search-outline'
                        }

                        return <Ionicons name={iconName} />
                    }

                })}
            >

                <Tab.Screen name={homeName} component={HomePage} />
                <Tab.Screen name={guideName} component={GuidePage} />
                <Tab.Screen name={searchName} component={SearchPage} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer