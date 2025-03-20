import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header/>
      <div>
        <Routes>
          <Route path='/' element={ <Main/> }/>
          <Route path='/signin' element={ <Signin/> }/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
