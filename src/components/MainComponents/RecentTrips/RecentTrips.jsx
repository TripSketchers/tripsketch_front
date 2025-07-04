import React from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidCalendarCheck } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { FaBus } from "react-icons/fa";
import { instance } from "../../../api/config/instance";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IoIosImages } from "react-icons/io";
import { getNightandDays } from "../../../utils/DateUtils";
import Loading from "../../Loading/Loading";

function RecentTrips() {
    const navigate = useNavigate();

    const getUpcomingTrip = useQuery({
        queryKey: ["getTripDestinations"],
        queryFn: async () => {
            try {
                const options = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                const response = await instance.get(
                    `/main/upcoming-trip`,
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

    const { dDay, period } = getNightandDays(
        getUpcomingTrip?.data?.startDate,
        getUpcomingTrip?.data?.endDate
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

    console.log(getRecentAlbums?.data);

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <div css={S.SLeftContainer}>
                    <h2>다가오는 여행 일정보기</h2>
                    {getUpcomingTrip.isLoading ? (
                        <Loading content="여행 정보를 불러오는 중입니다..." />
                    ) : getUpcomingTrip?.data.tripId ? (
                        <div
                            css={S.STripBox}
                            onClick={() => {
                                navigate(
                                    `/trip/album/${getUpcomingTrip.data.tripId}`
                                );
                            }}
                        >
                            <div className="info">
                                <div className="dDay">{dDay}</div>
                                <span className="tripTitle">
                                    {getUpcomingTrip?.data?.title}
                                </span>
                            </div>
                            <div className="summary">
                                <h3 className="containIcon">
                                    <FaLocationDot />
                                    {
                                        getUpcomingTrip.data
                                            ?.tripDestinationKoName
                                    }
                                </h3>
                                <span className="containIcon">
                                    <BiSolidCalendarCheck />
                                    {getUpcomingTrip.data?.startDate} ~{" "}
                                    {getUpcomingTrip.data?.endDate} ({period})
                                </span>
                                <span className="containIcon">
                                    {getUpcomingTrip.data?.transportType ==
                                    0 ? (
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
                            <img src={getUpcomingTrip.data?.img} alt="" />
                        </div>
                    ) : (
                        <div css={S.SNoAlbum}>
                            <div>
                                <span>
                                    <IoIosImages /> 예정된 여행이 없습니다
                                    <br />
                                </span>
                                <p>새로운 여행계획을 세워보세요!</p>
                            </div>
                        </div>
                    )}
                </div>
                <div css={S.SRightContainer}>
                    <h2>최근 앨범 보러가기</h2>
                    <div className={`albumContainer albumContainer-${getRecentAlbums?.data?.length}`}>
                        {getRecentAlbums?.data &&
                        getRecentAlbums?.data?.length > 0 ? (
                            getRecentAlbums?.data?.map((album, idx) => (
                                <div
                                    className={`albumBox albumBox-count-${
                                        getRecentAlbums.data.length
                                    } albumBox-idx-${idx + 1}`}
                                    key={album.tripId}
                                    onClick={() => {
                                        navigate(
                                            `/trip/album/${album.tripId}`,
                                            {
                                                state: {
                                                    viewType: 1,
                                                    albumId: album.albumId,
                                                },
                                            }
                                        );
                                    }}
                                >
                                    <img src={album.photoUrl} alt="" />
                                </div>
                            ))
                        ) : getUpcomingTrip?.data?.tripId ? (
                            <div css={S.SNoAlbum}>
                                <div>
                                    <span>
                                        <IoIosImages /> 최근 앨범이 없습니다
                                        <br />
                                    </span>
                                    <p>여행을 다녀오고 앨범을 만들어보세요!</p>
                                </div>
                                <button
                                    data-text="새 앨범 만들기"
                                    onClick={() =>
                                        navigate(
                                            `/trip/album/${getUpcomingTrip?.data?.tripId}`, 
                                            {
                                                state: {
                                                    title: getUpcomingTrip?.data?.title
                                                },
                                            }
                                        )
                                    }
                                >
                                    + 새 앨범 만들기
                                </button>
                            </div>
                        ) : (
                            <div css={S.SNoAlbum}>
                                <div>
                                    <span>
                                        <IoIosImages /> 여행이 존재하지 않습니다.
                                        <br />
                                    </span>
                                    <p>여행을 다녀오고 앨범을 만들어보세요!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentTrips;
