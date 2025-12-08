import EyeIcon from '@icons/EyeIcon'
import EyeOffIcon from '@icons/EyeOffIcon'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Animated from 'react-native-reanimated'
import useAnimatedInput from './useAnimatedInput'

export default function AnimatedInput({
	label,
	iconLeft: IconLeft,
	placeholder,
	value: valueClient,
	onChangeText,
	onBlur: onBlurClient,
	secureTextEntry,
	hint,
	required,
	error
}) {
	const {
		animatedLabelContainerStyle,
		animatedLabelStyle,
		hideText,
		isFocused,
		value,
		handleChangeText,
		onBlur,
		onFocus,
		toggleHideText
	} = useAnimatedInput({
		value: valueClient,
		error,
		onBlur: onBlurClient,
		onChangeText,
		secureTextEntry
	})

	return (
		<View style={styles.container}>
			{label && (
				<Animated.View
					pointerEvents="none"
					style={[
						styles.labelContainer,
						IconLeft ? styles.labelContainerLeft : {},
						animatedLabelContainerStyle
					]}
				>
					<Animated.Text style={[styles.label, animatedLabelStyle]}>
						{label}
						{required && <Text style={{ color: '#f43f5e' }}> *</Text>}
					</Animated.Text>
				</Animated.View>
			)}

			<View style={[styles.inputContainer]}>
				<TextInput
					style={[
						styles.input,
						error ? styles.inputError : {},
						isFocused ? (error ? styles.inputErrorFocused : styles.inputFocused) : {},
						IconLeft ? styles.inputPaddingLeft : {},
						secureTextEntry ? styles.inputPaddingRight : {}
					]}
					placeholder={isFocused ? placeholder : ''}
					placeholderTextColor="rgba(17, 24, 39, .25)"
					onFocus={onFocus}
					onBlur={onBlur}
					value={value}
					onChangeText={handleChangeText}
					secureTextEntry={hideText}
				/>
				{IconLeft && (
					<IconLeft
						style={[styles.icon, styles.iconLeft]}
						size={20}
						color={
							isFocused
								? error
									? '#f43f5e'
									: '#3b82f6'
								: error
									? 'rgba(244, 63, 94, .75)'
									: 'rgba(59, 130, 246, .75)'
						}
					/>
				)}
				{secureTextEntry && (
					<>
						{hideText ? (
							<EyeIcon
								style={[styles.icon, styles.iconRight]}
								size={20}
								color={isFocused ? 'rgba(17, 24, 39, .75)' : 'rgba(17, 24, 39, .25)'}
								onPress={toggleHideText}
							/>
						) : (
							<EyeOffIcon
								style={[styles.icon, styles.iconRight]}
								size={20}
								color={isFocused ? 'rgba(17, 24, 39, .75)' : 'rgba(17, 24, 39, .25)'}
								onPress={toggleHideText}
							/>
						)}
					</>
				)}
			</View>

			{hint && <Text style={[styles.hint, error ? styles.hintError : {}]}>{hint}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		paddingTop: 8
	},

	labelContainer: {
		position: 'absolute',
		left: 12,
		backgroundColor: 'white',
		borderRadius: 2,
		overflow: 'hidden',
		zIndex: 1
	},
	labelContainerLeft: {
		left: 36
	},
	label: {
		fontSize: 14,
		paddingVertical: 2,
		paddingHorizontal: 4,
		color: '#6b7280'
	},

	inputContainer: {
		position: 'relative'
	},
	input: {
		fontSize: 14,
		color: '#111827',

		paddingVertical: 12,
		paddingHorizontal: 16,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#d1d5db'
	},
	inputFocused: {
		borderColor: '#3b82f6'
	},

	inputPaddingLeft: {
		paddingLeft: 40
	},
	inputPaddingRight: {
		paddingRight: 40
	},

	inputError: {
		borderColor: '#fda4af'
	},
	inputErrorFocused: {
		borderColor: '#f43f5e'
	},

	icon: {
		position: 'absolute',
		top: '50%',
		transform: [{ translateY: '-50%' }]
	},

	iconLeft: {
		left: 16
	},
	iconRight: {
		right: 16
	},

	hint: {
		fontSize: 12,
		color: 'rgba(17, 24, 39, .75)'
	},
	hintError: {
		color: '#f43f5e'
	}
})
