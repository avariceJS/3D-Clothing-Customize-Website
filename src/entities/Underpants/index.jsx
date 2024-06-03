import { Decal, useGLTF, useTexture } from '@react-three/drei'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../Shirt/model/store'

const Underpants = () => {
	const snap = useSnapshot(state)
	const { nodes, materials } = useGLTF('/src/public/3dModel/boxer.glb')
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	const stateString = JSON.stringify(snap)

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.Shorts_ShortsMat1_0
                    .geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
                scale={[0.06, 0.04, 0.06]}
                rotation={[0.15, 6.3, 0]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[-0.005, 0, 1.8]}
						rotation={[0, 0, 0]}
						scale={2.5}
						map={fullTexture}
                        
					/>
				)}

				{snap.isLogoTexture && (
					<Decal
						position={[-1.1, -0.1, 1.8]}
						rotation={[0, 0, 0]}
						scale={1.1}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Underpants
