import React, { useEffect, useState } from 'react';
import { storage } from "../../../api/Firebase/Firebase"; // Firebase Storage 설정
import { ref, uploadString } from "firebase/storage";
import Dexie from "dexie"; // IndexedDB 라이브러리
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import { LuImagePlus } from "react-icons/lu";

// IndexedDB 설정
const db = new Dexie("ImageDatabase");
db.version(1).stores({
    images: "++id, base64", // auto-increment ID, base64 데이터 저장
});

function ImgUpload({ userID, tripID, date, place }) {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const currentImage = images[currentPage];

    useEffect(() => {
        const loadImages = async () => {
            const savedImages = await db.images.toArray();
            setImages(savedImages.map((img) => img.base64));
        };
        loadImages();
    }, []);

    const handleImgChangeBtn = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (images.length + selectedFiles.length > 100) {
            alert("최대 100장까지 업로드 가능합니다.");
            return;
        }

        const readers = selectedFiles.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers).then(async (base64Images) => {
            await db.images.bulkAdd(base64Images.map((base64) => ({ base64 })));
            setImages((prev) => [...prev, ...base64Images]);
        });
    };

    const handleReselectionBtn = async () => {
        await db.images.clear();
        setImages([]);
        setCurrentPage(0);
    };

    const handleUploadBtn = async () => {
        if (images.length === 0) {
            alert("업로드할 이미지가 없습니다.");
            return;
        }

        try {
            await Promise.all(
                images.map((image, index) => {
                    const storageRef = ref(storage, `albums/${userID}/${tripID}/${date}/${place}/${index}.jpg`);
                    return uploadString(storageRef, image, "data_url");
                })
            );
            alert("모든 파일 업로드 완료!");
            await db.images.clear();
            setImages([]);
            setCurrentPage(0);
        } catch (error) {
            console.error("파일 업로드 실패:", error);
            alert("업로드 실패");
        }
    };

    const nextPage = () => {
        if (currentPage < images.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    return (
        <div css={S.SLayout}>
            <div css={S.STitleContainer}>
                <h3>사진 업로드</h3>
                <button onClick={handleReselectionBtn}>사진 초기화</button>
            </div>
            <div css={S.SContainer}>
                <div css={S.STopContainer}>
                    {currentPage > 0 && <button className='imgButton leftButton' onClick={prevPage} disabled={currentPage === 0}>&lt;</button>}
                    <div css={S.SImgBox}>
                        {currentPage < images.length ?
                            <img src={currentImage} alt="preview" />
                            : <label htmlFor="fileInput" css={S.SAddImg} >
                                <LuImagePlus />
                                <input id='fileInput' type="file" multiple 
                                accept="image/png, image/jpeg, image/jpg" 
                                onChange={handleImgChangeBtn} />
                            </label>
                        }
                        </div>
                    {currentPage < images.length && <button className='imgButton rightButton' onClick={nextPage} disabled={currentPage === images.length}>&gt;</button>}
                </div>
                <div css={S.SBottomContainer}>
                    <textarea name="" id="" placeholder='사진에 대한 추억을 적어보세요!'></textarea>
                </div>
            </div>
            <button onClick={handleUploadBtn}>임시 업로드 버튼</button>
        </div>
    );
}

export default ImgUpload;
