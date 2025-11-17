import { Stack } from 'expo-router'
import React from 'react'

const RootNav = () => {
    return (
        <Stack>
            <Stack.Screen name="(public)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default RootNav