import React from 'react';
import { SafeAreaView, Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from "react-native-maps"
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';


import { selectRestaurant } from '../../features/restaurantSlice';
import colors from '../config/colors';

export default function DeliveryScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Entypo name="circle-with-cross" size={28} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-md">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image className="h-16 w-16" source={{ uri: "https://imgur.com/I8hOCAL.png" }}/>
          </View>

            <Progress.Bar size={30} indeterminate={true} color="#00CCBB"/>

            <Text className="mt-3 text-gray-500">Your order at {restaurant.restaurant.name} is being prepared</Text>

        </View>
      </SafeAreaView>

      <MapView>

      </MapView>

    </View>
  )
};

NativeWindStyleSheet.setOutput({
    default: "native",
});