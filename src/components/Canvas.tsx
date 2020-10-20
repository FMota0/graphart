import React, { useRef, useReducer, useEffect } from "react";
import { keys, includes } from "lodash";

import { isInside, createLine } from "../canvas-utils";
import reducer from "../reducers";
import ACTIONS from "../reducers/actions";

import "./Canvas.css";

type Modes = "draw" | "select" | "move" | "edit";

const canvasDefaultState: CanvasAppState = {
  mode: "draw",
  boxPreview: undefined,
  nodes: {},
  selectedNode: undefined,
  nodesToMove: [],
  movePosition: undefined,
  edges: [],
  gridRef: undefined,
}

export function Canvas () {
  const [ state, dispatch ] = useReducer(reducer, canvasDefaultState);

  const {
    mode,
    boxPreview,
    nodes,
    selectedNode,
    nodesToMove,
    edges,
  } = state;

  const ids = keys(nodes);

  const gridRef = useRef<HTMLDivElement>(null);

  const changeMode = (newMode: Modes) => {
    dispatch({
      type: ACTIONS.CHANGE_MODE,
      payload: {
        mode: newMode,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_GRID_REF,
      payload: {
        gridRef,
      },
    });
  }, []);

  const reset = () => {
  };

  return (
    <div className="pt2">
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
      <div className="flex justify-center">
        <div
          ref={gridRef}
          className="Grid"
          onMouseDown={e => {
            e.preventDefault();
            e.persist();
            dispatch({
              type: ACTIONS.CANVAS_MOUSE_DOWN,
              payload: {
                event: e,
              },
            });
          }}
          onMouseMove={e => {
            e.preventDefault();
            e.persist();
            dispatch({
              type: ACTIONS.CANVAS_MOUSE_MOVE,
              payload: {
                event: e,
              },
            });
          }}
          onMouseUp={e => {
            e.preventDefault();
            e.persist();
            dispatch({
              type: ACTIONS.CANVAS_MOUSE_UP,
              payload: {
                event: e,
              },
            });
          }}
        >
          {
            ids.map(id => {
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
            })
          }
          <svg width="800px" height="600px">
            {
              edges.map(({ u, v }) => {
                const line = createLine(nodes[u], nodes[v]);
                return (
                  <line key={u + "-" + v} y1={line.top} x1={line.left} y2={line.bottom} x2={line.right} style={{
                    stroke: "black",
                    strokeWidth: 2,
                  }}/>
                )
              })
            }
          </svg>
          {
            boxPreview &&
              <div
                className="absolute ba b--blue"
                style={{ ...boxPreview.box, borderRadius: (mode === "draw" ? "100%" : "0%") }}
                />
          }
        </div>
        {
          (mode === "edit") && selectedNode && (
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
      </div>
    </div>
  )
}