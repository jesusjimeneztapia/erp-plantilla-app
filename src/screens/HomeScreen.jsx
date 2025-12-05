import { useAuthStore } from '@store/auth.store'
import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
	const user = useAuthStore((state) => state.user)

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Bienvenid@ <Text style={styles.accent}>{user.name}</Text>!
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20
	},
	text: {
		textAlign: 'center',
		maxWidth: '64%'
	},
	accent: {
		color: '#0369a1'
	}
})
