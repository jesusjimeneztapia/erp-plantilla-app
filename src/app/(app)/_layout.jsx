import GridIcon from '@icons/GridIcon'
import PeopleIcon from '@icons/PeopleIcon'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useAuthStore } from '@store/auth.store'
import { Drawer } from 'expo-router/drawer'
import { Pressable, Text, View } from 'react-native'

function CustomDrawerContent(props) {
	const user = useAuthStore((state) => state.user)
	const unauthenticate = useAuthStore((state) => state.unauthenticate)

	return (
		<DrawerContentScrollView {...props}>
			<View style={{ rowGap: 2, marginBottom: 16 }}>
				<Text style={{ color: '#344054', fontSize: 14, fontWeight: 'bold' }}>{user.name}</Text>
				<Text style={{ color: '#667085', fontSize: 12 }}>{user.email}</Text>
			</View>

			<DrawerItemList {...props} />

			<Pressable
				style={{
					paddingHorizontal: 16,
					paddingVertical: 12,
					marginTop: 12,
					backgroundColor: '#f43f5e',
					alignItems: 'center',
					borderRadius: 4
				}}
				onPress={unauthenticate}
			>
				<Text style={{ color: 'white', fontWeight: 'medium', fontSize: 14 }}>Cerrar sesión</Text>
			</Pressable>
		</DrawerContentScrollView>
	)
}

export default function DrawerLayout() {
	return (
		<Drawer
			drawerContent={CustomDrawerContent}
			screenOptions={{
				drawerInactiveTintColor: '#344054',
				drawerActiveTintColor: '#465fff',
				drawerHideStatusBarOnOpen: true
			}}
		>
			<Drawer.Screen
				name="index"
				options={{
					title: 'Panel',
					drawerLabel: 'Panel',
					drawerIcon: ({ size, color }) => <GridIcon size={size} color={color} />
				}}
			/>
			<Drawer.Screen
				name="users"
				options={{
					title: 'Usuarios',
					drawerLabel: 'Usuarios',
					drawerIcon: ({ size, color }) => <PeopleIcon size={size} color={color} />
				}}
			/>
		</Drawer>
	)
}
