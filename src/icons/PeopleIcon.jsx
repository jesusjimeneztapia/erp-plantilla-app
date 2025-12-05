import { Ionicons } from '@expo/vector-icons'

export default function PeopleIcon({ style, size = 20, color = '#1d2939', onPress }) {
	return (
		<Ionicons style={style} name="people-outline" size={size} color={color} onPress={onPress} />
	)
}
