import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import MainLogo from './assets/Logo.svg'
import './App.css';
function App() {
  return (
    <div className="flex">
      <Sidebar  MainLogo={MainLogo}/>
      <div className="flex-1 bg-gray-50">
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
