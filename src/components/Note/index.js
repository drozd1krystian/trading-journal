import React, { useRef } from "react";
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";
import "./style.scss";

const Note = ({ title, show, handler, ...otherProps }) => {
  const { children } = otherProps;
  const noteRef = useRef(null);

  useDetectOutsideClick(noteRef, handler);

  return (
    <>
      {show ? (
        <div className="note" ref={noteRef}>
          <h4 className="note_header">{title}</h4>
          <div className="note_body">
            <div className="arrow"></div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Note;
