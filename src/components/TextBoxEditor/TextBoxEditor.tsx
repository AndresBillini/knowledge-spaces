import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";
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
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    if (document.activeElement === e.currentTarget) return;

    const offsetX = e.clientX - box.x;
    const offsetY = e.clientY - box.y;

    const handleMove = (eMove: PointerEvent) => {
      setTextBoxes((prev) =>
        prev.map((tb) =>
          tb.id === box.id
            ? { ...tb, x: eMove.clientX - offsetX, y: eMove.clientY - offsetY }
            : tb
        )
      );
    };

    const handleUp = () => {
      target.releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }, [box, setTextBoxes]);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const offsetX = touch.clientX - box.x;
    const offsetY = touch.clientY - box.y;

    const handleMove = (eMove: TouchEvent) => {
      const moveTouch = eMove.touches[0];
      setTextBoxes((prev) =>
        prev.map((tb) =>
          tb.id === box.id
            ? { ...tb, x: moveTouch.clientX - offsetX, y: moveTouch.clientY - offsetY }
            : tb
        )
      );
    };

    const handleUp = () => {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };

    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
  }, [box, setTextBoxes]);

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
      <div 
        className="drag-handle"
        onPointerDown={onPointerDown} 
        onTouchStart={onTouchStart}
      />
      <div className="canvas-text-box-wrapper">
        <div
          className="canvas-text-box"
          tabIndex={0}
          contentEditable
          suppressContentEditableWarning
          onBlur={onBlur}
          dangerouslySetInnerHTML={{ __html: box.text }}
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