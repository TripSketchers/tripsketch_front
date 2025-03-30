import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AuthRoute from "./components/Routes/AuthRoute";
import { useQuery } from "@tanstack/react-query";
import { instance } from "./api/config/instance";

const wrapper = css`
  width: 100%;
  height: 100vh;
`
const content = css`
  min-height: calc(100vh - 220px);
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
          <Route path='/auth/*' element={ <AuthRoute/> }/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
