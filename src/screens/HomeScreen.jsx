import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Open up <Text style={styles.accent}>src/app/index.jsx</Text> to start working on your app!
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
