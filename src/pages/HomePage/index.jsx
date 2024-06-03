import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '@/entities/Shirt/model/store'
import CustomButton from '@/features/CustomButton'
import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation,
} from '@/shared/config/motion.js'

const HomePage = () => {
	const snap = useSnapshot(state)

	const handleEditClick = () => {
		state.intro = false
	}

	return (
		<AnimatePresence>
			{snap.intro && (
				<motion.section className='home' {...slideAnimation('left')}>
					<motion.header {...slideAnimation('down')}>
						<img
							src='/src/public/image/markformelle.png'
							alt='logo'
							className='w-28 h-28 object-contain'
						/>
					</motion.header>

					<motion.div className='home-content' {...headContainerAnimation}>
						<motion.div {...headTextAnimation}>
							<h1 className='head-text'>
								Конструктор <br className='xl:block hidden' /> Одежды
							</h1>
						</motion.div>
						<motion.div
							{...headContentAnimation}
							className='flex flex-col gap-20'
						>
							<p className='max-w-md font-medium text-gray-600 text-base'>
								Создайте свою уникальную и эксклюзивную рубашку с помощью нашего
								нового инструмента 3D-индивидуализации.{' '}
								<strong>Дайте волю своему воображению</strong> и определи свой
								собственный стиль.
							</p>

							<CustomButton
								type='filled'
								title='Редактировать'
								handleClick={handleEditClick}
								customStyles='w-fit px-20 py-6 font-bold text-lg'
								image='/src/public/image/rightArrow.png'
								imagePosition='right'
							/>
						</motion.div>
					</motion.div>
				</motion.section>
			)}
		</AnimatePresence>
	)
}

export default HomePage
