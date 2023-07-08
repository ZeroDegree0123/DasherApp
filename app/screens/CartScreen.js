import React from 'react'
import { Text, View } from 'react-native'
import { NativeWindStyleSheet } from "nativewind";

export default function CartScreen() {
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });
