import React, { useState, useMemo } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../features/cartSlice';
import { selectRestaurant } from '../../features/restaurantSlice';

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

  console.log(groupItems)
  return (
    <SafeAreaView>
      <View>
        
        <View>

          <View>

            <Text className="text-lg font-bold text-center">Cart</Text>
            <Text className="text-center text-gray-400">{restaurant.name}</Text>
          </View>

        </View>

      </View>
    </SafeAreaView>
  )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });
