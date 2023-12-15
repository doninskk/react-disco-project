import './App.css'
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} /> 
        <Route path="/event/:eventId" element={<EventDetail />} />
      </Routes>
    </Router>
  );
};

export default App
