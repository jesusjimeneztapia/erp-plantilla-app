import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import * as AuthService from '@services/auth.service'
import { Alert } from 'react-native'
import { useAuthStore } from '@store/auth.store'

const schema = z.object({
	email: z.email({
		error: ({ input }) =>
			!input ? 'El correo electrónico es requerido' : 'El correo electrónico es inválido'
	}),
	password: z.string().min(8, {
		error: ({ input }) =>
			!input ? 'La contraseña es requerida' : 'La contraseña debe tener al menos 8 caracteres'
	})
})

export default function useLogin() {
	const authenticate = useAuthStore((state) => state.authenticate)

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			user: '',
			password: ''
		},
		resolver: zodResolver(schema)
	})

	const onSubmit = handleSubmit(async (data) => {
		try {
			const auth = await AuthService.login(data)
			authenticate(auth)
		} catch (error) {
			console.log({ error })
			Alert.alert('Error', 'Las credenciales son incorrectas', [{ text: 'Cerrar' }])
		}
	})

	return { control, errors, isSubmitting, onSubmit }
}
