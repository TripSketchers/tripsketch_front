import React from "react";
import { useDrop } from "react-dnd";
import FloatingBtn from "../../FloatingBtn/FloatingBtn";

function TrashDropZone({ onDrop }) {
	const [, drop] = useDrop({
		accept: "SCHEDULE",
		drop: (item, monitor) => {
			const offset = monitor.getClientOffset();
			if (!offset) return;

			onDrop(item.id); // 안전하게 삭제
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return (
		<FloatingBtn ref={drop}/>
	);
}

export default TrashDropZone;
