import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { scrollTo, useAnimatedReaction, useAnimatedRef, useSharedValue } from 'react-native-reanimated';
const iconDataSets = {
    set1: [
        { emoji: '🍕', color: '#FFE5CC' },
        { emoji: '🍔', color: '#F4D03F' },
        { emoji: '🍟', color: '#F8D7DA' },
        { emoji: '🌮', color: '#D5EDDA' },
        { emoji: '🍗', color: '#FADBD8' },
    ],
    set2: [
        { emoji: '🎮', color: '#D1ECF1' },
        { emoji: '🎧', color: '#E2E3E5' },
        { emoji: '☕', color: '#F4D03F' },
        { emoji: '🍿', color: '#FFE5CC' },
        { emoji: '🥤', color: '#F8D7DA' },
    ],
    set3: [
        { emoji: '🍰', color: '#FADBD8' },
        { emoji: '🍦', color: '#D1ECF1' },
        { emoji: '🍪', color: '#FFE5CC' },
        { emoji: '🎲', color: '#D5EDDA' },
        { emoji: '🕹️', color: '#E2E3E5' },
    ],
};
const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20; // pixels per second
const FRAME_RAME = 60;
const GAP = 10; // gap between items from styles

interface SmoothInfiniteScrollProps {
    scrollDirection?: 'up' | 'down';
    iconSet?: 'set1' | 'set2' | 'set3';
}

const SmoothInfiniteScroll = ({ scrollDirection = "down", iconSet = "set1" }: SmoothInfiniteScrollProps) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollY = useSharedValue(0)
    const iconData = iconDataSets[iconSet]
    const items = [...iconData, ...iconData]
    const totalContentHeight = iconData.length * ITEM_HEIGHT;
    useEffect(() => {
        if (scrollDirection === "up") {
            scrollY.value = totalContentHeight
        } else {
            scrollY.value = 0
        }
        const interval = setInterval(() => {
            const increment = (SCROLL_SPEED / FRAME_RAME) * (scrollDirection === "up" ? -1 : 1)
            scrollY.value += increment
        }, 1000 / FRAME_RAME)

        return () => { clearInterval(interval) }
    }, [scrollDirection, scrollY, totalContentHeight])

    // useAnimatedReaction(() => scrollY.value, (y) => {
    //     "worklet";
    //     scrollTo(scrollRef, 0, y, false)
    // })
    useAnimatedReaction(() => scrollY.value, (y) => {
        if (scrollDirection === "down") {
            if (y >= totalContentHeight) {
                scrollY.value = 0
                scrollTo(scrollRef, 0, 0, false)
            } else {
                scrollTo(scrollRef, 0, y, false)
            }
        } else {
            if (y <= 0) {
                scrollY.value = totalContentHeight
                scrollTo(scrollRef, 0, 0, false)
            } else {
                scrollTo(scrollRef, 0, y, false)
            }
        }
    })
    return (
        <Animated.ScrollView ref={scrollRef} scrollEnabled={false} showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            {items.map((item, index) => (
                <View key={index} style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
                </View>
            ))}
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        paddingVertical: 20
    },
    iconContainer: {
        width: 160,
        height: ITEM_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 5,
        // boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",//reactnative不支持boxshadow
        //ios平台表示阴影属性，4个参数分别是：阴影颜色、阴影透明度、阴影半径、阴影偏移量
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -2 },
        elevation: 3,//安卓平台表示阴影属性，只在reactnative上有效


    }
})

export default SmoothInfiniteScroll