// Base
import React, { useState } from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { socksModel } from '@/public'

// Initial coordinates
const initialLeftSockLogoPosition = { x: 0.1367, y: 0.182 }
const initialRightSockLogoPosition = { x: -0.021, y: 0.182 }

const Socks = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the socks
	const { nodes, materials } = useGLTF(socksModel)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	const [leftSockLogoPosition, setLeftSockLogoPosition] = useState(
		initialLeftSockLogoPosition
	)
	const [rightSockLogoPosition, setRightSockLogoPosition] = useState(
		initialRightSockLogoPosition
	)

	const handlePointerDown = (e, setPosition) => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setPosition(prevPosition => ({
				x: prevPosition.x + movementX * 0.001,
				y: prevPosition.y - movementY * 0.001,
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
			{/* Left sock */}
			<mesh
				geometry={nodes['sock-left-b_medias_0'].geometry}
				material={materials.lambert1}
				material-roughness={1}
				scale={[1, 1, 1]}
				position={[0, -0.2, 0]}
				dispose={null}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0.134, 0.098, 0]}
						rotation={[0, 0, 0]}
						scale={0.388}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[leftSockLogoPosition.x, leftSockLogoPosition.y, 0]}
						rotation={[0, 0, 0]}
						scale={0.06}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={e => handlePointerDown(e, setLeftSockLogoPosition)}
					/>
				)}
			</mesh>
			{/* Right sock */}
			<mesh
				geometry={nodes['sock-right-b_medias001_0'].geometry}
				material={materials.lambert1}
				material-roughness={1}
				position={[0, -0.2, 0]}
				scale={[1, 1, 1]}
				dispose={null}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[-0.021, 0.098, 0]}
						rotation={[0, 0, 0]}
						scale={0.388}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[rightSockLogoPosition.x, rightSockLogoPosition.y, 0]}
						rotation={[0, 0, 0]}
						scale={0.06}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={e => handlePointerDown(e, setRightSockLogoPosition)}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Socks
