// Base
import React, { useState } from 'react'

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

	const handlePointerDown = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setUnderpantsLogoPosition(prevPosition => ({
				x: prevPosition.x + movementX * 0.016,
				y: prevPosition.y - movementY * 0.026,
			}))
		}

		const handlePointerUp = () => {
			document.removeEventListener('mousemove', handlePointerMove)
			document.removeEventListener('mouseup', handlePointerUp)
		}

		document.addEventListener('mousemove', handlePointerMove)
		document.addEventListener('mouseup', handlePointerUp)
	}

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.Shorts_ShortsMat1_0.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				scale={[0.06, 0.04, 0.06]}
				rotation={[0.15, 6.3, 0]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0.17, -0.7, 1.8]}
						rotation={[0, 0, 0]}
						scale={5.2}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[underpantsLogoPosition.x, underpantsLogoPosition.y, 1.1]}
						rotation={[0, 0, 0]}
						scale={1.1}
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

export default Underpants
