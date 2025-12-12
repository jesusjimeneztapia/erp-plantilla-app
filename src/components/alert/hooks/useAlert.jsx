import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export default function useAlert({ visible, verticalButtons, buttons }) {
	const scaleAnim = useRef(new Animated.Value(0.75)).current
	const opacityAnim = useRef(new Animated.Value(0)).current
	const backdropAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		if (visible) {
			Animated.parallel([
				Animated.spring(scaleAnim, {
					toValue: 1,
					mass: 0.4,
					damping: 18,
					stiffness: 185,
					useNativeDriver: true
				}),
				Animated.timing(opacityAnim, {
					toValue: 1,
					duration: 220,
					useNativeDriver: true
				}),
				Animated.timing(backdropAnim, {
					toValue: 1,
					duration: 240,
					useNativeDriver: true
				})
			]).start()
		} else {
			Animated.parallel([
				Animated.timing(scaleAnim, {
					toValue: 0.75,
					duration: 150,
					useNativeDriver: true
				}),
				Animated.timing(opacityAnim, {
					toValue: 0,
					duration: 130,
					useNativeDriver: true
				}),
				Animated.timing(backdropAnim, {
					toValue: 0,
					duration: 150,
					useNativeDriver: true
				})
			]).start()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible])

	const vertical = verticalButtons && (buttons.length === 1 || buttons.length === 2)

	return { scaleAnim, opacityAnim, backdropAnim, vertical }
}
