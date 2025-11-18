import useUserStore from '@/hooks/use-userstore'
import { Stack } from 'expo-router'
import React from 'react'

const RootNav = () => {

    const { isGuest, user } = useUserStore()
    return (
        <Stack>
            {/* 路由守卫 */}
            <Stack.Protected guard={isGuest || user}  >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!isGuest && !user} >
                <Stack.Screen name="(public)" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    )
}

export default RootNav