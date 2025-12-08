import LockCloseIcon from '@icons/LockCloseIcon'
import PersonIcon from '@icons/PersonIcon'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useLogin from './hooks/useLogin'
import { Controller } from 'react-hook-form'
import AnimatedInput from '@components/form/input/AnimatedInput'

export default function LoginScreen() {
	const { control, errors, isSubmitting, onSubmit } = useLogin()

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.form}>
					<View style={styles.header}>
						<Text style={styles.title}>Iniciar Sesión</Text>
						<Text style={styles.legend}>
							Ingresa tu correo electrónico y contraseña para iniciar sesión
						</Text>
					</View>

					<View style={styles.fields}>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
								<AnimatedInput
									label="Correo electrónico"
									iconLeft={PersonIcon}
									placeholder="Ingrese su correo electrónico"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									hint={error?.message}
									error={!!error}
									required
								/>
							)}
						/>

						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
								<AnimatedInput
									label="Contraseña"
									iconLeft={LockCloseIcon}
									placeholder="Ingrese su contraseña"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									hint={error?.message}
									error={!!error}
									required
									secureTextEntry
								/>
							)}
						/>

						<Pressable
							style={[
								styles.button,
								isSubmitting || Object.values(errors).length > 0 ? styles.buttonDisabled : {}
							]}
							onPress={onSubmit}
							disabled={isSubmitting || Object.values(errors).length > 0}
						>
							<Text style={styles.buttonText}>Iniciar sesión</Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},
	form: {
		width: '100%'
	},
	header: {
		rowGap: 8,
		marginBottom: 20
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#1d2939'
	},
	legend: {
		color: '#667085',
		fontSize: 14
	},
	fields: {
		rowGap: 24
	},
	required: {
		color: '#f04438'
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: '#465fff',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: 'medium'
	},
	buttonDisabled: {
		opacity: 0.25
	}
})
