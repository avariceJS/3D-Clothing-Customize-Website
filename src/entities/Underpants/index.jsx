// Base
import React, { useMemo, useState } from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { boxerModel } from '@/public'

// Initial coordinates
const initialUnderpantsLogoPosition = { x: -1.12, y: 0 }
const initialBackLogoPosition = { x: 0.85, y: 0.5 }
const Underpants = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the socks
	const { nodes, materials } = useGLTF(boxerModel)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	const [underpantsLogoPosition, setUnderpantsLogoPosition] = useState(
		initialUnderpantsLogoPosition
	)

	const [backLogoPosition, setBackLogoPosition] = useState(
		initialBackLogoPosition
	)

	const handlePointerDown = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setUnderpantsLogoPosition(prevPosition => ({
				x: prevPosition.x + movementX * 0.02,
				y: prevPosition.y - movementY * 0.02,
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
				x: prevPosition.x - movementX * 0.02,
				y: prevPosition.y - movementY * 0.02,
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
			XXS: 0.041,
			XS: 0.0425,
			S: 0.044,
			M: 0.0455,
			L: 0.047,
			XL: 0.0485,
			XXL: 0.05,
			'3XL': 0.0565,
			'4XL': 0.058,
			'5XL': 0.0595,
			'6XL': 0.061,
			'7XL': 0.0625,
		}
		return sizeMap[size] || 1.0
	}

	const sizeScale = useMemo(
		() => getSizeScale(snap.currentSize),
		[snap.currentSize]
	)

	const rotation = snap.currentRotate ? [0.1, 6.3, 0] : [0.1, -3.14, 0]

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.Shorts_ShortsMat1_0.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				scale={[sizeScale, 0.045, sizeScale]}
				rotation={rotation}
				position={[0.02, -0.03, 0]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[-0.265, -0.7, -2.7]}
						rotation={[0, Math.PI, 0]}
						scale={5.3}
						map={fullTexture}
					/>
				)}
				{snap.isBackLogoTexture && (
					<Decal
						position={[underpantsLogoPosition.x, underpantsLogoPosition.y, 1.4]}
						rotation={[0, 0, 0]}
						scale={1.5}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={handlePointerDown}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[backLogoPosition.x, backLogoPosition.y, -0.85]}
						rotation={[0, Math.PI, 0]}
						scale={1.4}
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

export default Underpants
