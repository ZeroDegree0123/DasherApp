import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, TextInput, ScrollView  } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";

import * as SanityClient from "../../sanity"
import colors from "../config/colors";
import CategoryList from "../components/CategoryList";
import Featured from "../components/Featured"

export default function HomeScreen(props) {
    const [categories, setCategories] = useState()
    const [featuredCategories, setfeaturedCategories] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    useEffect(() => {
        const getFeatured = async function() {
            const data = await SanityClient.getFeaturedCategories()
            setfeaturedCategories(data);
        } 
        getFeatured();
        
        const getCategories = async function() {
            const data = await SanityClient.getAllCategories()
            setCategories(data);
        }
        getCategories()
    }, [])

    return (
        <SafeAreaView className="bg-white pt-5">
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image className="h-7 w-7 bg-gray-300 p-4 rounded-full" source={{ uri: "https://imgur.com/oCrhunl.png" }}/>
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        &nbsp;
                        <AntDesign name="downcircleo" size={20} color={colors.primary} />
                    </Text>
                </View>
                <MaterialCommunityIcons name="account-outline" size={35} color={colors.primary} />
            </View>
            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2">
                    <AntDesign name="search1" size={20} color="gray" />
                    <TextInput className="" placeholder="Restaurants and cuisines" keyboardType="default"/>
                </View>
                <Ionicons name="options-outline" size={25} color={colors.primary} />
            </View>
            
            {/* Body */}
            <ScrollView className="bg-gray-100" contentContainerStyle={{ paddingBottom: 100,}}>
                {/* categories component */}
                <CategoryList categories={categories}/>

                {/* featured component */}
                {featuredCategories?.map(category => (
                    <Featured 
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });
