import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MosquitoKillerDesktop from './components/MosquitoKillerDesktop';
import MosquitoKillerMobile from './components/MosquitoKillerMobile';

function App() {

  console.log("window.screen ", window.screen.availWidth);
  return (
    <div className="MainContainer">
      <Header />
      {window.screen.availWidth && window.screen.availWidth <= 768 ?
        <MosquitoKillerMobile /> : <MosquitoKillerDesktop />
      }
      <Footer />
    </div>
  );
}

export default App;
