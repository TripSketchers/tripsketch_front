import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import logo from '../../assets/TripSketch.png'


function Footer(props) {
    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <div>
                    <div css={S.SBox}>
                        <img src={logo} alt="" />
                        <div>
                            팀명: Sketchers <br />
                            개발자 : 정가영, 변정민
                        </div>
                    </div>
                    <div>
                        © 2025 Sketchers. All rights reserved. <br />  
                        This website and its contents are protected by copyright law.
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Footer;