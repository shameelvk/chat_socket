import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { Text, TextStyle } from 'react-native'

const Typo = ({
    children,
    style,
    color = colors.text, fontWeight = "400", size = 16, textProps = {}

}: TypoProps) => {
    const textStyle: TextStyle = { fontWeight, color, fontSize: verticalScale(size) };
    return (
        <Text style={[textStyle, style, { ...textProps }]}>{children}</Text>
    )
}

export default Typo


