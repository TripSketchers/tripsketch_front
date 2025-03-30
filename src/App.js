import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Signin from "./pages/Signin/Signin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Album from "./pages/Album/Album";
import Plan from "./pages/Plan/Plan";
import AlbumUpload from "./pages/AlbumUpload/AlbumUpload";

const wrapper = css`
  /* display: flex;
  flex-direction: column; */
  width: 100%;
  min-height: 100vh;
`
const content = css`
  min-height: calc(100vh - 220px);
  /* flex: 1; */
`;

function App() {
  return (
    <div css={wrapper}>
      <Header/>
      <div css={content}>
        <Routes>
          <Route path='/' element={ <Main/> }/>
          <Route path='/signin' element={ <Signin/> }/>
          <Route path="/album" element={<Album />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/album/upload" element={<AlbumUpload />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
