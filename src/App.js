import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Signin from "./pages/Signin/Signin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const wrapper = css`
  width: 100%;
  height: 100vh;
`
const content = css`
  min-width: 1000px;
  min-height: calc(100vh - 242px);
`;

function App() {
  return (
    <div css={wrapper}>
      <Header/>
      <div css={content}>
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
