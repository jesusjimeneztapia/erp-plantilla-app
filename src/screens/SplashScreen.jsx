import { Image } from 'expo-image'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import Logo from '@assets/logo.svg'

export default function SplashScreen() {
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			<Image style={styles.logo} source={Logo} contentFit="contain" contentPosition="center" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingHorizontal: 64
	},
	logo: {
		flex: 1,
		width: '100%'
	}
})
