import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { verticalScale } from '@/utils/styling'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signin } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {
            await signin(data.email, data.password);

        } catch (error: any) {
            const message =
                error?.response?.data?.message || error.message || 'Something went wrong';
            Alert.alert('Login Failed', message);
            console.log('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToRegister = () => {
        router.push('/(auth)/register');
    };

    const handleForgotPassword = () => {
        // TODO: Implement forgot password functionality
        console.log('Forgot password pressed');
    };

    return (
        <ScreenWrapper showPattern={true}>
            {/* Top Navigation Bar */}
            <View style={styles.topBar}>
                <BackButton />
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={handleForgotPassword}
                >
                    <Typo
                        size={14}
                        color={colors.white}
                        fontWeight="500"
                    >
                        Forgot password?
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
                            Welcome Back
                        </Typo>
                        <Typo
                            size={16}
                            color={colors.neutral500}
                            style={styles.subtitle}
                        >
                            Sign in to continue chatting with friends
                        </Typo>
                    </View>

                    <View style={styles.form}>
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
                                required: 'Password is required'
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
                            style={styles.loginButton}
                        >
                            <Typo
                                size={16}
                                color={colors.white}
                                fontWeight="600"
                            >
                                Sign In
                            </Typo>
                        </Button>
                    </View>

                    <View style={styles.footer}>
                        <Typo
                            size={14}
                            color={colors.neutral500}
                        >
                            Don't have an account?{' '}
                        </Typo>
                        <TouchableOpacity onPress={navigateToRegister}>
                            <Typo
                                size={14}
                                color={colors.primary}
                                fontWeight="600"
                            >
                                Sign up
                            </Typo>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacingX._20,
        zIndex: 10,
    },
    forgotButton: {
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
    loginButton: {
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