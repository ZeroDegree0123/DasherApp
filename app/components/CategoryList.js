import React from 'react';
import { ScrollView } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";

import { urlFor } from '../../sanity';
import CategoryCard from './CategoryCard';


export default function CategoryList({ categories }) {
    let allCategories;

    const filterUndefined = () => {
        if (categories !== undefined) {
            allCategories = categories.map((category, id) => 
                <CategoryCard 
                    key={id}
                    category={category}
                    imgUrl={category.image}
                /> 
            );
        }
        return allCategories;
    }
    filterUndefined();
    // console.log(categories)

    return (
        <ScrollView 
            horizontal 
            contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10, }} 
            showsHorizontalScrollIndicator={false} 
        >
            {allCategories}
        </ScrollView>
    );
}

NativeWindStyleSheet.setOutput({
    default: "native",
  });
