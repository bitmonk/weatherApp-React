import { useState } from "react";
import { Alert, Text, Touchable } from "react-native";
import { Button, TouchableOpacity, TextInput, View, StyleSheet } from "react-native";
import Buttons from "./Buttons";

export default function Home({ navigation }) {

    const [count, setCount] = useState(0);
    const [email, setEmail] = useState("");

    const handleRegister = () => {
        Alert.alert("Register ?", "Really, Are you sure ?", [
            {
                text: "Cancel", onPress: () => console.log("Cancelled !"),
            },
            {
                text: "Proceed", onPress: () => console.log("Processing...")
            }
        ])
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>Count: { count }</Text>
            <View style={ { marginBottom: 10 } }>
                <Button title="Increase" color="green" onPress={ () => setCount(count + 1) } />
            </View>
            <Button title="Decrease" onPress={ () => setCount(count - 1) } />
            <TextInput
                onChangeText={ (text) => setEmail(text) }
                placeholder="Enter Your Email"
                style={ { padding: 20 } }
            />

            <Text>{ email }</Text>
            <Button title="Register" onPress={ handleRegister } />
            <Buttons title="Login" />
            <Buttons title="Logout" />
            <Button title="About Page" onPress={ () => navigation.navigate("About", { name: "parbat tamang", age: 21 }) } />
            <Button title="Blogs Page" onPress={ () => navigation.navigate("Blogs") } />

            <TouchableOpacity style={ styles.touchable } onPress={ () => alert("Register pressed") }>
                <Text style={ { fontSize: 24, textAlign: 'center' } }>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 56,
    },
    touchable: {
        backgroundColor: "red",
        width: 150,
        height: 30,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
