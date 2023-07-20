import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";

export default function DeliveryScreen() {
  return (
    <View>
      <Text>DeliveryScreen</Text>
    </View>
  )
};

NativeWindStyleSheet.setOutput({
    default: "native",
});