import { colors } from '@/constants/theme';
import { ScreenWrapperProps } from '@/types';
import React from 'react';
import { Dimensions, ImageBackground, Platform, StatusBar, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

const ScreenWrapper = ({
    children,
    style, bgOpacity = 1,
    isModal = false, showPattern = false
}: ScreenWrapperProps) => {
    let paddingTop = Platform.OS === 'ios' ? height * 0.06 : 40;
    let paddingBottom = 0;
    if (isModal) {
        paddingTop = Platform.OS === 'ios' ? height * 0.02 : 45;
        paddingBottom = height * 0.02;
    }





    return (
        <ImageBackground

            style={{
                flex: 1,
                backgroundColor: isModal ? colors.white : colors.neutral900,
            }}
            imageStyle={{ opacity: showPattern ? bgOpacity : 0 }}
            source={require('@/assets/images/bgPattern.png')}
        >
            <View style={[{ paddingTop, paddingBottom, flex: 1 }, style]}>
                <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} />
                {children}
            </View>
        </ImageBackground>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({})