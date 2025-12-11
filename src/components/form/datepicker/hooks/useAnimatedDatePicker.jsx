import { useEffect, useState } from 'react'

const GET_DATE = {
	date: (value) => {
		let date = new Date()
		if (value) {
			date = new Date(`${value.split('/').reverse().join('-')} 00:00:00`)
		}
		return date
	},
	time: (value) => {
		const date = new Date()
		if (value) {
			const [hours, minutes, rest] = value.split(':')
			date.setHours(parseInt(hours))
			date.setMinutes(parseInt(minutes))
			if (rest) {
				const [seconds, milliseconds] = rest.split('.')
				date.setSeconds(parseInt(seconds))
				date.setMilliseconds(parseInt(milliseconds))
			}
		}
		return date
	}
}

const GET_VALUE = {
	date: (date) =>
		date?.toLocaleDateString('es-BO', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}) ?? '',
	time: (date) =>
		date?.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }) ??
		''
}

export default function useAnimatedDatePicker({
	mode,
	value: valueClient,
	defaultValue,
	onChange,
	onBlur: onBlurClient
}) {
	const [showPicker, setShowPicker] = useState(false)

	const [value, setValue] = useState('')
	const date = (GET_DATE[mode] ?? GET_DATE.date)(value || defaultValue)

	useEffect(() => {
		setValue(valueClient ?? '')
	}, [valueClient])

	const onFocus = () => {
		setShowPicker(true)
	}

	const onBlur = () => {
		setShowPicker(false)
		onBlurClient?.()
	}

	const handleChange = (date) => {
		const value = (GET_VALUE[mode] ?? GET_VALUE.date)(date)

		if (!onChange) {
			return setValue(value)
		}
		onChange?.(value)
	}

	return { showPicker, value, date, onFocus, onBlur, handleChange }
}
