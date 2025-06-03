import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import type { FocusEvent } from "react";
import CloseIcon from '@/components/Icons/close.svg';
import "./textboxeditor.css";

export interface TextBox {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface TextBoxProps {
  box: TextBox;
  setTextBoxes: Dispatch<SetStateAction<TextBox[]>>;
}

export default function TextBoxEditor({ box, setTextBoxes }: TextBoxProps) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (document.activeElement === e.currentTarget) return;
  
    const offsetX = e.clientX - box.x;
    const offsetY = e.clientY - box.y;
  
    const handleMove = (eMove: MouseEvent) => {
      setTextBoxes((prev) =>
        prev.map((tb) =>
          tb.id === box.id
            ? { ...tb, x: eMove.clientX - offsetX, y: eMove.clientY - offsetY }
            : tb
        )
      );
    };
  
    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    const newText = (e.target as HTMLElement).innerText;
    setTextBoxes((prev) =>
      prev.map((tb) => (tb.id === box.id ? { ...tb, text: newText } : tb))
    );
  }

  return (
    <div
      className="text-box-container"
      style={{
        left: box.x,
        top: box.y,
      }}
    >
      <div className="drag-handle" onMouseDown={onMouseDown}>
      </div>
      <div className="canvas-text-box-wrapper">
        <div
          className="canvas-text-box"
          tabIndex={0}
          contentEditable
          suppressContentEditableWarning
          onBlur={onBlur}
          dangerouslySetInnerHTML={{ __html: box.text }}
          onMouseDown={onMouseDown}
        />
      </div>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          setTextBoxes((prev) => prev.filter((tb) => tb.id !== box.id));
        }}
      >
        <Image src={CloseIcon} alt="Close Icon" />
      </button>
    </div>
  );
}