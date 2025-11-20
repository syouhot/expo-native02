import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Layout() {
    const router = useRouter()
    return (
        <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='(modal)/map' options={{ headerShown: false }} />
            <Stack.Screen
                name='(modal)/location'
                options={{
                    presentation: "formSheet",
                    title: "",
                    sheetAllowedDetents: [0.7],
                    sheetCornerRadius: 16,
                    sheetGrabberVisible: true,
                    headerShadowVisible: false,
                    //安卓这里没有显示出来
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ padding: 4, borderRadius: 20, backgroundColor: Colors.light }}
                            onPress={() => router.dismiss()}
                        >
                            <Ionicons name="close-sharp" size={24} />
                        </TouchableOpacity>
                    ),
                }} />
            <Stack.Screen
                name='(modal)/filter'
                options={{
                    presentation: "formSheet",
                    title: "",
                    sheetAllowedDetents: [0.8],
                    sheetCornerRadius: 16,
                    sheetGrabberVisible: true,
                    headerShadowVisible: false,
                    contentStyle: {
                        backgroundColor:"#fff"
                    },
                    //安卓这里没有显示出来
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ padding: 4, borderRadius: 20, backgroundColor: Colors.light }}
                            onPress={() => router.dismiss()}
                        >
                            <Ionicons name="close-sharp" size={24} />
                        </TouchableOpacity>
                    ),
                }} />
        </Stack>
    )
}