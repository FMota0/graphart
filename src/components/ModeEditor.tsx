import React from "react";

import { useAppContext } from "./context";
import NodeEditor from "./NodeEditor";
import ACTIONS from "../reducers/actions";

import { ReactComponent as DrawIcon } from "../icons/draw.svg";
import { ReactComponent as SelectIcon } from "../icons/select.svg";
import { ReactComponent as MoveSelectionIcon } from "../icons/moveSelection.svg";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as ResetIcon } from "../icons/reset.svg";

const ICON_SIZE = 30;

export default function ModeEditor() {
  const {
    state: {
      mode,
    },
    dispatch,
  } = useAppContext();

  const changeMode = (newMode: Modes) => {
    dispatch({
      type: ACTIONS.CHANGE_MODE,
      payload: {
        mode: newMode,
      },
    });
  };

  const reset = () => {
    dispatch({
      type: ACTIONS.RESET,
    });
  };

  return (
    <div className="flex">
      <div className="flex pb2">
        <div className="pr3">
          <DrawIcon
            width={ICON_SIZE}
            height={ICON_SIZE} 
            onClick={() => changeMode("draw")}
            className={`outline pa1 ${mode === "draw" ? "bg-light-blue" : ""}`}
            title="Draw"
          />
        </div>
        <div className="pr3">
          <SelectIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            onClick={() => changeMode("select")}
            className={`outline pa1 ${mode === "select" ? "bg-light-blue" : ""}`}
            title="Select"
          />
        </div>
        <div className="pr3">
          <MoveSelectionIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            onClick={() => changeMode("move")}
            className={`outline pa1 ${mode === "move" ? "bg-light-blue" : ""}`}
            title="Move"
          />
        </div>
        <div className="pr3">
          <EditIcon
            width={ICON_SIZE} height={ICON_SIZE}
            onClick={() => changeMode("edit")}
            className={`outline pa1 ${mode === "edit" ? "bg-light-blue" : ""}`}
            title="Edit"
          />
        </div>
        <div className="pr3">
          <ResetIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            onClick={reset}
            className={`outline pa1`}
            title="Reset"
          />
        </div>
      </div>
      <NodeEditor/>
    </div>
  )
}