import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Album from "./pages/Album/Album";
import Plan from "./pages/Plan/Plan";
import AlbumUpload from "./pages/AlbumUpload/AlbumUpload";
import AuthRoute from "./components/Routes/AuthRoute";
import { useQuery } from "@tanstack/react-query";
import { instance } from "./api/config/instance";
import AccountRoute from "./components/Routes/AccountRoute";

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
  
  const getPrincipal = useQuery({
    queryKey: ["getPrincipal"],
    queryFn: async () => {
      try {
        const option = {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        };
        return await instance.get("/account/principal", option);
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: 0,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  if(getPrincipal.isLoading) {
    return <></>;
  }

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
          <Route path='/auth/*' element={ <AuthRoute/> }/>
          <Route path='/account/*' element={ <AccountRoute/> }/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
