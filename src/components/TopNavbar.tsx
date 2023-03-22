import { StyleSheet, Text, View } from "react-native"


const TopNavbar = () => {


    return (
        <View style={style.container}>
            <Text style={style.textField}> I'm the top navbar blah blah blah</Text>
        </View>)

}

export default TopNavbar


const style = StyleSheet.create({
    container: {
        backgroundColor: '#0f0f0f',
        color: 'white',
        position: 'absolute'
    },
    textField: {
        color: 'white'
    }
})