import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function SwalAlert({
    icon = "info",
    title = "",
    text = "",
    confirmText = "확인",
    cancelText = "취소",
    reverseButtons = false, // 버튼 순서를 반대로
    showCancelButton = false,
    onConfirm,
    onCancel,
}) {
    MySwal.fire({
        icon,
        title,
        text,
        showCancelButton,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: reverseButtons, // 버튼 순서를 반대로
        customClass: {
            popup: "my-swal-popup",
            title: "my-swal-title",
            confirmButton: "my-swal-confirm",
            cancelButton: "my-swal-cancel",
        },
    }).then((result) => {
        if (result.isConfirmed && typeof onConfirm === "function") {
            onConfirm();
        } else if (
            result.dismiss === Swal.DismissReason.cancel &&
            typeof onCancel === "function"
        ) {
            onCancel();
        }
    });

    return null;
}
