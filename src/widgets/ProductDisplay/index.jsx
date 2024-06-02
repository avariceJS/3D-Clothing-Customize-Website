import { Center, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Backdrop from '@/entities/Backdrop'
import Shirt from '@/entities/Shirt'
import Socks from '@/entities/Socks'
import Underpants from '@/entities/Underpants'
import Pants from '@/entities/Pants'
import ModelViewControl from '@/features/ModelViewControl'

const ProductDisplay = () => {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 0, 0], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
			className='w-full max-w-full h-full transition-all ease-in'
		>
			<ambientLight intensity={0.5} />
			<Environment preset='city' />

			<ModelViewControl>
				<Backdrop />
				<Center>
					<Shirt />
				</Center>
			</ModelViewControl>
		</Canvas>
	)
}

export default ProductDisplay
