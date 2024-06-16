// Base
import React, { useState } from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { hoodieModel } from '@/public'

// Initial coordinates 
const initialHoodieLogoPosition = { x: 0.009, y: 1.42 }

const Hoodie = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the hoodie
	const { nodes, materials } = useGLTF(hoodieModel)
	console.log(nodes)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	const [HoodieLogoPosition, setHoodieLogoPosition] = useState(
		initialHoodieLogoPosition
	)

	const handlePointerDown = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setHoodieLogoPosition(prevPosition => ({
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

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.Object_10.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal 
						position={[0.009, 1.29, 0]}
						rotation={[0, 0, 0]}
						scale={0.33}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[HoodieLogoPosition.x, HoodieLogoPosition.y, 0.0365]}
						rotation={[0, 0, 0]}
						scale={0.12}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={handlePointerDown}
					/>
				)}
			</mesh>
			<mesh
				geometry={nodes.Object_6.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_7.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_8.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_9.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>

			<mesh
				geometry={nodes.Object_11.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_12.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_13.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_14.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_15.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_16.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_17.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
		</group>
	)
}

export default Hoodie
