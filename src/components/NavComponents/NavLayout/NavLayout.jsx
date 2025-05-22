import React, { useEffect } from "react";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import Navbar from "../Navbar/Navbar";

function NavLayout({ children }) {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <div css={SLayout}>
            <Navbar />
            {children}
        </div>
    );
}

export default NavLayout;

const SLayout = css`
    position: relative;
    top: 20px;
`;
