// Base
import React, { useRef } from 'react'

// 3D Graphics
import { useFrame } from '@react-three/fiber'

// Math Helpers
import { easing } from 'maath'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

const ModelViewControl = ({ children }) => {
	const group = useRef()
	const snap = useSnapshot(state)

	useFrame((state, delta) => {
		const isBreakpoint = window.innerWidth <= 1260
		const isMobile = window.innerWidth <= 600

		// Set target camera position based on screen size and intro state
		let targetPosition = [-0.4, 0, 2]
		if (snap.intro) {
			if (isBreakpoint) targetPosition = [0, 0, 2]
			if (isMobile) targetPosition = [0, 0.2, 2.5]
		} else {
			if (isMobile) targetPosition = [0, 0, 2.5]
			else targetPosition = [0, 0, 2]
		}

		// Smoothly transition the camera position to the target position
		easing.damp3(state.camera.position, targetPosition, 0.25, delta)

		// Smoothly transition the group rotation based on the pointer position
		easing.dampE(
			group.current.rotation,
			[state.pointer.y / 10, -state.pointer.x / 5, 0],
			0.25,
			delta
		)
	})

	// Render the group with children components
	return <group ref={group}>{children}</group>
}

export default ModelViewControl
