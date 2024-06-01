import React from 'react'

import CustomButton from '@/features/CustomButton'

const ImageFileSelector = ({ file, setFile, readFile }) => { 
	return (
		<div className='filepicker-container'>
			<div className='flex-1 flex flex-col'>
				<input
					id='file-upload'
					type='file'
					accept='image/*'
					onChange={e => setFile(e.target.files[0])}
				/>
				<label htmlFor='file-upload' className='filepicker-label'>
					Загрузить
				</label>

				<p className='mt-2 text-gray-500 text-xs truncate'>
					{file === '' ? 'Файл не выбран' : file.name}
				</p>
			</div>

			<div className='mt-4 flex flex-wrap gap-3'>
				<CustomButton
					type='outline'
					title='Логотип'
					handleClick={() => readFile('logo')}
					customStyles='text-xs'
				/>
				<CustomButton
					type='filled'
					title='на весь'
					handleClick={() => readFile('full')}
					customStyles='text-xs'
				/>
			</div>
		</div>
	)
}

export default ImageFileSelector
