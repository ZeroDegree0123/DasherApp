import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';

import * as SanityClient from "../../sanity"
import colors from '../config/colors';
import RestaurantCard from './RestaurantCard';

export default function Featured({description, id, title}) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => { 
    const getFeaturedRestaurants = async function() {
      const data = await SanityClient.getRestaurants(id);
      setRestaurants(data?.restaurants);
    };
    getFeaturedRestaurants();
  }, [id])


  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold">{title}</Text>
        <EvilIcons name="arrow-right" size={24} color={colors.primary} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView className="pt-4" horizontal contentContainerStyle={{ paddingHorizontal: 15 }} showsHorizontalScrollIndicator={false}>
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            address={restaurant.address}
            dishes={restaurant.dishes}
            genre={restaurant.genre}
            imgUrl={restaurant.image}
            long={restaurant.long}
            lat={restaurant.lat}
            rating={restaurant.rating}
            short_description={restaurant.short_description}
            title={restaurant.name}
            restaurant={restaurant}
          />
        ))}
      </ScrollView>
    </View>
  )
}
