import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet } from 'react-native'

const Register = () => {
    return (
        <ScreenWrapper>
            <Typo color={colors.white}>Register</Typo>
        </ScreenWrapper>
    )
}

export default Register

const styles = StyleSheet.create({})