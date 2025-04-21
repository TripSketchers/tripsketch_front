import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { LuImagePlus } from "react-icons/lu";
import {
    addPhoto,
    getAllPhotos,
    deletePhoto,
    clearPhotos
} from "../../../api/DB/AlbumDB";

function ImgUpload({ memos, setMemos }) {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const currentPhoto = photos[currentPage];

    // 사진 업로드 (IndexedDB에 저장)
    const handleImgChangeBtn = async (e) => {
        const files = Array.from(e.target.files);

        if (files.length + photos.length > 100) {
            alert("최대 100장까지만 저장할 수 있어요!");
            return;
        }

        for (const file of files) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64Url = event.target.result;
                await addPhoto(base64Url);
                fetchPhotos(); // 새로 가져오기
            };
            reader.readAsDataURL(file);
        }
    };

    // IndexedDB에서 사진 가져오기
    const fetchPhotos = async () => {
        const allPhotos = await getAllPhotos();
        setPhotos(allPhotos);
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleReselectionBtn = async () => {
        await clearPhotos();
        setPhotos([]);
        setCurrentPage(0);
        setMemos("");
    };

    const nextPage = () => {
        if (currentPage < photos.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleMemoChange = (e) => {
        const newMemo = e.target.value;
        // currentPage가 photos 배열 범위를 벗어난 경우 경고창 띄우기
        if (photos.length === 0 || currentPage === photos.length) {
            alert("먼저 사진을 선택해주세요!");
            return; // 텍스트 입력을 하지 않음
        }
        const currentId = photos[currentPage].id;

        setMemos((prev) => ({ ...prev, [currentId]: newMemo }));
    };

    return (
        <div css={S.SLayout}>
            <div css={S.STitleContainer}>
                <h3>사진 업로드</h3>
                <button onClick={handleReselectionBtn}>전체 초기화</button>
            </div>
            <div css={S.SContainer}>
                <div css={S.STopContainer}>
                    {currentPage > 0 && (
                        <button
                            className="imgButton leftButton"
                            onClick={prevPage}
                            disabled={currentPage === 0}
                        >
                            &lt;
                        </button>
                    )}
                    <div css={S.SImgBox}>
                        {photos.length > 0 && currentPhoto ? (
                            <img src={currentPhoto.photoUrl} alt="preview" />
                        ) : (
                            <label htmlFor="fileInput" css={S.SAddImg}>
                                <LuImagePlus />
                                <input
                                    id="fileInput"
                                    type="file"
                                    multiple
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleImgChangeBtn}
                                />
                            </label>
                        )}
                    </div>
                    {currentPage < photos.length && (
                        <button
                            className="imgButton rightButton"
                            onClick={nextPage}
                            disabled={currentPage === photos.length}
                        >
                            &gt;
                        </button>
                    )}
                </div>
                <div css={S.SBottomContainer}>
                    <textarea
                        value={memos[photos[currentPage]?.id] || ""}
                        onChange={handleMemoChange}
                        placeholder="사진에 대한 추억을 적어보세요!"
                    ></textarea>
                </div>
            </div>
            {/* <button onClick={handleUploadBtn}>임시 업로드 버튼</button> */}
        </div>
    );
}

export default ImgUpload;
