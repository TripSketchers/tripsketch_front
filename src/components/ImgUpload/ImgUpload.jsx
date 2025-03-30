import React, { useEffect, useRef, useState } from 'react';
import { storage } from "../../api/Firebase/Firebase"; // Firebase Storage 설정
import { ref, uploadString } from "firebase/storage";
import Dexie from "dexie"; // IndexedDB 라이브러리

// IndexedDB 설정
const db = new Dexie("ImageDatabase");
db.version(1).stores({
    images: "++id, base64", // auto-increment ID, base64 데이터 저장
});

function ImgUpload({userID, tripID, date, place}) {
    const [images, setImages] = useState([]);
    const ImgInput = useRef();

    // 컴포넌트 마운트 시 IndexedDB에서 이미지 불러오기
    // IndexedDB에서 데이터를 가져오는 함수는 항상 비동기(Promise) 방식
    useEffect(() => {
        const loadImages = async () => {
          const savedImages = await db.images.toArray();    // 데이터 로드가 완료될 때까지 기다림
          setImages(savedImages.map((img) => img.base64));  // 데이터가 로드된 후 실행
        };
        loadImages();
      }, []);

    const handleImgChange  = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        //업로드 개수 제한
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
            })
        });

        // IndexedDB에 저장
        Promise.all(readers).then(base64Images => {
            setImages((prev) => [...prev, ...base64Images]);   // base64Images를 사용하여 상태 업데이트
        });
    };

    // Firebase Storage 업로드
    const handleUpload = async () => {
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
        <div>
            <input type="file" multiple accept="image/png, image/jpeg, image/jpg" />
            <div>
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`preview`} onChange={handleImgChange} width={100} style={{ margin: 5 }} />
                ))}
            </div>
        </div>
    );
}

export default ImgUpload;