import React from "react";

import { useAppContext } from "./context";
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
  };

  return (
    <div>
      <div className="center tc" style={{ width: "800px" }}>
          <div>
            <p className="f2"> Mode: {mode} </p>
          </div>
        </div>
        <div className="flex justify-between center pl3 pr3 pb3" style={{ width: "800px" }}>
          <button onClick={() => changeMode("draw")}> Draw </button>
          <button onClick={() => changeMode("select")}> Select </button>
          <button onClick={() => changeMode("move")}> Move </button>
          <button onClick={() => changeMode("edit")}> Edit </button>
          <button onClick={() => reset()}> Reset </button>
        </div>
    </div>
  )
}