import AsyncStorage from '@react-native-async-storage/async-storage'
import { appApiInstance } from '@services/api'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuthStore = create()(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			isLoading: true,

			setIsLoading: (isLoading) => {
				set({ isLoading })
			},
			refreshAuth: () => {
				const { token, user, isAuthenticated } = get()
				if (!token || !user || !isAuthenticated) {
					delete appApiInstance.defaults.headers.common.Authorization
					set({ token: null, user: null, isAuthenticated: false })
					return
				}

				appApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`
			},
			authenticate: ({ token, user }) => {
				set({ token, user, isAuthenticated: true })
				const { refreshAuth } = get()
				refreshAuth()
			},
			unauthenticate: () => {
				set({ isAuthenticated: false })
				const { refreshAuth } = get()
				refreshAuth()
			}
		}),
		{
			name: 'auth',
			partialize: (state) => ({
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated
			}),
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state, error) => {
				if (!error) {
					state?.refreshAuth()
				}
				state?.setIsLoading(false)
			}
		}
	)
)
