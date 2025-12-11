import { useEffect, useState } from 'react'
import {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'

const DURATION = 150

export default function useAnimatedInput({
	value: valueClient,
	onChangeText,
	onFocus: onFocusClient,
	onBlur: onBlurClient,
	secureTextEntry,
	error,
	dismissOnFocus
}) {
	const [isFocused, setIsFocused] = useState(false)
	const [hideText, setHideText] = useState(!!secureTextEntry)
	const [value, setValue] = useState('')

	const translateYLabelContainer = useSharedValue(19)
	const progressLabel = useSharedValue(0)

	useEffect(() => {
		setValue(valueClient ?? '')
	}, [valueClient])

	useEffect(() => {
		translateYLabelContainer.value = withTiming(isFocused || !!value ? 0 : 19, {
			duration: DURATION
		})
		progressLabel.value = withTiming(isFocused || !!value ? 1 : 0, { duration: DURATION })
	}, [isFocused, value, translateYLabelContainer, progressLabel])

	const animatedLabelContainerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateYLabelContainer.value }]
	}))

	const animatedLabelStyle = useAnimatedStyle(() => ({
		fontSize: interpolate(progressLabel.value, [0, 1], [14, 12]),
		backgroundColor:
			!!value && !isFocused
				? error
					? 'rgba(253, 164, 175, .25)'
					: 'rgba(209, 213, 219, .25)'
				: interpolateColor(
						progressLabel.value,
						[0, 1],
						['rgba(255,255,255,0)', error ? 'rgba(253, 164, 175, .25)' : 'rgba(191, 219, 254, .25)']
					),
		fontWeight: (!!value && !isFocused) || isFocused ? 'bold' : 'normal',
		color:
			!!value && !isFocused
				? error
					? '#f43f5e'
					: '#6b7280'
				: interpolateColor(progressLabel.value, [0, 1], ['#6b7280', error ? '#f43f5e' : '#3b82f6'])
	}))

	const onFocus = () => {
		if (!dismissOnFocus) {
			setIsFocused(true)
		}
		onFocusClient?.()
	}
	const onBlur = () => {
		setIsFocused(false)
		onBlurClient?.()
	}

	const toggleHideText = () => setHideText((state) => !state)

	const handleChangeText = (text) => {
		if (!onChangeText) {
			return setValue(text)
		}
		onChangeText?.(text)
	}

	return {
		isFocused,
		hideText,
		value,
		animatedLabelContainerStyle,
		animatedLabelStyle,
		onFocus,
		onBlur,
		toggleHideText,
		handleChangeText
	}
}
