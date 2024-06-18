// Base
import React, { useMemo, useState } from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { shirtModel } from '@/public'

// Initial coordinates
const initialShirtLogoPosition = { x: 0, y: 0.04 }
const initialBackLogoPosition = { x: 0, y: 0.04 }

const Shirt = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the shirt
	const { nodes, materials } = useGLTF(shirtModel)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	const [shirtLogoPosition, setShirtLogoPosition] = useState(
		initialShirtLogoPosition
	)
	const [backLogoPosition, setBackLogoPosition] = useState(
		initialBackLogoPosition
	)

	const handlePointerDownFront = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setShirtLogoPosition(prevPosition => ({
				x: prevPosition.x + movementX * 0.00085,
				y: prevPosition.y - movementY * 0.00085,
			}))
		}

		const handlePointerUp = () => {
			document.removeEventListener('mousemove', handlePointerMove)
			document.removeEventListener('mouseup', handlePointerUp)
		}

		document.addEventListener('mousemove', handlePointerMove)
		document.addEventListener('mouseup', handlePointerUp)
	}

	const handlePointerDownBack = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setBackLogoPosition(prevPosition => ({
				x: prevPosition.x - movementX * 0.00085,
				y: prevPosition.y - movementY * 0.00085,
			}))
		}

		const handlePointerUp = () => {
			document.removeEventListener('mousemove', handlePointerMove)
			document.removeEventListener('mouseup', handlePointerUp)
		}

		document.addEventListener('mousemove', handlePointerMove)
		document.addEventListener('mouseup', handlePointerUp)
	}

	const getSizeScale = size => {
		const sizeMap = {
			XXS: 0.75,
			XS: 0.78,
			S: 0.81,
			M: 0.84,
			L: 0.87,
			XL: 0.9,
			XXL: 0.93,
			'3XL': 0.96,
			'4XL': 0.99,
			'5XL': 1.02,
			'6XL': 1.05,
			'7XL': 1.08,
		}
		return sizeMap[size] || 1.0
	}

	const sizeScale = useMemo(
		() => getSizeScale(snap.currentSize),
		[snap.currentSize]
	)

	const rotation = snap.currentRotate ? [0, 3.15, 0] : [0, 0.05, 0]

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				rotation={rotation}
				position={[0.035, -0.01, 0]}
				scale={[sizeScale, sizeScale, sizeScale]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0, 0, 0]}
						rotation={[0, 0, 0]}
						scale={0.6999}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[shirtLogoPosition.x, shirtLogoPosition.y, 0.15]}
						rotation={[0, 0, 0]}
						scale={0.15}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={handlePointerDownFront}
					/>
				)}
				{snap.isBackLogoTexture && (
					<Decal
						position={[backLogoPosition.x, backLogoPosition.y, -0.08]}
						rotation={[0, Math.PI, 0]}
						scale={0.15}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={handlePointerDownBack}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Shirt
