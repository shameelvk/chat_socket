import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { InputProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Typo from './Typo';

interface CustomInputProps extends InputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const Input = ({
    icon,
    label,
    error,
    containerStyle,
    style,
    placeholderTextColor = colors.neutral400,
    rightIcon,
    ...props
}: InputProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Typo
                    size={14}
                    color={colors.text}
                    fontWeight="500"
                    style={styles.label}
                >
                    {label}
                </Typo>
            )}
            <View style={[styles.inputContainer, error && styles.inputError]}>
                {icon && typeof icon === 'string' && (
                    <Ionicons
                        name={icon as keyof typeof Ionicons.glyphMap}
                        size={20}
                        color={colors.neutral500}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, icon ? styles.inputWithIcon : null, style]}
                    placeholderTextColor={placeholderTextColor}
                    {...props}
                />
                {rightIcon && (
                    <View style={styles.rightIcon}>
                        {rightIcon}
                    </View>
                )}
            </View>
            {error && (
                <Typo
                    size={12}
                    color={colors.rose}
                    style={styles.errorText}
                >
                    {error}
                </Typo>
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        marginBottom: spacingY._15,
    },
    label: {
        marginBottom: spacingY._5,
        marginLeft: spacingX._5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: radius._12,
        borderWidth: 1,
        borderColor: colors.neutral200,
        paddingHorizontal: spacingX._15,
        height: verticalScale(56),
    },
    inputError: {
        borderColor: colors.rose,
    },
    icon: {
        marginRight: spacingX._10,
    },
    input: {
        flex: 1,
        fontSize: verticalScale(16),
        color: colors.text,
    },
    inputWithIcon: {
        paddingLeft: 0,
    },
    errorText: {
        marginTop: spacingY._5,
        marginLeft: spacingX._5,
    },
    rightIcon: {
        marginLeft: spacingX._10,
    },
}); 