// Base
import React from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

//Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { pantsModel } from '@/public'

const Pants = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the socks
	const { nodes, materials } = useGLTF(pantsModel)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.defaultMaterial.geometry}
				material={materials.lambert1}
				rotation={[0, 0, 0]}
				position={[0, -0.08, 0]}
				material-roughness={1}
				scale={[0.3, 0.3, 0.3]}
				dispose={null}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0.04, 0.01, 0.2]}
						rotation={[0, 0, 0]}
						scale={2.1}
						map={fullTexture}
					/>
				)}

				{snap.isLogoTexture && (
					<Decal
						position={[-0.2, 0.8, 0.2]}
						rotation={[0, 0, 0]}
						scale={0.2}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Pants
