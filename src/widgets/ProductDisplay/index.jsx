import { Center, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState, useCallback } from 'react';

import Shirt from '@/entities/Shirt';
import Socks from '@/entities/Socks';
import Underpants from '@/entities/Underpants';
import Pants from '@/entities/Pants';
import ModelViewControl from '@/features/ModelViewControl';
import state from '@/entities/Shirt/model/store';

const ProductDisplay = () => {
    const [currentClothing, setCurrentClothing] = useState(state.currentClothing || 'shirt');

    useEffect(() => {
        const storedClothing = localStorage.getItem('currentClothing');
        if (storedClothing && storedClothing !== currentClothing) {
            setCurrentClothing(storedClothing);
            state.currentClothing = storedClothing;
        }
    }, [currentClothing]);

    const renderClothingModel = useCallback(() => {
        switch (currentClothing) {
            case 'shirt':
                return <Shirt />;
            case 'socks':
                return <Socks />;
            case 'underpants':
                return <Underpants />;
            case 'pants':
                return <Pants />;
            default:
                return <Shirt />;
        }
    }, [currentClothing]);

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

                <Center>
                    {renderClothingModel()}
                </Center>
            </ModelViewControl>
        </Canvas>
    );
};

export default ProductDisplay;
