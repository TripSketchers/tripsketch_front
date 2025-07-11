import React, { useEffect, useState } from "react";
import ModalLayout from "../../ModalLayout/ModalLayout";
import { instance } from "../../../api/config/instance";
import { useQueryClient } from "@tanstack/react-query";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import ScheduleTable from "../ScheduleTable/ScheduleTable";
import useGroupedSchedule from "../../../hooks/useGroupedSchedule";
import Loading from "../../Loading/Loading";
import { MdHeight } from "react-icons/md";

function AlbumEditModal({ tripId, album, onClose }) {
    const queryClient = useQueryClient();
    const [selectedSchedule, setSelectedSchedule] = useState({});
    const { groupedSchedule, isLoading, refetch } = useGroupedSchedule(tripId);

    useEffect(() => {
        refetch();
    }, [tripId, refetch]);

    console.log(tripId);
    console.log(album.albumId);
    console.log(selectedSchedule);

    const handleEdit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            const albumInfo = {
                albumId: album.albumId,
                tripId: tripId,
                tripScheduleId: selectedSchedule.tripScheduleId,
                date: selectedSchedule.date,
                placeName: selectedSchedule.placeName,
                startTime: selectedSchedule.startTime,
            };
            console.log(albumInfo);
            await instance.put(`/trips/${tripId}/album`, albumInfo, option);
            queryClient.invalidateQueries(["getAlbum", tripId]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ModalLayout onClose={onClose}>
            <div>
                <h2 css={S.STitle}>앨범 일정 수정</h2>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <div css={S.SContainer}>
                            <h3>현재 앨범 일정</h3>
                            <div css={S.SBox}>
                                <div className="dateBox">{album.dayDiff}</div>
                                <div className="placeBox">
                                    {album.placeName}
                                </div>
                            </div>
                        </div>
                        <ScheduleTable
                            style={{ height: "290px", overflowY:"hidden" }}
                            selectedSchedule={selectedSchedule}
                            setSelectedSchedule={setSelectedSchedule}
                            scheduleData={groupedSchedule}
                        />
                        <div css={S.SButton}>
                            <button onClick={onClose} className="cancelBtn">
                                취소
                            </button>
                            <button onClick={handleEdit} className="editBtn">
                                수정
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ModalLayout>
    );
}

export default AlbumEditModal;
