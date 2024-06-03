import { Decal, useGLTF, useTexture } from '@react-three/drei'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../Shirt/model/store'

const Pants = () => {
	const snap = useSnapshot(state)
	const { nodes, materials } = useGLTF('/src/public/3dModel/pants.glb')
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	const stateString = JSON.stringify(snap)

	return (
		<group key={stateString}>
		
			<mesh
				geometry={nodes.defaultMaterial
					.geometry}
				material={materials.lambert1}
				rotation={[0, 0, 0]}
				position={[0, 0, 0]}
				material-roughness={1}
				scale={[0.3, 0.3, 0.3]}
				dispose={null}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0.03, 0.7, 0.2]}
						rotation={[0, 0, 0]}
						scale={0.5}
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
