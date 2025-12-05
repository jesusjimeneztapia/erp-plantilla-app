import { appApiInstance } from './api'

export async function login(credentials) {
	const { data } = await appApiInstance.post('/login', credentials)
	return data
}
