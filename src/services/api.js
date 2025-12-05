import axios from 'axios'
import { API_URL } from '@config/environment'

export const appApiInstance = axios.create({
	baseURL: `${API_URL}/api`
})
