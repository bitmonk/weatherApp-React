import React from 'react';
import { Button, View, StyleSheet } from "react-native";

const Buttons = ({ title }) => {

    return (
        <View style={ styles.buttonWrapper }>
            <Button title={ title } />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop: 10,
    }
})

export default Buttons;
