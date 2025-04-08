import React, { useEffect, useState } from 'react';
import { storage } from "../../../api/Firebase/Firebase"; // Firebase Storage 설정
import { ref, uploadString } from "firebase/storage";
import Dexie from "dexie"; // IndexedDB 라이브러리
/** @jsxImportSource @emotion/react */
import * as S from './Style';

// IndexedDB 설정
const db = new Dexie("ImageDatabase");
db.version(1).stores({
    images: "++id, base64", // auto-increment ID, base64 데이터 저장
});

function ImgUpload({ userID, tripID, date, place }) {
    const [images, setImages] = useState([]);

    const itemsPerPage = 4; // 한 페이지당 이미지 수
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

    // 페이지네이션에 따른 이미지 가져오기
    const indexOfLastImage = (currentPage + 1) * itemsPerPage;
    const indexOfFirstImage = indexOfLastImage - itemsPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    // "다음 페이지" 버튼 클릭
    const nextPage = () => {
        if (currentPage < Math.ceil(images.length / itemsPerPage) - 1) {
        setCurrentPage(currentPage + 1);
        }
    };

    // "이전 페이지" 버튼 클릭
    const prevPage = () => {
        if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        }
    };

    // 컴포넌트 마운트 시 IndexedDB에서 이미지 불러오기
    useEffect(() => {
        const loadImages = async () => {
            const savedImages = await db.images.toArray(); // 데이터 로드가 완료될 때까지 기다림
            setImages(savedImages.map((img) => img.base64)); // 데이터가 로드된 후 실행
        };
        loadImages();
    }, []);

    const handleImgChangeBtn = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // 업로드 개수 제한
        if (images.length + selectedFiles.length > 100) {
            alert("최대 100장까지 업로드 가능합니다.");
            return;
        }

        // 파일을 base64로 변환
        const readers = selectedFiles.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result); // Base64 변환
                reader.readAsDataURL(file);
            });
        });

        // IndexedDB에 저장
        Promise.all(readers).then(async (base64Images) => {
            // IndexedDB에 저장
            await db.images.bulkAdd(base64Images.map((base64) => ({ base64 })));

            // 저장된 데이터 콘솔에 출력
            const savedImages = await db.images.toArray();
            console.log("저장된 이미지:", savedImages);

            // 상태 업데이트 (UI에서 미리보기를 위해)
            setImages((prev) => [...prev, ...base64Images]);
        });
    };

    const handleReselectionBtn = () => {
        setImages([]);
    }

    // Firebase Storage 업로드
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

            // IndexedDB에서 삭제
            await db.images.clear();
            setImages([]);

        } catch (error) {
            console.error("파일 업로드 실패:", error);
            alert("업로드 실패");
        }
    };

    

    return (
        <div css={S.SLayout} >
            <input type="file" multiple accept="image/png, image/jpeg, image/jpg" onChange={handleImgChangeBtn} />
            <div>
                <div css={S.SContainer}>
                    {currentImages.map((img, index) => (
                        <img key={index} src={img} alt={`preview`} />
                ))}
            </div>
            </div>
            { images.length > 5 && (
                <div css={S.SButtonBox}>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                >&lt;</button>

                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(images.length / itemsPerPage) - 1}
                >&gt;</button>
                </div>
            )}
            <button onClick={handleUploadBtn}>임시 업로드 버튼</button>
            <button onClick={handleReselectionBtn}>다시 선택</button>
        </div>
    );
}

export default ImgUpload;