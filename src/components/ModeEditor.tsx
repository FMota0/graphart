import React from "react";

import { useAppContext } from "./context";
import NodeEditor from "./NodeEditor";
import ACTIONS from "../reducers/actions";

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
    <div>
      <div className="center tc">
        <div>
          <p className="f2"> Mode: {mode} </p>
        </div>
      </div>
      <div className="flex">
        <div className="flex">
          <button onClick={() => changeMode("draw")}> Draw </button>
          <button onClick={() => changeMode("select")}> Select </button>
          <button onClick={() => changeMode("move")}> Move </button>
          <button onClick={() => changeMode("edit")}> Edit </button>
          <button onClick={() => reset()}> Reset </button>
        </div>
        <NodeEditor/>
      </div>
    </div>
  )
}