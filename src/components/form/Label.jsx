import { StyleSheet, Text } from 'react-native'

export default function Label({ children }) {
	return <Text style={styles.label}>{children}</Text>
}

const styles = StyleSheet.create({
	label: {
		marginBottom: 6,
		fontSize: 14,
		fontWeight: 'medium',
		color: '#344054'
	}
})
