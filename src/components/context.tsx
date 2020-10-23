import React, { createContext, useContext } from "react";

export const canvasDefaultState: CanvasAppState = {
  mode: "draw",
  boxPreview: undefined,
  nodes: {},
  selectedNode: undefined,
  nodesToMove: [],
  movePosition: undefined,
  edges: [],
  gridRef: undefined,
  execution: {
    algorithm: "bfs",
    time: 0,
    isPlaying: false,
    context: [],
  },
}

export const AppContext = createContext<{
  state: CanvasAppState,
  dispatch: React.Dispatch<CanvasAppAction>,
}>({
  state: canvasDefaultState,
  dispatch: () => null,
})

export const useAppContext = () => useContext(AppContext);