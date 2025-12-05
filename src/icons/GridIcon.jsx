import { Ionicons } from '@expo/vector-icons'

export default function GridIcon({ style, size = 20, color = '#1d2939', onPress }) {
	return <Ionicons style={style} name="grid-outline" size={size} color={color} onPress={onPress} />
}
