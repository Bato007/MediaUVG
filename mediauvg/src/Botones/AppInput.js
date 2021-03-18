import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function AppInput({
    onChange,
    iconName,
    placeholder,
    maxLength,
    isSecured
}){
    const [written, setWritten] = useState('');
    const [focusColor, setFocusColor] = useState('gray');

    const handleChange = (text) => {
        setWritten(text);
        onChange(text);
    }

    return(
        <View style = {{
            borderRadius: 15,
            borderColor: focusColor,
            borderWidth: 1,
            flexDirection: 'row',
            margin: 10
        }}>
            <FontAwesome 
                name = {iconName} 
                size={30} 
                color={focusColor}
                style = {{
                    margin: 15
                }} />
            <TextInput 
                onBlur = { () =>  setFocusColor('black')}
                onFocus = { () => setFocusColor(rgba(73, 133, 245, 0.8)) }
                style = {{
                    width: 200,
                    padding:  10,
                    margin: 20 ,
                    outline: none,
                    border: none,
                }}
                defaultValue = {written}
                onChangeText = {handleChange}
                placeholder = {placeholder}
                maxLength = {maxLength}
                secureTextEntry = {isSecured} >
            </TextInput>
        </View>
    );
}