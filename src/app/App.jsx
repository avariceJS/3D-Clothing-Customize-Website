// Pages
import Customizer from '@/pages/Customizer'
import HomePage from '@/pages/HomePage'

// Widgets
import Canvas from '@/widgets/ProductDisplay'

function App() {
	return (
		<main className='app transition-all ease-in'>
			<HomePage />
			<Canvas />
			<Customizer />
		</main>
	)
}

export default App
