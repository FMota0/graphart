import React, { useRef, useReducer, useEffect } from "react";

import BoxPreview from "./BoxPreview";
import Edges from "./Edges";
import NodeEditor from "./NodeEditor";
import Nodes from "./Nodes";
import ModeEditor from "./ModeEditor";
import { canvasDefaultState, AppContext } from "./context";
import reducer from "../reducers";
import ACTIONS from "../reducers/actions";

import "./Canvas.css";

export function Canvas () {
  const [ state, dispatch ] = useReducer(reducer, canvasDefaultState);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_GRID_REF,
      payload: {
        gridRef,
      },
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="pt2">
        <ModeEditor/>
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
            <Nodes/>
            <Edges/>
            <BoxPreview/>
          </div>
          <NodeEditor/>
        </div>
      </div>
    </AppContext.Provider>
  )
}