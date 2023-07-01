import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';

import { urlFor } from '../../sanity';
import { addToCart, removeFromCart, selectCartItemsWithId } from '../../features/cartSlice';
import colors from '../config/colors';


export default function DishRow({id, name, description, price, image}) {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectCartItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemsToCart = () => {
        dispatch(addToCart({id, name, description, price, image}));
    }

    console.log(items)
    return (
        <>
            <TouchableOpacity 
                onPress={() => setIsPressed(!isPressed)} 
                className={`bg-white border p-4 border-gray-200 ${isPressed && "border-0"}`}
            >
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400">${price}</Text>
                    </View>
                    <View>
                        <Image style={{borderWidth: 1, borderColor: "#F3F3F4"}} className="h-20 w-20 bg-gray-300 p-4" source={{ uri: urlFor(image).url()}}/>
                    </View>
                </View>
            </TouchableOpacity> 
            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row items-center space-x-2 pb-3">
                        <TouchableOpacity onPress={removeFromCart}>
                            <AntDesign name="minuscircleo" size={24} color={colors.primary} />
                        </TouchableOpacity>

                        <Text>{items.length}</Text>

                        <TouchableOpacity onPress={addItemsToCart}>
                            <AntDesign name="pluscircleo" size={24} color={colors.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
};

NativeWindStyleSheet.setOutput({
    default: "native",
  });
