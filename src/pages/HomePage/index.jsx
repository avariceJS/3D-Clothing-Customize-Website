// Animations
import { AnimatePresence, motion } from 'framer-motion'

// State
import { useSnapshot } from 'valtio'

// Features -> Button
import CustomButton from '@/features/CustomButton'

// Icons
import { rightArrowIcon } from '@/public'

// Image
import { MarkFormelle } from '@/public'

// Shared -> Config
import state from '@/shared/config/store'
import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation,
} from '@/shared/config/motion.js'

// Function for handling edit click
const handleEditClick = () => {
	state.intro = false
}

const HomePage = () => {
	const snap = useSnapshot(state)

	return (
		<AnimatePresence>
			{snap.intro && (
				<motion.section className='home' {...slideAnimation('left')}>
					<motion.header {...slideAnimation('down')}>
						<img
							src={MarkFormelle}
							alt='logo'
							className='w-32 h-32 object-contain'
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
							<p className='paragraph-text'>
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
								image={rightArrowIcon}
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
