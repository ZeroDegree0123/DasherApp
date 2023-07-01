import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";

import { urlFor } from '../../sanity';

export default function CategoryCard({ category, imgUrl }) {
    return (
       <TouchableOpacity className="relative mr-2">
            <Image className="h-20 w-20 rounded" source={{ uri: urlFor(imgUrl).url() }}/>
            <Text className="absolute bottom-1 left-1 font-bold" style={{ color: "#fff" }}>{category.title}</Text>
       </TouchableOpacity>
    );
} 


NativeWindStyleSheet.setOutput({
    default: "native",
  });
