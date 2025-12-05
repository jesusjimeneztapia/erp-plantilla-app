import { Ionicons } from '@expo/vector-icons'

export default function PersonIcon({ style, size = 20, color = '#1d2939', onPress }) {
	return (
		<Ionicons style={style} name="person-outline" size={size} color={color} onPress={onPress} />
	)
}
