import { Fonts } from '@/constants/theme'
import { Stack } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

const Layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
            <Stack.Screen name='index' options={{
                headerTitle: 'Profile',
                headerLargeTitleStyle: {
                    fontFamily: Fonts.brandBold,
                    fontWeight: '900',
                    color: '#000',
                },
                ...(Platform.OS === "ios" && {
                    headerLargeTitle: true,
                    headerTransparent: true,
                })
            }} />
        </Stack>
    )
}

export default Layout