import React, {useEffect} from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

// GO BACK AND TRY TO USE REACT NATIVES DEFAULT EXPO ANIMATIONS
export default function LoadingOrderScreen() {
    const navigation = useNavigation()

    useEffect(()=> {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 4000)
    }, [])

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#00CCBB]">
        <Animatable.Image 
            source={require("../../assets/anotherLoadingGif.gif")}
            animation="slideInUp"
            iterationCount={1}
            className="h-72 w-72 rounded-full"
        />
        <Animatable.Text
            animation="slideInUp"
            iterationCount={1}
            className="text-lg my-10 mx-4 text-white font-bold text-center"
        >
            Waiting for Restaurant to accept your order!
        </Animatable.Text>

        <Progress.Bar size={50} indeterminate={true} color='white'/>

    </SafeAreaView>
  )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });