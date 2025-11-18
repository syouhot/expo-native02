import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

const Profile = () => {
    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.container}>
            <Text>Profil222</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})

export default Profile