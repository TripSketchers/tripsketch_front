import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import MainImg from "../../../assets/MainImg.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCalendarCheck } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { FaBus } from "react-icons/fa";
import { differenceInDays } from "date-fns";
import { instance } from "../../../api/config/instance";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// startDate, endDate로 D-Day와 n박 n일을 반환하는 함수
function getTripInfo(startDate, endDate) {
    if (!startDate || !endDate) return { dDay: "-", period: "-" };
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // D-Day 계산
    const diff = differenceInDays(start, today) + 1;
    let dDay;
    if (diff === 0) dDay = "D - Day";
    if (diff > 0) dDay = `D - ${diff}`;

    // n박 n일 계산
    const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
    const days = nights + 1;
    const period = `${nights}박 ${days}일`;

    return { dDay, period };
}

function RecentTrips({ getUpcomingTrip }) {
    const navigate = useNavigate();
    const { dDay, period } = getTripInfo(
        getUpcomingTrip?.startDate,
        getUpcomingTrip?.endDate
    );

    const getRecentAlbums = useQuery({
        queryKey: ["getRecentAlbums"],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                const response = await instance.get(
                    `/main/recent-albums`,
                    options
                );
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <div css={S.SLeftContainer}>
                    <h2>다가오는 여행 일정보기</h2>
                    <div
                        css={S.STripBox}
                        onClick={() =>
                            navigate(`/trip/plan/${getUpcomingTrip?.tripId}`)
                        }
                    >
                        <div className="info">
                            <div className="dDay">{dDay}</div>
                            <span className="tripTitle">
                                {getUpcomingTrip.title}
                            </span>
                        </div>
                        <div className="summary">
                            <h3 className="containIcon">
                                <FaLocationDot />
                                {getUpcomingTrip.tripDestinationKoName}
                            </h3>
                            <span className="containIcon">
                                <BiSolidCalendarCheck />
                                {getUpcomingTrip.startDate} ~{" "}
                                {getUpcomingTrip.endDate} ({period})
                            </span>
                            <span className="containIcon">
                                {getUpcomingTrip.transportType == 0 ? (
                                    <>
                                        <FaBus /> 대중교통
                                    </>
                                ) : (
                                    <>
                                        <AiFillCar /> 자동차
                                    </>
                                )}
                            </span>
                        </div>
                        <img src={getUpcomingTrip.img} alt="" />
                    </div>
                </div>
                <div css={S.SRightContainer}>
                    <h2>최근 앨범 보러가기</h2>
                    <div>
                        {getRecentAlbums?.data &&
                        getRecentAlbums.data.length > 0 ? (
                            getRecentAlbums?.data?.map((album, idx) => (
                                <div
                                    className={`albumBox albumBox-count-${getRecentAlbums.data.length} albumBox-idx-${idx + 1}`}
                                    key={album.tripId}
                                    onClick={() =>
                                        navigate(
                                            `/trip/album/${album.tripId}`,
                                            {
                                                state: {
                                                    viewType: 1,
                                                    albumId: album.albumId,
                                                },
                                            }
                                        )
                                    }
                                >
                                    <img src={album.photoUrl} alt="" />
                                </div>
                            ))
                        ) : (
                            <button
                                css={S.SNoAlbum}
                                onClick={() =>
                                    navigate(
                                        `/trip/album/${getUpcomingTrip?.tripId}`
                                    )
                                }
                            >
                                + 새 앨범 만들기
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentTrips;
