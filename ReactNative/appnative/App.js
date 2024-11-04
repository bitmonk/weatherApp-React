import { useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native";
import Buttons from "./Buttons";

export default function App(){

    const [count, setCount] = useState(0);
    const [email, setEmail] = useState("")

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Count : {count}</Text>
            <View style={{marginBottom : 10}}>
            <Button title="Increase" color='green' onPress={()=> setCount(count + 1)}/>
            </View>
            <Button title="Decrease" onPress={()=> setCount(count - 1)}/>
            <TextInput onChangeText={(text)=> setEmail(text)} placeholder="Enter Your Email" style={{ padding : 20 }}/>

            <Text>{email}</Text>
            <Buttons title="Register" />
            <Buttons title="Login"/>
            <Buttons title="Logout"/>

            <TouchableOpacity style={styles.touchable}>
            <Text style={{fontSize : 24, textAlign : 'center'}}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : "center",
      alignItems : "center"
    },
    text : {
        fontSize : 56
    },

    touchable : {
        backgroundColor : "red",
        width : 150,
        height : 30,
        marginTop : 10
        }

})
