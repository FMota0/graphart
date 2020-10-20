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
    },
    dispatch,
  } = useAppContext()


  const { left, top, height, width, shape, color } = nodes[id];

  let borderColor = "";

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
  } else {
    if (includes(nodesToMove, id)) {
      borderColor = " red";
    }
  }

  return (
    <div
      key={id}
      className={`absolute bg-${color}`}
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
    </div>
  )
}