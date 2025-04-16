import React, { useRef, useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as S from "./Style";
import { FaFolder } from "react-icons/fa";
import { IoMdMore, IoMdTrash } from "react-icons/io";
import ConfirmModal from "../../../ConfirmModal/ConfirmModal";

function AlbumFolderItem({ album, photos, onClickFolder }) {
    const [openModal, setOpenModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const modalRef = useRef();

    const handleToggleMore = (e) => {
        e.stopPropagation();
        setOpenModal((prev) => !prev);
    };

    const handleOpenDelete = (e) => {
        e.stopPropagation();
        setOpenDelete(true);
        setOpenModal(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        alert(`폴더 ${album.albumId} 삭제 요청!`);
        setOpenDelete(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setOpenModal(false);
            }
        };
        // 마운트될 때 실행 (add)
        document.addEventListener("mousedown", handleClickOutside);
      
        return () => {
          // 언마운트될 때 실행 (remove)
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div css={S.SFolder} onClick={() => onClickFolder(album.albumId)}>
            <FaFolder className="folderFrame" />
            <div css={S.SFolderMoreBtn} ref={modalRef}>
                <IoMdMore className="folderMoreBtn" onClick={handleToggleMore} />
                {openModal && (
                    <div className="folderMoreModal" onClick={handleOpenDelete}>
                        <IoMdTrash /> <span>삭제</span>
                    </div>
                )}
            </div>
            <div css={S.SFolderPhotoFrame}>
                <img src={photos[0]?.photoUrl} alt="앨범" />
                <div className="infoBox">
                    <div>
                        <h3>{album.place}</h3>
                        <span>{album.date}</span>
                    </div>
                </div>
            </div>

            {openDelete && (
                <ConfirmModal
                    title="폴더를 삭제하시겠어요?"
                    message="삭제 시 복구할 수 없습니다."
                    confirmText="삭제"
                    onClose={handleCloseDelete}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}

export default AlbumFolderItem;