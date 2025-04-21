import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
import NavContainer from "../../components/NavComponents/NavContainer/NavContainer";
import ImgUpload from "../../components/AlbumComponents/ImgUpload/ImgUpload";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../api/config/instance";
import { storage } from "../../api/Firebase/Firebase"; // Firebase Storage 설정
import { ref, uploadString, getDownloadURL  } from "firebase/storage";
import { getAllPhotos, clearPhotos } from "../../api/DB/AlbumDB";
import { useNavigate } from "react-router-dom";

function TripAlbumUpload({ tripId }) {
    const navigate = useNavigate();
    // 날짜 클릭 시 해당하는 place 목록을 1열부터 순서대로 배치
    const [selectedDate, setSelectedDate] = useState(-1);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);

    const [memos, setMemos] = useState({});

    // 날짜 클릭 시 해당하는 장소 목록 업데이트
    const handleDateClick = (index) => {
        setSelectedDate(index);
        const places =
            getTripSchedule?.data?.data?.tripSchedules[index].places || [];
        setSelectedPlaces(places);
    };

    // 장소 클릭 시 trip_schedule_id 출력
    const handlePlaceClick = (id) => {
        setSelectedPlaceId(id);
    };

    const getTripSchedule = useQuery({
        queryKey: ["getTripSchedule", tripId],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                return await instance.get(`/trips/${1}/schedules`, options);
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const handleUploadBtn = async () => {
        const photos = await getAllPhotos();    //IndexedDB에서 사진 가져오기

        if (photos.length === 0) {
            alert("업로드할 사진이 없어요!");
            return;
        }

        const uploadedPhotos = [];

        for (const photo of photos) {
            const storageRef = ref(storage, `tripsketch/trip/${1}/albums/${selectedPlaceId}/${Date.now()}.jpg`);
            await uploadString(storageRef, photo.photoUrl, "data_url");
            const downloadUrl = await getDownloadURL(storageRef);
            
            uploadedPhotos.push({
                photoUrl: downloadUrl,
                memo: memos[photo.id] || ""
            });
        }

        try {
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
            await instance.post(`/trips/${1}/album`, album, option);
            await clearPhotos(); // 업로드 완료 후 초기화
            alert("사진 업로드 완료!");
            navigate(`/trip/album/${1}`);
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
                            <div css={S.STripTable}>
                                {/* 날짜 목록 (가로 스크롤 가능) */}
                                <div>
                                    <div className="title">날짜</div>
                                    <ul css={S.SScroll}>
                                        {getTripSchedule?.data?.data?.tripSchedules.map(
                                            (item, index) => (
                                                <li
                                                    key={index}
                                                    css={S.SSelectSchedule(
                                                        selectedDate === index
                                                    )}
                                                    onClick={() =>
                                                        handleDateClick(index)
                                                    }
                                                >
                                                    {index + 1}일차
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    {/* 장소 목록 (세로 스크롤 가능) */}
                                    <div className="title">장소</div>
                                    <ul css={S.SScroll}>
                                        {selectedPlaces.map((item) => (
                                            <li
                                                key={item.tripScheduleId}
                                                css={S.SSelectSchedule(
                                                    item.tripScheduleId ===
                                                        selectedPlaceId
                                                )}
                                                onClick={() =>
                                                    handlePlaceClick(
                                                        item.tripScheduleId
                                                    )
                                                }
                                            >
                                                {item.place}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
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
