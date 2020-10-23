import boxPreviewReducer from "./boxPreview";
import edgesReducer from "./edges";
import gridRefReducer from "./gridRef";
import modeReducer from "./mode";
import movePositionReducer from "./movePosition";
import nodesReducer from "./nodes";
import nodesToMoveReducer from "./nodesToMove";
import selectedNodeReducer from "./selectedNode";
import executionReducer from "./execution";

export default function reducer(state: CanvasAppState, action: CanvasAppAction): CanvasAppState {
  return {
    boxPreview: boxPreviewReducer(state, action),
    edges: edgesReducer(state, action),
    gridRef: gridRefReducer(state, action),
    mode: modeReducer(state, action),
    movePosition: movePositionReducer(state, action),
    nodes: nodesReducer(state, action),
    nodesToMove: nodesToMoveReducer(state, action),
    selectedNode: selectedNodeReducer(state, action),
    execution: executionReducer(state, action),
  };
}