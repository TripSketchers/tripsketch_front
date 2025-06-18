import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
import { useLocation, useNavigate } from "react-router-dom";
import MyTrip from "../../components/MypageComponents/MyTrip/MyTrip";
import SharedTrip from "../../components/MypageComponents/SharedTrip/SharedTrip";

function MyPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("selectedTab");

    const [selectedTab, setSelectedTab] = useState(tabParam ?? "mytrip"); // mytrip | share
    const [filterType, setFilterType] = useState("all"); // all | upcoming | past

    return (
        <div css={S.SLayout}>
            <div css={S.SContainer}>
                <ProfileContainer isMyPage={true} />
                <div css={S.STripContainer}>
                    <div css={S.SHeader}>
                        <div css={S.STitleBox}>
                            <div
                                className={
                                    selectedTab === "mytrip" ? "active" : ""
                                }
                                onClick={() => setSelectedTab("mytrip")}
                            >
                                나의 여행
                            </div>
                            <div
                                className={
                                    selectedTab === "share" ? "active" : ""
                                }
                                onClick={() => setSelectedTab("share")}
                            >
                                공유받은 여행
                            </div>
                        </div>
                        <nav css={S.SFilterBox}>
                            <ul>
                                <li
                                    className={
                                        filterType === "all" ? "active" : ""
                                    }
                                    onClick={() => setFilterType("all")}
                                >
                                    전체
                                </li>
                                <li
                                    className={
                                        filterType === "upcoming"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => setFilterType("upcoming")}
                                >
                                    예정된 여행
                                </li>
                                <li
                                    className={
                                        filterType === "past" ? "active" : ""
                                    }
                                    onClick={() => setFilterType("past")}
                                >
                                    지난 여행
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        {selectedTab === "mytrip" ? (
                            <MyTrip filterType={filterType} />
                        ) : (
                            <SharedTrip filterType={filterType} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
