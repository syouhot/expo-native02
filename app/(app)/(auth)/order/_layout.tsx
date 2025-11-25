import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const Layout = () => {
    const router = useRouter();
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
            <Stack.Screen name="schedule" options={{
                title: 'Schedule delivery',
                presentation: 'formSheet',
                headerShown: true,
                headerTransparent: false,
                headerTintColor: '#000',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    fontWeight: '600',
                },
                sheetCornerRadius: 24,
                sheetGrabberVisible: true,
                sheetAllowedDetents: [0.5],
                contentStyle: {
                    backgroundColor: '#fff',
                },
                headerRight: () => (
                    <TouchableOpacity style={styles.closeButton} onPress={() => router.dismiss()}>
                        <Ionicons name="close" size={28} color={'#000'} />
                    </TouchableOpacity>
                ),
            }} />
        </Stack>
    )
}
const styles = StyleSheet.create({
    closeButton: {
        marginLeft: 4,
    },
});
export default Layout
