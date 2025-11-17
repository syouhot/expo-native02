import AppleAuthButton from '@/components/auth/AppleAuthButton'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'
import { Fonts } from '@/constants/theme'
import React from 'react'
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

export default function Index() {
  const openWebBrower = () => { 
    Linking.openURL('https://www.baidu.com/')
  }
  return (
    <View style={styles.container}>
      <View style={styles.infiniteScrollContainer}></View>
      <View style={styles.contentContainer}>
        <Image source={require('@/assets/images/wolt-logo.png')} style={styles.brandLogo} />
        <Animated.Text entering={FadeInDown} style={styles.tagline}>
          Almost everything delivered
        </Animated.Text>
        <View style={styles.buttonContainer}>
          <Animated.Text entering={FadeInDown.delay(100)}>
            <AppleAuthButton />
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(200)}>
            <GoogleAuthButton />
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(300)}>
            <TouchableOpacity style={styles.otherButton}>
              <Text style={styles.otherButtonText}>Other options</Text>
            </TouchableOpacity>
          </Animated.Text>
        </View>
        <Animated.View style={styles.privacyContainer} entering={FadeInDown.delay(400)}>
          <Text style={styles.privacyText}>Please visit{" "}
            <Text style={styles.privateLink} onPress={openWebBrower}>
              Wolt Privacy Statement
            </Text> {" "}
            to learn about personal data processing at Wolt.
          </Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  brandLogo: {
    width: "100%",
    height: 48,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  infiniteScrollContainer: {
    flex: 0.8
  },
  tagline: {
    fontSize: 32,
    fontFamily: Fonts.brandBlack,
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 36
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  otherButton: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 12,
    gap: 4,
    width: "100%"
  },
  otherButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: 600
  },
  privacyContainer: {
    marginTop: 30,
    paddingHorizontal: 20
  },
  privacyText: {
    fontSize: 12,
    color: "#999",
    textAlign: 'center',
    lineHeight: 18
  },
  privateLink: {
    color: "#4285f4",
    textDecorationLine: "underline"
  },
})