import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
	return (
		<>
			<Stack>
				<Stack.Screen name="index" options={{ headerTitle: 'Home' }} />
			</Stack>
			<StatusBar style="auto" />
		</>
	)
}
