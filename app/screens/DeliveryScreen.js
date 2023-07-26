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

      <MapView
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
        initialRegion={{
          latitude: restaurant.restaurant.lat,
          longitude: restaurant.restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}  
      >
        <Marker
          coordinate={{
            latitude: restaurant.restaurant.lat,
            longitude: restaurant.restaurant.long
          }}
          title={restaurant.restaurant.name}
          description={restaurant.restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5" source={{ uri: "https://imgur.com/oCrhunl.png"}}/>
        <View className="flex-1">
          <Text className="text-lg">Mark Fisher</Text>
          <Text className="text-gray-400">Your Driver</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  )
};

NativeWindStyleSheet.setOutput({
    default: "native",
});