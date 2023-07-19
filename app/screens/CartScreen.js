import React, { useState, useMemo } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View , Image, ScrollView} from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import { removeFromCart, selectCartItems } from '../../features/cartSlice';
import { selectRestaurant } from '../../features/restaurantSlice';
import { urlFor } from '../../sanity';
import colors from '../config/colors';

export default function CartScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectCartItems);
  const [groupItems, setGroupItems] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {})
    setGroupItems(groupItems)

  }, [items]);

  // console.log(groupItems)
  // console.log(restaurant.restaurant.name)
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">

          <View>
            <Text className="text-lg font-bold text-center">Cart</Text>
            <Text className="text-center text-gray-400">{restaurant.restaurant.name}</Text>
          </View>

            <TouchableOpacity
              className="rounded-full bg-gray-100 absolute top-3 right-5"
              onPress={navigation.goBack}>
              <Entypo name="circle-with-cross" size={28} color={colors.primary} />
            </TouchableOpacity>

        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image className="h-7 w-7 bg-gray-300 p-4 rounded-full" source={{uri: "https://imgur.com/oCrhunl.png"}}/>
          <Text className="flex-1">Deliver in 30-45 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(groupItems).map(([key, items]) => (
            <View key= {key}>
              <Text>{items.length} x</Text>
              <Image className="h-12 w-12 rounded-full" source={{ uri: urlFor(items[0]?.image).url()}}/>
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">${items[0]?.price}.00</Text>
              <TouchableOpacity>
                <Text className="text-[#00CCBB] text-xs" onPress={() => dispatch(removeFromCart({ id: key }))}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });
