import { Stack } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

const Layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
            <Stack.Screen name='index' options={{
                title: "Profile", 
                headerShown: false,
                ...(Platform.OS === "ios" && {
                    headerLargeTitle: true,
                    headerTransparent: true,
                })
            }} />
        </Stack>
    )
}

export default Layout