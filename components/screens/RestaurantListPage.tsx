import { Fonts } from '@/constants/theme'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CategoryList from '../CategoryList'
import ResaturantHeader from '../ResaturantHeader'
import RestaurantList from '../RestaurantList'

const RestaurantListPage = () => {
  const insets = useSafeAreaInsets()
  const scrollOffset = useSharedValue(0)
  const scrollHeader = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y
    }
  })
  return (
    <View style={styles.container}>
      <ResaturantHeader title="Restaurants" scrollOffset={scrollOffset} />
      <Animated.ScrollView showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 60 }}
        onScroll={scrollHeader}
        scrollEventThrottle={16}>
        <Text style={styles.pageTitle}>Restaurants</Text>
        <CategoryList />
        <Text style={styles.allRestaurantTitle}>All restaurant</Text>
        <RestaurantList />
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 30,
    marginBottom: 16,
    paddingHorizontal: 16
  },
  allRestaurantTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginBottom: 8,
    paddingHorizontal: 16

  }
})

export default RestaurantListPage