import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import DailyJournal from "./pages/DailyJournal";
import Dashboard from "./pages/Dashboard";
import "./sass/styles.scss";

function App() {
  return (
    <div className="dark_theme" id="app">
      <Header />
      <Menu />
      {/* <Dashboard /> */}
      <DailyJournal />
      <Footer />
    </div>
  );
}

export default App;
