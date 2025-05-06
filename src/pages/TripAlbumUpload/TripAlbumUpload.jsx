import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
import NavContainer from "../../components/NavComponents/NavContainer/NavContainer";
import ImgUpload from "../../components/AlbumComponents/ImgUpload/ImgUpload";
import { instance } from "../../api/config/instance";
import { storage } from "../../api/Firebase/Firebase"; // Firebase Storage 설정
import { ref, getDownloadURL, uploadBytes  } from "firebase/storage";
import { getAllPhotos, clearPhotos } from "../../api/DB/AlbumDB";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleTable from "../../components/AlbumComponents/ScheduleTable/ScheduleTable";

function TripAlbumUpload() {
    const { tripId } = useParams();

    const navigate = useNavigate();
    const [selectedPlaceId, setSelectedPlaceId] = useState([]);
    const [memos, setMemos] = useState({});

    const handleUploadBtn = async () => {
        const photos = await getAllPhotos();    //IndexedDB에서 사진 가져오기

        if (photos.length === 0) {
            alert("업로드할 사진이 없어요!");
            return;
        }

        try {
            const uploadPromises = photos.map(async (photo) => {
                const storageRef = ref(
                    storage,
                    `tripsketch/trip/${tripId}/albums/${selectedPlaceId}/${photo.id}.jpg`
                );
                await uploadBytes(storageRef, photo.file);
                const downloadUrl = await getDownloadURL(storageRef);
    
                return {
                    photoUrl: downloadUrl,
                    memo: memos[photo.id] || "",
                };
            });
    
            const uploadedPhotos = await Promise.all(uploadPromises);

            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
            const album = {
                tripScheduleId: selectedPlaceId,
                photos: uploadedPhotos
            }
            console.log(album);
            // 이제 DB에 메타데이터 저장
            await instance.post(`/trips/${tripId}/album`, album, option);
            await clearPhotos(); // 업로드 완료 후 초기화
            alert("사진 업로드 완료!");
            navigate(`/trip/album/${tripId}`);

        }catch (error) {
            alert(error.response.data.sendFail);
        }
    };

    return (
        <NavLayout>
            <NavContainer>
                <div css={S.SLayout}>
                    <div css={S.SLeftContainer}>
                        <ImgUpload memos={memos} setMemos={setMemos}/>
                    </div>
                    <div css={S.SRightContainer}>
                        <div className="titleBox">
                            <h3>장소 선택</h3>
                            <span>※ 장소는 사진 전체에 적용됩니다.</span>
                        </div>
                        <div css={S.STripBox}>
                            <ScheduleTable selectedPlaceId={selectedPlaceId} setSelectedPlaceId={setSelectedPlaceId}/>
                        </div>
                        <button css={S.SUploadButton} onClick={handleUploadBtn}>
                            업로드
                        </button>
                    </div>
                </div>
            </NavContainer>
        </NavLayout>
    );
}

export default TripAlbumUpload;
