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

	const handlePointerDown = e => {
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

	const getSizeScale = size => {
		const sizeMap = {
			XXS: 0.55,
			XS: 0.6,
			S: 0.65,
			M: 0.7,
			L: 0.75,
			XL: 0.8,
			XXL: 0.85,
			'3XL': 0.9,
			'4XL': 0.95,
			'5XL': 1,
			'6XL': 1.15,
			'7XL': 1.2,
		}
		return sizeMap[size] || 1.0
	}

	const sizeScale = useMemo(
		() => getSizeScale(snap.currentSize),
		[snap.currentSize]
	)

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
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
						onPointerDown={handlePointerDown}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Shirt
