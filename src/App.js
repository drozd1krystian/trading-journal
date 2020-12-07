import Header from "./components/Header";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard";
import "./sass/styles.scss";

function App() {
  return (
    <div className="dark_theme" id="app">
      <Header />
      <Menu />
      <Dashboard />
    </div>
  );
}

export default App;
