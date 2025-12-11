import { View } from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'

import AnimatedInput from '../input/AnimatedInput'
import useAnimatedDatePicker from './hooks/useAnimatedDatePicker'

export default function AnimatedDatePicker({
	mode = 'date',
	display = 'default',
	label,
	iconLeft: IconLeft,
	placeholder,
	value: valueClient,
	defaultValue,
	minimumDate,
	maximumDate,
	onChange,
	onBlur: onBlurClient,
	hint,
	required,
	error,
	is24Hour
}) {
	const { showPicker, value, date, onFocus, onBlur, handleChange } = useAnimatedDatePicker({
		mode,
		value: valueClient,
		defaultValue,
		onBlur: onBlurClient,
		onChange
	})

	return (
		<View>
			<AnimatedInput
				label={label}
				iconLeft={IconLeft}
				placeholder={placeholder}
				value={value}
				onFocus={onFocus}
				hint={hint}
				required={required}
				error={error}
				dismissOnFocus
			/>
			{showPicker && (
				<DatePicker
					value={date}
					mode={mode}
					display={display}
					minimumDate={minimumDate}
					maximumDate={maximumDate}
					onChange={({ type }, date) => {
						if (type === 'set') {
							handleChange(date)
						}
						onBlur()
					}}
					is24Hour={is24Hour}
				/>
			)}
		</View>
	)
}
