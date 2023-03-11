import { useStore } from 'effector-react';
import './App.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { MapPage } from './pages/map';
import { PracticePage } from './pages/practice';
import { $currentLesson } from './shared/lib/store';

function App() {
    const currentLesson = useStore($currentLesson);

    return (
        <>
            <div id='appConfetti' className='appConfetti'></div>
            <div className='App'>
                {currentLesson === null && <MapPage />}
                {currentLesson !== null && <PracticePage currentLesson={currentLesson} />}
            </div>
        </>
    );
}

export default App;
