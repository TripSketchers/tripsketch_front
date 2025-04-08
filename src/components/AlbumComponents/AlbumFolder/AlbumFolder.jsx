import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import AlbumPhoto from "../../../assets/AlbumPhoto.jpg";
import * as S from "./Style";
import { FaFolder } from "react-icons/fa";
import { IoMdMore, IoMdTrash } from "react-icons/io";
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

function AlbumFolder() {
    const [openModalId, setOpenModalId] = useState(null);
    const [openDeleteId, setOpenDeleteId] = useState(null);
    const modalRef = useRef();

    const dummyData = [
        { id: 1, date: "2024.03.01", place: "서울", img: AlbumPhoto },
        { id: 2, date: "2024.02.15", place: "부산", img: AlbumPhoto },
        { id: 3, date: "2024.01.20", place: "제주", img: AlbumPhoto },
        { id: 4, date: "2024.01.20", place: "제주", img: AlbumPhoto },
    ];

    const toggleMoreModal = (id) => {
        setOpenModalId((prev) => (prev === id ? null : id));
      };
    
      const openDeleteModal = (id) => {
        setOpenDeleteId(id);
        setOpenModalId(null);
      };
    
      const closeDeleteModal = () => {
        setOpenDeleteId(null);
      };
    
      const handleDelete = (id) => {
        alert(`폴더 ${id} 삭제 요청!`);
        closeDeleteModal();
      };
    
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenModalId(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

  return (
    <div>
      <div css={S.SSortingBox}>
        <span>최신순</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span>오래된 순</span>
      </div>

      <div css={S.SFolderContainer}>
      {dummyData.map(({ id, date, place, img }) => (
          <div key={id} css={S.SFolder}>
            <FaFolder className="folderFrame" />
            <div css={S.SFolderMoreBtn} ref={openModalId === id ? modalRef : null}>
              <IoMdMore
                className="folderMoreBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMoreModal(id);
                }}
              />
              {openModalId === id && (
                <div className="folderMoreModal" onClick={() => openDeleteModal(id)}>
                  <IoMdTrash /> <span>삭제</span>
                </div>
              )}
            </div>

            <div css={S.SFolderPhotoFrame}>
              <img src={img} alt="앨범" />
              <div className="infoBox">
                <h3>{place}</h3>
                <span>{date}</span>
              </div>
            </div>

            {/* 삭제 확인 모달 */}
            {openDeleteId === id && (
              <ConfirmModal
                title="폴더를 삭제하시겠어요?"
                message="삭제 시 복구할 수 없습니다."
                confirmText="삭제"
                onClose={closeDeleteModal}
                onConfirm={() => handleDelete(id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumFolder;
