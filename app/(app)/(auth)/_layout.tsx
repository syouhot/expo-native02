import { Stack } from '@/components/Stack'
import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Transition from 'react-native-screen-transitions'



export default function Layout() {
    const router = useRouter()
    return (
        <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='(modal)/(restaurant)/[id]'
                options={{
                    headerShown: false,
                    ...Transition.presets.DraggableCard()
                }}
            />
            <Stack.Screen
                name='(modal)/(menu)/[id]'
                options={{
                    presentation: "formSheet",
                    title: "",
                    sheetAllowedDetents: [0.9],
                    sheetCornerRadius: 16,
                    sheetGrabberVisible: true,
                    headerShadowVisible: false,
                    sheetExpandsWhenScrolledToEdge: true,
                    headerShown:false,
                    contentStyle: {
                        backgroundColor: "#fff"
                    },
                }} />
            <Stack.Screen name='(modal)/map'
                options={{
                    headerShown: false,
                    ...Transition.presets.SharedAppleMusic()
                }}
            />
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
                        backgroundColor: "#fff"
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
            <Stack.Screen
                name='order'
                options={{
                    headerShown: false,
                    enableTransitions:true,
                    ...Transition.presets.SharedXImage()
                }} />
        </Stack>
    )
}