import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import SigninContainer from "../../components/SigninContainer/SigninContainer";
import SigninButton from "../../components/SigninButton/SigninButton";
import { useSearchParams } from "react-router-dom";

function Signin(props) {
	const [isRightPanelActive, setIsRightPanelActive] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [searchParams] = useSearchParams();

	const handleSignUpClick = () => setIsRightPanelActive(true);
	const handleSignInClick = () => setIsRightPanelActive(false);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const isMobile = windowWidth <= 850;

	return (
		<div css={S.SLayout}>
			<div css={S.SContainer(isMobile)}>
				{isMobile ? (
					isRightPanelActive ? (
						<SigninContainer
							isSignin={false}
							isRightPanelActive={true}
                            setIsRightPanelActive={handleSignInClick}
							isMobile={isMobile}
						/>
					) : (
						<SigninContainer
							isSignin={true}
							isRightPanelActive={false}
                            setIsRightPanelActive={handleSignUpClick}
							isMobile={isMobile}
						/>
					)
				) : (
					<>
						<SigninContainer
							isSignin={true}
							isRightPanelActive={isRightPanelActive}
						/>
						<SigninContainer
							isSignin={false}
							isRightPanelActive={isRightPanelActive}
						/>
					</>
				)}

				{!isMobile && (
					<div css={S.SOverlayBox(isRightPanelActive)}>
						<div css={S.SOverlay(isRightPanelActive)}>
							<div css={S.SOverlayPanelLeft(isRightPanelActive)}>
								<h1>돌아오셨군요!</h1>
								<p>로그인 후 새로운 여행을 떠나볼까요?</p>
								<SigninButton onClick={handleSignInClick}>
									로그인
								</SigninButton>
							</div>
							<div css={S.SOverlayPanelRight(isRightPanelActive)}>
								<h1>어서오세요!</h1>
								<p>
									회원가입 후 나만의 여행 플랜을 만들어보세요!
								</p>
								<SigninButton onClick={handleSignUpClick}>
									회원가입
								</SigninButton>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Signin;
