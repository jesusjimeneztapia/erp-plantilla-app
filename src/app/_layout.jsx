import SplashScreen from '@screens/SplashScreen'
import { useAuthStore } from '@store/auth.store'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
	const isLoading = useAuthStore((state) => state.isLoading)
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	return (
		<>
			{isLoading ? (
				<SplashScreen />
			) : (
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Protected guard={isAuthenticated}>
						<Stack.Screen name="(app)" />
					</Stack.Protected>

					<Stack.Protected guard={!isAuthenticated}>
						<Stack.Screen name="login" />
					</Stack.Protected>
				</Stack>
			)}
			<StatusBar style="dark" />
		</>
	)
}
