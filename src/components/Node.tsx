import React from "react";
import { includes } from "lodash";

import { useAppContext } from "./context";
import { isInside } from "../canvas-utils";
import ACTIONS from "../reducers/actions";

export default function Node({ id }: { id: string }) {
  const {
    state: {
      nodes,
      selectedNode,
      boxPreview,
      nodesToMove,
      mode,
      execution,
    },
    dispatch,
  } = useAppContext()


  const { left, top, height, width, shape, color, label } = nodes[id];

  let borderColor = "";
  let realColor = color;

  // TODO: refactor this
  if (mode === "draw") {
    if (id === selectedNode) {
      borderColor = " green";
    }
  } else if(mode === "select") {
    if (boxPreview) {
      if (isInside(nodes[id], boxPreview.box)) {
        borderColor = " red";
      }
    } else if (includes(nodesToMove, id)) {
      borderColor = " red";
    }
  } else if(mode === "move") {
    if (includes(nodesToMove, id)) {
      borderColor = " red";
    }
  } else if(mode === "edit") {
    if (id === selectedNode) {
      borderColor = " green";
    }
  } else if(mode === "execute") {
    if (id === selectedNode) {
      borderColor = " green";
    }
    if (execution.context && execution.time < execution.context.length && execution.time >= 0) {
      const currentContext = execution.context[execution.time];
      if (currentContext.current === id){
        realColor = "green";
      } else if(includes(currentContext.visited, id)){
        realColor = "purple";
      } else if(includes(currentContext.queue, id)) {
        realColor = "gold";
      } else {
        realColor = "gray";
      }
    }
  }

  return (
    <div
      key={id}
      className={`absolute bg-${realColor} dt center`}
      style={{
        left,
        top,
        height,
        width,
        border: "3px solid" + borderColor,
        borderRadius: (shape === "circle") ? "100%" : "0%",
      }}
      onMouseDown={e => {
        e.preventDefault();
        if (mode !== "move") {
          e.stopPropagation();
        }
      }}
      onClick={() => {
        dispatch({
          type: ACTIONS.NODE_CLICK,
          payload: {
            node: id,
          },
        })
      }}
      >
        <div className="dtc v-mid tc pointer">
          <p>{label}</p>
        </div>
    </div>
  )
}