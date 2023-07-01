import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"

import { urlFor } from '../../sanity';

export default function RestaurantCard({ restaurant, imgUrl }){
    const navigation = useNavigation();

    return ( 
        <TouchableOpacity 
            className="bg-white mr-3 shadow" 
            onPress={() => {
                navigation.navigate("Restaurant", { restaurant, imgUrl })
            }}
        >
            <Image className="h-36 w-64 rounded-sm" source={{ uri: urlFor(imgUrl).url() }}/>
            <View className="px-3 pb-4"> 
                <Text className="font-bold text-lg pt-2">{restaurant.title}</Text>
                <View className="flex-row items-center space-x-1">
                    <FontAwesome name="star" size={22} opacity={0.5} color="green" />
                    <Text className="text-xs text-gray-500">
                        <Text className="text-green-500">{restaurant.rating}</Text> Rating
                    </Text>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Ionicons name="location-outline" size={22} color="gray" opacity={0.4}/>
                    <Text className="text-xs text-gray-500">Nearby : {restaurant.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });