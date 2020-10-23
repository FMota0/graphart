import React, { useEffect } from "react";

import { useAppContext } from "./context";
import ACTIONS from "../reducers/actions";
import { ICON_SIZE } from "../constants";

import { ReactComponent as DrawIcon } from "../icons/draw.svg";
import { ReactComponent as SelectIcon } from "../icons/select.svg";
import { ReactComponent as MoveSelectionIcon } from "../icons/moveSelection.svg";
import { ReactComponent as EditIcon } from "../icons/edit.svg";
import { ReactComponent as ExecuteIcon } from "../icons/execute.svg";
import { ReactComponent as ResetIcon } from "../icons/reset.svg";

const MODE_KEYS: {[k: string]: string} = {
  d: "draw",
  s: "select",
  m: "move",
  e: "execute",
};

export default function ModesBar() {
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

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (MODE_KEYS[e.key]) {
        dispatch({
          type: ACTIONS.CHANGE_MODE,
          payload: {
            mode: MODE_KEYS[e.key],
          },
        });
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        dispatch({
          type: ACTIONS.DELETE_NODE,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="flex">
      <DrawIcon
        width={ICON_SIZE}
        height={ICON_SIZE} 
        onClick={() => changeMode("draw")}
        className={`mr3 outline pa1 pointer ${mode === "draw" ? "bg-light-blue" : ""}`}
        title="Draw"
      />
      <SelectIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        onClick={() => changeMode("select")}
        className={`mr3 outline pa1 pointer ${mode === "select" ? "bg-light-blue" : ""}`}
        title="Select"
      />
      <MoveSelectionIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        onClick={() => changeMode("move")}
        className={`mr3 outline pa1 pointer ${mode === "move" ? "bg-light-blue" : ""}`}
        title="Move"
      />
      <EditIcon
        width={ICON_SIZE} height={ICON_SIZE}
        onClick={() => changeMode("edit")}
        className={`mr3 outline pa1 pointer ${mode === "edit" ? "bg-light-blue" : ""}`}
        title="Edit"
      />
      <ExecuteIcon
        width={ICON_SIZE} height={ICON_SIZE}
        onClick={() => changeMode("execute")}
        className={`mr3 outline pa1 pointer ${mode === "execute" ? "bg-light-red" : ""}`}
        title="Execute"
      />
      <ResetIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        onClick={reset}
        className={`outline pa1 pointer`}
        title="Reset"
      />
    </div>
  )
}