import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import NavLayout from "../../components/NavComponents/NavLayout/NavLayout";
import AlbumFolder from "../../components/AlbumComponents/AlbumFolder/AlbumFolder";
import NavContainer from "../../components/NavComponents/NavContainer/NavContainer";
import { Link, useLocation, useParams } from "react-router-dom";
import AlbumWhole from "../../components/AlbumComponents/AlbumWhole/AlbumWhole";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../api/config/instance";
import { HiPlus } from "react-icons/hi";
import { getNday } from "../../utils/DateUtils";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import Loading from "../../components/Loading/Loading";
import { useTrip } from "../../components/Routes/TripContext";

function TripAlbum(props) {
    const { firebaseUser, loading } = useFirebaseAuth();
    const queryClient = useQueryClient();
    const { tripId } = useParams();
    const location = useLocation();

    // 상태로 전달된 값 읽기
    const stateViewType = location.state?.viewType;
    const stateAlbumId = location.state?.albumId;
    const [viewType, setViewType] = useState(stateViewType ?? 0);
    const [sorting, setSorting] = useState(0); //최신순 : 0, 과거순: 1
    const [showSorting, setShowSorting] = useState(true);

    const handleRadioChange = (event) => {
        setViewType(event.target.value === "Whole" ? 0 : 1);
    };

    useEffect(() => {
        if (viewType === 1) {
            setShowSorting(true); // 폴더 보기 진입할 때 기본적으로 정렬 보이게
        }
    }, [viewType]);

    const getAlbum = useQuery({
        queryKey: ["getAlbum", tripId],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                const response = await instance.get(
                    `/trips/${tripId}/albums`,
                    options
                );
                return response.data; // 앨범 그룹 정보 + 첫 번째 사진 URL 포함
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    // 여기서 n일차 가공
    const sortedAlbums = Array.isArray(getAlbum?.data?.albums)
        ? [...getAlbum?.data?.albums]
              .map((item) => {
                  return {
                      ...item,
                      dayDiff: getNday(getAlbum?.data?.trip?.startDate, item.date),
                  };
              })
              .sort((a, b) => {
                  if (sorting === 0) {
                      return new Date(a.date) - new Date(b.date); // 오래된순
                  } else {
                      return new Date(b.date) - new Date(a.date); // 최신순
                  }
              })
        : [];

    if (!firebaseUser || loading || getAlbum.isLoading) {
        // 로그인 안했거나 로딩 중일 때
        const intro = loading ? "로딩 중..." : "로그인 후 이용 가능합니다.";
        return (
            <NavLayout>
                <NavContainer>
                    <Loading content={loading} />
                </NavContainer>
            </NavLayout>
        );
    }

    if (getAlbum.isError) return <div>데이터를 불러오지 못했습니다.</div>;

    return (
        <NavLayout>
            <NavContainer>
                <h1>{getAlbum?.data?.trip?.title}</h1>
                <div css={S.SViewTypeBox}>
                    <div className="switches-container">
                        <input
                            type="radio"
                            id="switchWhole"
                            name="switchPlan"
                            value="Whole"
                            checked={viewType === 0}
                            onChange={handleRadioChange}
                        />
                        <input
                            type="radio"
                            id="switchFolder"
                            name="switchPlan"
                            value="Folder"
                            checked={viewType === 1}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="switchWhole">전체보기</label>
                        <label htmlFor="switchFolder">폴더별 보기</label>
                        <div className="switch-wrapper">
                            <div className="switch">
                                <div>전체보기</div>
                                <div>폴더별 보기</div>
                            </div>
                        </div>
                    </div>
                    {showSorting && (
                        <div css={S.SSortingBox}>
                            <span
                                className={sorting === 0 ? "selected" : ""}
                                onClick={() => setSorting(0)}
                            >
                                오래된 순
                            </span>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <span
                                className={sorting === 1 ? "selected" : ""}
                                onClick={() => setSorting(1)}
                            >
                                최신순
                            </span>
                        </div>
                    )}
                </div>
                <div style={{ minHeight: "520px" }}>
                    {viewType === 0 ? (
                        <AlbumWhole albums={sortedAlbums} />
                    ) : (
                        <AlbumFolder
                            albums={sortedAlbums}
                            setShowSorting={setShowSorting}
                            stateAlbumId={stateAlbumId ?? null}
                        />
                    )}
                </div>
                <Link to={`/trip/album/${tripId}/upload`} css={S.SUploadBtn}>
                    <HiPlus /> 사진 업로드
                </Link>
            </NavContainer>
        </NavLayout>
    );
}

export default TripAlbum;
