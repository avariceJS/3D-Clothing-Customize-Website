import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '@/entities/Shirt/model/store'

const ColorSelector = () => {
	const snap = useSnapshot(state)

	return (
		<div className='absolute left-21 top-24'>
			<SketchPicker
				color={snap.color}
				disableAlpha
				onChange={color => (state.color = color.hex)}
			/>
		</div>
	)
}

export default ColorSelector
