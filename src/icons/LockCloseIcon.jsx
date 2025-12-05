import { Ionicons } from '@expo/vector-icons'

export default function LockCloseIcon({ style, size = 20, color = '#1d2939', onPress }) {
	return (
		<Ionicons
			style={style}
			name="lock-closed-outline"
			size={size}
			color={color}
			onPress={onPress}
		/>
	)
}
