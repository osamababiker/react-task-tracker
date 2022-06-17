import { Routes , Route } from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';
import Home from './components/Home';

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
