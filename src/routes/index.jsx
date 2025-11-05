// src/App.jsx or src/routes/index.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WomenwearRoute from './routes/WomenwearRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/womenwear" element={<WomenwearRoute />} />
                {/* Add other routes */}
            </Routes>
        </Router>
    );
}

export default App;