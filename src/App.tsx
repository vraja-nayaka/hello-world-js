import { useStore } from 'effector-react';
import './App.css';
import { MapPage } from './pages/map';
import { PracticePage } from './pages/practice';
import { $currentLesson } from './shared/lib/store';

function App() {
    const currentLesson = useStore($currentLesson);
    console.log('🚀 ~ currentLesson:', currentLesson);

    return (
        <>
            <div id='appConfetti' className='appConfetti'></div>
            <div className='App'>
                {currentLesson === null && <MapPage />}
                {currentLesson !== null && <PracticePage />}
            </div>
        </>
    );
}

export default App;
