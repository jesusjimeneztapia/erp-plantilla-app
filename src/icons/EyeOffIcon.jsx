import { Ionicons } from '@expo/vector-icons'

export default function EyeOffIcon({ style, size = 20, color = '#1d2939', onPress }) {
	return (
		<Ionicons style={style} name="eye-off-outline" size={size} color={color} onPress={onPress} />
	)
}
