// Default transition configuration
export const transition = { type: 'spring', duration: 0.8 }

// Function to generate slide animations based on direction
export const slideAnimation = direction => {
	return {
		initial: {
			x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
			y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
			opacity: 0,
			transition: { ...transition, delay: 0.5 },
		},
		animate: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: { ...transition, delay: 0 },
		},
		exit: {
			x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
			y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
			transition: { ...transition, delay: 0 },
		},
	}
}

// Fade animation configuration
export const fadeAnimation = {
	initial: {
		opacity: 0,
		transition: { ...transition, delay: 0.5 },
	},
	animate: {
		opacity: 1,
		transition: { ...transition, delay: 0 },
	},
	exit: {
		opacity: 0,
		transition: { ...transition, delay: 0 },
	},
}

// Animation configuration for heading text
export const headTextAnimation = {
	initial: { x: 100, opacity: 0 },
	animate: { x: 0, opacity: 1 },
	transition: {
		type: 'spring',
		damping: 5,
		stiffness: 40,
		restDelta: 0.001,
		duration: 0.3,
	},
}

// Animation configuration for heading content
export const headContentAnimation = {
	initial: { y: 100, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	transition: {
		type: 'spring',
		damping: 7,
		stiffness: 30,
		restDelta: 0.001,
		duration: 0.6,
		delay: 0.2,
		delayChildren: 0.2,
	},
}

// Animation configuration for heading container
export const headContainerAnimation = {
	initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
	animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
	exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
}
