import React from "react";

import { useAppContext } from "./context";
import ACTIONS from "../reducers/actions";

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
    <>
      <select value={nodes[selectedNode].shape} onChange={e => {
        dispatch({
          type: ACTIONS.CHANGE_NODE_SHAPE,
          payload: {
            selectedNode,
            selectedShape: e.target.value,
          },
        });
      }}>
        <option value={"circle"}> Circle </option>
        <option value={"square"}> Square </option>
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
        <option value={"light-silver"}> Light silver </option>
        <option value={"light-blue"}> Light blue </option>
        <option value={"orange"}> Orange </option>
        <option value={"purple"}> Purple </option>
        <option value={"pink"}> Pink </option>
      </select>
    </>
  )
}