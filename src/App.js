import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Filter from './Components/Filter';
import Home from "./Components/Home";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import Login from "./Components/Login";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          {/* Uncomment Navbar and Filter if needed */}
          <Navbar />
          <Filter />
          <Login/>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
