import React, { useState, useMemo } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View , Image, ScrollView} from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import { removeFromCart, selectCartItems, selectCartTotal } from '../../features/cartSlice';
import { selectRestaurant } from '../../features/restaurantSlice';
import { urlFor } from '../../sanity';
import colors from '../config/colors';

export default function CartScreen() {
  const [groupItems, setGroupItems] = useState([]);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
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

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupItems).map(([key, items]) => (
            <View className="flex-row items-center space-x-3 bg-white py-2 px-5" key={key}>
              <Text style={{color: colors.primary}}>{items.length} x</Text>
              <Image className="h-12 w-12 rounded-full" source={{ uri: urlFor(items[0]?.image).url()}}/>
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">${items[0]?.price}.00</Text>
              <TouchableOpacity>
                <Text className="text-[#00CCBB] text-xs" onPress={() => dispatch(removeFromCart({ id: key }))}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400 ">Subtotal</Text>
            <Text className="text-gray-400 ">${cartTotal}.00</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400 ">Delivery Fee</Text>
            <Text className="text-gray-400 ">$5.99</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">${cartTotal + 5.99}</Text>
          </View>
        </View>


        <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4 mx-4" onPress={() => navigation.navigate("LoadingOrder")}>
          <Text className="text-center text-white text-lg font-bold">Place Order</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });
