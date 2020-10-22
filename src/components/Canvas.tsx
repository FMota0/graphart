import React, { useRef, useReducer, useEffect } from "react";

import BoxPreview from "./BoxPreview";
import Edges from "./Edges";
import Nodes from "./Nodes";
import ModeEditor from "./ModeEditor";
import { canvasDefaultState, AppContext } from "./context";
import reducer from "../reducers";
import ACTIONS from "../reducers/actions";
import { HEIGHT } from "../constants";

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
      <div className="pt2 center w-100 pl3 pr3">
        <ModeEditor/>
        <div
          ref={gridRef}
          className="Grid w-100"
          style={{
            height: HEIGHT,
          }}
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
        {/* Remember to give credits for icons */}
        <div>
          <p>Ícones feitos por <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon"> www.flaticon.com</a> </p>
        </div>
      </div>
    </AppContext.Provider>
  )
}