import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

const SplashScreen = () => {

    useEffect(() => {
        const router = useRouter();

        setTimeout(() => {
            router.replace('/(auth)/welcome') // Navigate to the welcome screen after 2 seconds
        }, 1500)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.neutral900} />
            <Animated.Image
                source={require('@/assets/images/splashImage.png')}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
                entering={FadeInDown.duration(1000).springify()}
            />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral900,
    },
})