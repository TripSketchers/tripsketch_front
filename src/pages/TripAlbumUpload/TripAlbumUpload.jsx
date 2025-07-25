import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
import NavContainer from "../../components/NavComponents/NavContainer/NavContainer";
import ImgUpload from "../../components/AlbumComponents/ImgUpload/ImgUpload";
import { instance } from "../../api/config/instance";
import { storage } from "../../api/Firebase/Firebase"; // Firebase Storage 설정
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAllPhotos, clearPhotos } from "../../api/DB/AlbumDB";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleTable from "../../components/AlbumComponents/ScheduleTable/ScheduleTable";
import Loading from "../../components/Loading/Loading";
import usePrompt from "../../hooks/usePrompt";
import { getAuth } from "firebase/auth";
import SwalAlert from "../../components/SwalAlert/SwalAlert";
import useGroupedSchedule from "../../hooks/useGroupedSchedule";

function TripAlbumUpload() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [selectedSchedule, setSelectedSchedule] = useState({});
    const [memos, setMemos] = useState({});
    const [pageLoading, setPageLoading] = useState(false);

    const [hasUnsavedPhotos, setHasUnsavedPhotos] = useState(false);

    const { groupedSchedule, isLoading, refetch } = useGroupedSchedule(tripId);

    useEffect(() => {
        const auth = getAuth();
        if (!auth.currentUser) {
            SwalAlert({
                title: "로그인이 필요합니다!",
                text: "로그인 페이지로 이동합니다.",
                icon: "error",
                onConfirm: () => {
                    navigate("/auth/signin");
                },
            });
        }
    }, []);

    // usePrompt로 페이지 이동을 차단
    usePrompt(
        hasUnsavedPhotos,
        "아직 업로드하지 않은 사진이 있어요. 페이지를 벗어나시겠어요?"
    );

    useEffect(() => {
        refetch().then((result) => {
            clearPhotos();
            if (!result.data?.data?.tripSchedulePlaceViews?.length) {
                SwalAlert({
                    title: "등록된 일정이 없어요. ",
                    text: "먼저 여행 일정을 추가해 주세요!\n여행 계획 페이지로 이동합니다.",
                    icon: "warning",
                    confirmButtonText: "이동하기",
                    onConfirm: () => {
                        navigate(`/trip/plan/${tripId}`);
                    },
                });
            }
        });
    }, [tripId, refetch]);

    const handleUploadBtn = async () => {
        const auth = getAuth();

        if (!auth.currentUser) {
            SwalAlert({
                title: "로그인이 필요합니다!",
                text: "로그인 페이지로 이동합니다.",
                icon: "error",
                onConfirm: () => {
                    navigate("/auth/signin");
                },
            });
            return;
        }
        const photos = await getAllPhotos(); //IndexedDB에서 사진 가져오기

        if (photos.length === 0) {
            SwalAlert({
                title: `업로드할 사진이 없어요!`,
                text: `업로드할 사진을 먼저 선택해주세요.`,
                icon: "error",
            });
            return;
        }
        if (selectedSchedule.length === 0) {
            SwalAlert({
                title: `장소를 선택해주세요!`,
                text: `장소를 선택하지 않으면 사진을 업로드할 수 없어요.`,
                icon: "error",
            });
            return;
        }

        setPageLoading(true); // 로딩 시작

        try {
            const uploadPromises = photos.map(async (photo) => {
                const storageRef = ref(
                    storage,
                    `tripsketch/trip-${tripId}/album-${selectedSchedule.tripScheduleId}/${photo.id}.jpg`
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
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            const album = {
                tripScheduleId: selectedSchedule?.tripScheduleId,
                date: selectedSchedule?.date,
                placeName: selectedSchedule?.placeName,
                startTime: selectedSchedule?.startTime,
                photos: uploadedPhotos,
            };
            // 이제 DB에 메타데이터 저장
            await instance.post(`/trips/${tripId}/album`, album, option);
            await clearPhotos(); // 업로드 완료 후 초기화
            SwalAlert({
                title: `사진 업로드 완료!`,
                icon: "success",
            });
        } catch (error) {
            SwalAlert({
                title: `사진 업로드 실패!`,
                text: "업로드 중 오류가 발생했어요.\n다시 시도해주세요.",
                icon: "error",
            });
        } finally {
            setPageLoading(false); // 로딩 종료
            setHasUnsavedPhotos(false); // 상태 초기화
            navigate(`/trip/album/${tripId}`);
        }
    };

    return (
        <NavLayout>
            <NavContainer>
                {isLoading || groupedSchedule.length === 0 ? (
                    <Loading content={"일정 데이터를 불러오고 있어요..."} />
                ) : pageLoading ? (
                    <Loading
                        content={"업로드 중입니다. 잠시만 기다려주세요!"}
                    />
                ) : (
                    <div css={S.SLayout}>
                        <div css={S.SLeftContainer}>
                            <ImgUpload
                                memos={memos}
                                setMemos={setMemos}
                                onPhotosChange={(hasPhotos) =>
                                    setHasUnsavedPhotos(hasPhotos)
                                }
                            />
                        </div>
                        <div css={S.SRightContainer}>
                            <div className="titleBox">
                                <h3>장소 선택</h3>
                                <span>※ 장소는 사진 전체에 적용됩니다.</span>
                            </div>
                            <div css={S.STripBox}>
                                <ScheduleTable
                                    selectedSchedule={selectedSchedule}
                                    setSelectedSchedule={setSelectedSchedule}
                                    scheduleData={groupedSchedule}
                                />
                            </div>
                            <button
                                css={S.SUploadButton}
                                onClick={handleUploadBtn}
                            >
                                업로드
                            </button>
                        </div>
                    </div>
                )}
            </NavContainer>
        </NavLayout>
    );
}

export default TripAlbumUpload;
