import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../features/cartSlice';


export default function CartIcon(props) {
    const items = useSelector(selectCartItems)
    const navigation = useNavigation();
    const cartTotal = useSelector(selectCartTotal)

    return (
       <View className="absolute bottom-10 w-full z-50">
        <TouchableOpacity 
          className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
          onPress={() => navigation.navigate("Cart")}
        >
          <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{items.length}</Text>
          <Text className="flex-1 text-white font-extrabold text-lg text-center">View Cart</Text>
          <Text className="text-lg text-white font-extrabold">${cartTotal}</Text>
        </TouchableOpacity>
       </View>
    );
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });
