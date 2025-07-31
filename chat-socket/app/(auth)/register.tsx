import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        try {
            // TODO: Implement registration logic here
            console.log('Registration data:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Navigate to login or main app
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToLogin = () => {
        router.push('/(auth)/login');
    };

    const handleHelp = () => {
        // TODO: Implement help functionality
        console.log('Help button pressed');
    };

    return (
        <ScreenWrapper showPattern={true}>
            {/* Top Navigation Bar */}
            <View style={styles.topBar}>
                <BackButton />
                <TouchableOpacity

                    onPress={handleHelp}
                >
                    <Typo
                        size={14}
                        color={colors.white}
                        fontWeight="500"
                    >
                        Need some help?
                    </Typo>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Typo
                            size={32}
                            color={colors.text}
                            fontWeight="700"
                            style={styles.title}
                        >
                            Create Account
                        </Typo>
                        <Typo
                            size={16}
                            color={colors.neutral500}
                            style={styles.subtitle}
                        >
                            Join us and start chatting with friends
                        </Typo>
                    </View>

                    <View style={styles.form}>
                        <Controller
                            control={control}
                            name="username"
                            rules={{
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters'
                                }
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Username"
                                    icon="person"
                                    placeholder="Enter your username"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    error={errors.username?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email'
                                }
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Email"
                                    icon="mail"
                                    placeholder="Enter your email"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    error={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Password"
                                    icon="lock-closed"
                                    placeholder="Enter your password"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    secureTextEntry={!showPassword}
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            style={styles.eyeIcon}
                                        >
                                            <Typo
                                                size={20}
                                                color={colors.neutral500}
                                            >
                                                {showPassword ? '👁️' : '👁️‍🗨️'}
                                            </Typo>
                                        </TouchableOpacity>
                                    }
                                    error={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            onPress={handleSubmit(onSubmit)}
                            loading={loading}
                            style={styles.registerButton}
                        >
                            <Typo
                                size={16}
                                color={colors.white}
                                fontWeight="600"
                            >
                                Create Account
                            </Typo>
                        </Button>
                    </View>

                    <View style={styles.footer}>
                        <Typo
                            size={14}
                            color={colors.neutral500}
                        >
                            Already have an account?{' '}
                        </Typo>
                        <TouchableOpacity onPress={navigateToLogin}>
                            <Typo
                                size={14}
                                color={colors.primary}
                                fontWeight="600"
                            >
                                Login
                            </Typo>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Register

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacingX._20,
        zIndex: 10,
    },

    container: {
        flex: 1,
        marginTop: spacingY._20,
    },
    content: {
        backgroundColor: colors.white,
        borderTopLeftRadius: verticalScale(70),
        borderTopRightRadius: verticalScale(70),
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._30,
        paddingBottom: spacingY._40,
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacingY._40,
    },
    title: {
        marginBottom: spacingY._10,
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        lineHeight: 22,
    },
    form: {
        flex: 1,
    },
    registerButton: {
        marginTop: spacingY._20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: spacingY._30,
    },
    eyeIcon: {
        padding: spacingX._5,
    },
})