import React from "react";

import { useAppContext } from "./context";
import ACTIONS from "../reducers/actions";
import { NODE_COLORS, NODE_SHAPES } from "../constants";

export default function NodeEditor() {
  const {
    state: {
      mode,
      nodes,
      selectedNode,
    },
    dispatch,
  } = useAppContext();

  if (mode !== "edit" || !selectedNode)
    return null;
  
  return (
    <div className="pa2 flex justify-between">
      <select value={nodes[selectedNode].shape} onChange={e => {
        dispatch({
          type: ACTIONS.CHANGE_NODE_SHAPE,
          payload: {
            selectedNode,
            selectedShape: e.target.value,
          },
        });
      }}>
        {
          NODE_SHAPES.map(nodeShape => (
            <option value={nodeShape.shape} key={nodeShape.shape}>{nodeShape.name}</option>
          ))
        }
      </select>
      <select value={nodes[selectedNode].color} onChange={e => {
        dispatch({
          type: ACTIONS.CHANGE_NODE_COLOR,
          payload: {
            selectedNode,
            selectedColor: e.target.value,
          },
        });
      }}>
        {
          NODE_COLORS.map(nodeColor => (
            <option value={nodeColor.color} key={nodeColor.color}>{nodeColor.name}</option>
          ))
        }
      </select>
    </div>
  )
}