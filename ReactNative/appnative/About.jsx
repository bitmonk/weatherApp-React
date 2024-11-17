import { View, Text } from 'react-native'
import React from 'react'

const About = ({ route }) => {
    console.log(route);
    const { name, age } = route.params
    return (
        <View>
            <Text>This is { name }</Text>
            <Text>aGE IS { age }</Text>
        </View>
    )
}

export default About
