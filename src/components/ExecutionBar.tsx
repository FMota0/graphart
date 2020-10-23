import React from "react";

import { useAppContext } from "./context";
import { ReactComponent as PlayIcon } from "../icons/play.svg";
import { ReactComponent as PauseIcon } from "../icons/pause.svg";
import { ReactComponent as PreviousIcon } from "../icons/previous.svg";
import { ReactComponent as NextIcon } from "../icons/next.svg";
import { ICON_SIZE } from "../constants";

export default function ExecutionBar() {

  const {
    state: {
      mode,
      selectedNode,
    }
  } = useAppContext();

  if (mode !== "execute")
    return null;

  return (
    <div className="flex">
      <select value={"bfs"} className="mr3">
        <option value={"bfs"}> Bfs </option>  
      </select>
      <PlayIcon
        width={ICON_SIZE} height={ICON_SIZE}
        
        className={`mr3 outline pa1 pointer ${selectedNode ? "" : "bg-light-silver"}`}
        title="Play"
      />
      <PreviousIcon
        width={ICON_SIZE} height={ICON_SIZE}
        
        className={`mr3 outline pa1 pointer`}
        title="Previous"
      />
      <NextIcon
        width={ICON_SIZE} height={ICON_SIZE}
        
        className={`mr3 outline pa1 pointer`}
        title="Next"
      />
    </div>
  )
}