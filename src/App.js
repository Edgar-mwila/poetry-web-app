import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register_login from './components/register-login';
import HomePage from './components/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/'  exact Component = {Register_login}/>
          <Route path='/Home'  exact Component = {HomePage}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
