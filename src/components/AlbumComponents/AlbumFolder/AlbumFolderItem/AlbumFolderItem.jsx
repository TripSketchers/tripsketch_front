import React, { useRef, useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaFolder } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoMdMore, IoMdTrash } from "react-icons/io";
import { BiCalendarExclamation } from "react-icons/bi";
import TogglePanel from "../../../TogglePanel/TogglePanel";
import { instance } from "../../../../api/config/instance";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SwalAlert from "../../../SwalAlert/SwalAlert";
import AlbumEditModal from "../../AlbumEditModal/AlbumEditModal";

function AlbumFolderItem({ album, photo, onClickFolder }) {
    const { tripId } = useParams();
    const queryClient = useQueryClient();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            await instance.delete(
                `/trips/${tripId}/albums/${album.albumId}`,
                option
            );
            queryClient.invalidateQueries(["getAlbum", tripId]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div css={S.SFolder} onClick={() => onClickFolder(album.albumId)}>
            <div css={S.SfolderIconWrapper}>
                <FaFolder className="folderFrame" />
            </div>
            <div css={S.SFolderPhotoFrame}>
                <img src={photo} alt="앨범" />
            </div>
            <div css={S.SFolderInner}>
                <div className="missingFlag">{album?.tripScheduleMissingFlag && <BiCalendarExclamation />}</div>
                <div className="innerBox">
                    <TogglePanel
                        triggerIcon={
                            <IoMdMore
                                style={{ fontSize: "34px", color: "white" }}
                            />
                        }
                        menuItems={[
                            {
                                icon: <IoMdTrash />,
                                label: "삭제",
                                action: handleDelete,
                                confirm: {
                                    title: "폴더를 삭제하시겠어요?",
                                    message: "삭제 시 복구할 수 없습니다.",
                                    confirmText: "삭제",
                                },
                            },
                            {
                                icon: <MdEdit />,
                                label: "수정",
                                action: () => setIsEditModalOpen(true),
                            },
                        ]}
                    />
                    <div className="infoBox">
                        <h3>{album.placeName}</h3>
                        <span>{album.date}</span>
                    </div>
                </div>
            </div>
            {isEditModalOpen && (
                <AlbumEditModal
                    onClose={() => setIsEditModalOpen(false)}
                    tripId={tripId}
                    album={album}
                />
            )}
        </div>
    );
}

export default AlbumFolderItem;
