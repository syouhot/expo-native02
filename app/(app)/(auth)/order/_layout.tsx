import { Colors } from '@/constants/theme'
import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: Colors.background,
                }
            }} />
            <Stack.Screen name='checkout' options={{
                title: "",
                headerBackButtonDisplayMode: 'minimal',
                contentStyle: {
                    backgroundColor: Colors.background,
                }
            }} />
        </Stack>
    )
}

export default Layout
