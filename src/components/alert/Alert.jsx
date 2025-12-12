import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal } from 'react-native'
import useAlert from './hooks/useAlert'

export default function Alert({
	visible,
	title,
	message,
	buttons = [{ text: 'OK' }],
	onClose = () => {},
	verticalButtons = false,
	closeOnBackdropPress = true
}) {
	const { backdropAnim, opacityAnim, scaleAnim, vertical } = useAlert({
		visible,
		verticalButtons,
		buttons
	})

	return (
		<Modal visible={visible} transparent animationType="none">
			<View style={styles.wrapper}>
				<Animated.View style={[styles.backdrop, { opacity: backdropAnim }]} />

				{closeOnBackdropPress && (
					<TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
				)}

				<Animated.View
					style={[styles.alertBox, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}
				>
					{title && <Text style={styles.title}>{title}</Text>}
					{message && <Text style={styles.message}>{message}</Text>}

					<View style={[styles.buttonsContainer, { flexDirection: vertical ? 'column' : 'row' }]}>
						{buttons.map((btn, idx) => {
							const isLast = idx === buttons.length - 1

							return (
								<TouchableOpacity
									key={idx}
									style={[
										styles.button,
										vertical ? styles.buttonVertical : styles.buttonHorizontal,
										vertical
											? !isLast && styles.dividerVertical
											: !isLast && styles.dividerHorizontal
									]}
									onPress={() => {
										btn.onPress?.()
										onClose()
									}}
								>
									<Text
										style={[styles.buttonText, btn.style === 'destructive' && { color: '#FF453A' }]}
									>
										{btn.text}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>

					<View pointerEvents="none" style={styles.vibrancyOverlay} />
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.45)'
	},

	alertBox: {
		width: 280,
		backgroundColor: 'rgba(28,28,30,0.90)',
		borderRadius: 14,
		paddingTop: 20,
		overflow: 'hidden',

		shadowColor: '#000',
		shadowOpacity: 0.4,
		shadowRadius: 25,
		shadowOffset: { width: 0, height: 10 }
	},

	vibrancyOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(255,255,255,0.05)'
	},

	title: {
		fontSize: 17,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 8,
		color: '#fff'
	},

	message: {
		fontSize: 14,
		color: '#d0d0d0',
		textAlign: 'center',
		paddingHorizontal: 20,
		marginBottom: 20
	},

	buttonsContainer: {
		borderTopWidth: 0.45,
		borderColor: 'rgba(255,255,255,0.18)'
	},

	button: {
		paddingVertical: 13,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonVertical: {
		minHeight: 48,
		width: '100%'
	},
	buttonHorizontal: {
		flex: 1
	},

	dividerHorizontal: {
		borderRightWidth: 0.45,
		borderColor: 'rgba(255,255,255,0.18)'
	},

	dividerVertical: {
		borderBottomWidth: 0.45,
		borderColor: 'rgba(255,255,255,0.18)'
	},

	buttonText: {
		fontSize: 17,
		fontWeight: '600',
		color: '#0A84FF'
	}
})
