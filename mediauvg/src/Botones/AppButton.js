import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function AppButton({
    onPress,
    text  
}){

    return(
        <TouchableOpacity 
        onPress = {onPress}
        style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
        display: 'flex',
        height: 50,
        width: 350,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'yellowgreen',
        marginVertical: 10,
        marginHorizontal: 5,
    },
    appButtonText: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    }
});