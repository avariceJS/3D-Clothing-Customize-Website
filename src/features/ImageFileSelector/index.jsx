// Base
import React from 'react'

// Features -> Button
import CustomButton from '@/features/CustomButton'

// Icons
import { downloadIcon } from '@/public'

const ImageFileSelector = ({ file, setFile, readFile, tabWidth }) => {
	
	// Calculate modal width based on tab width
	const modalWidth = tabWidth * 0.9

	return (
		<div className='filepicker-container' style={{ width: `${modalWidth}px` }}>
			<div className='flex-1 flex flex-col'>
				<input
					id='file-upload'
					type='file'
					accept='image/*'
					onChange={e => setFile(e.target.files[0])}
				/>
				<label htmlFor='file-upload' className='filepicker-label'>
					Загрузить
					<img src={downloadIcon} alt='logo' className='w-4 h-4 ml-[5px]' />
				</label>
				<p className='mt-2 text-gray-700 text-[13px] truncate'>
					{file === '' ? 'Файл не выбран' : file.name}
				</p>
			</div>

			<div className='mt-4 flex flex-wrap gap-3'>
				<CustomButton
					type='outline'
					title='Логотип'
					handleClick={() => readFile('logo')}
					customStyles='text-base justify-center text-white py-1.5'
				/>
				<CustomButton
					type='filled'
					title='Принт'
					handleClick={() => readFile('full')}
					customStyles='text-base text-white bg-red-500 justify-center py-1.5'
				/>
			</div>
		</div>
	)
}

export default ImageFileSelector
