import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AuthRoute from "./components/Routes/AuthRoute";
import { useQuery } from "@tanstack/react-query";
import { instance } from "./api/config/instance";
import AccountRoute from "./components/Routes/AccountRoute";
import TripRoute from "./components/Routes/TripRoute";

const wrapper = css`
  width: 100%;
  min-height: 100vh;
`
const content = css`
  position: relative;
  margin-top: 100px;
  min-height: calc(100vh - 100px);
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
          <Route path='/account/*' element={ <AccountRoute/> }/>
          <Route path='/trip/*' element={ <TripRoute/> }/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
