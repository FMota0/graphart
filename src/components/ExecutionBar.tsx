import React from "react";
import { keys } from "lodash";

import { useAppContext } from "./context";
import { ReactComponent as PlayIcon } from "../icons/play.svg";
import { ReactComponent as PauseIcon } from "../icons/pause.svg";
import { ReactComponent as PreviousIcon } from "../icons/previous.svg";
import { ReactComponent as NextIcon } from "../icons/next.svg";
import { ICON_SIZE } from "../constants";
import ACTIONS from "../reducers/actions";
import algorithms from "../algorithms";

const possibleAlgorithms = keys(algorithms);

export default function ExecutionBar() {

  const {
    state: {
      mode,
      selectedNode,
      execution,
    },
    dispatch
  } = useAppContext();

  if (mode !== "execute")
    return null;

  return (
    <div className="flex">
      <select value={execution.algorithm} className="mr3" onChange={e => {
        dispatch({
          type: ACTIONS.CHANGE_ALGORITHM,
          payload: {
            algorithm: e.target.value,
          },
        });
      }}>
        {
          possibleAlgorithms.map(algo =>
          <option key={algo} value={algo}>{algo}</option>)
        }
      </select>
      <PlayIcon
        width={ICON_SIZE} height={ICON_SIZE}
        onClick={() => {
          dispatch({
            type: ACTIONS.START_EXECUTION,
          })
        }}
        className={`mr3 outline pa1 pointer ${selectedNode ? "" : "bg-light-silver"}`}
        title="Play"
      />
      <PreviousIcon
        width={ICON_SIZE} height={ICON_SIZE}
        onClick={() => {
          dispatch({
            type: ACTIONS.PREVIOUSE_EXECUTION_STATE,
          })
        }}
        className={`mr3 outline pa1 pointer`}
        title="Previous"
      />
      <div className="outline pa1 mr3 dt center" style={{ width:ICON_SIZE, height:ICON_SIZE }}>
        <div className="dtc v-mid tc">
          {execution.time}
        </div>
      </div>
      <NextIcon
        width={ICON_SIZE} height={ICON_SIZE}
        onClick={() => {
          dispatch({
            type: ACTIONS.NEXT_EXECUTION_STATE,
          })
        }}
        className={`mr3 outline pa1 pointer`}
        title="Next"
      />
    </div>
  )
}