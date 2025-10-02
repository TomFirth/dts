import { Outlet } from "react-router";
import './App.css';

import Navigation from './partials/Navigation';
import Search from './partials/Search';

function App() {
  return (
    <div>
      <Navigation />
      <Search />
      <Outlet />
    </div>
  );
}

export default App;
