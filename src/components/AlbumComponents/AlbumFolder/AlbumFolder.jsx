import React from 'react';
/** @jsxImportSource @emotion/react */

import * as S from './Style';

function AlbumFolder({img, date, place}) {
    return (
        <div>
            <div css={S.SSortingBox}>
                <span>최신순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span>오래된 순</span>
            </div>
            <span>{"date"}&nbsp;{"place"}</span>
            <div css={S.SFolderContainer}>
                {/* 이게 하나임 */}
                <div>
                    <div css={S.SFolderTap}></div>
                    <div css={S.SFolderBody(img)}>
                        <span>{"place"}</span>
                        <span>{"date"}</span>
                    </div>
                </div>
                <div>
                    <div css={S.SFolderTap}></div>
                    <div css={S.SFolderBody(img)}>
                        <span>{"place"}</span>
                        <span>{"date"}</span>
                    </div>
                </div>
                <div>
                    <div css={S.SFolderTap}></div>
                    <div css={S.SFolderBody(img)}>
                        <span>{"place"}</span>
                        <span>{"date"}</span>
                    </div>
                </div>
                <div>
                    <div css={S.SFolderTap}></div>
                    <div css={S.SFolderBody(img)}>
                        <span>{"place"}</span>
                        <span>{"date"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumFolder;