import React, { useLayoutEffect } from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation, useRoute } from "@react-navigation/native"
import { Ionicons, AntDesign, FontAwesome, EvilIcons } from '@expo/vector-icons';

import { urlFor } from '../../sanity';
import colors from '../config/colors';
import DishRow from '../components/DishRow';

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const { params: {restaurant, imgUrl} } = useRoute();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  return (
    <ScrollView>
      
      <View className="relative">
        <Image className="w-full h-56 bg-gray-300 p-4" source={{ uri: urlFor(imgUrl).url(), }}/>
        <TouchableOpacity className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full" onPress={navigation.goBack}>
        <AntDesign name="arrowleft" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View className="bg-white px-4 pt-4">
        <Text className="text-3xl font-bold">{restaurant.name}</Text>
        <View className="flex-row space-x-2 my-1">
          <View className="flex-row items-center space-x-1">
            <FontAwesome name="star" size={22} opacity={0.5} color="green" />
            <Text className="text-xs text-gray-500"><Text className="text-green-500">{restaurant.rating}</Text> Rating</Text>
          </View>
          <View className="flex-row items-center space-x-1">
              <Ionicons name="location-outline" size={22} color="gray" opacity={0.4}/>
              <Text className="text-xs text-gray-500">Nearby : {restaurant.address}</Text>
          </View>
        </View>
        <Text className="text-gray-500 mt-2 pb-2">{restaurant.short_description}</Text>
      </View>

      <TouchableOpacity className="flex-row items-center bg-white space-x-2 p-4 border-y border-gray-300">
        <AntDesign name="questioncircleo" size={20} opacity={0.6} color="black" />
        <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
        <EvilIcons name="arrow-right" size={24} color={colors.primary} />
      </TouchableOpacity>

      <View>
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">MENU</Text>

        {/* Dishes */}
        {restaurant.dishes.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </View>

    </ScrollView>
  )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });