import events from "../canvasEvents";

export default function selectedNodeReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch(action.type) {
    case events.CANVAS_MOUSE_DOWN:
      return undefined;
    case events.CHANGE_MODE:
      return undefined;
    case events.NODE_CLICK: {
      if (!state.selectedNode) {
        return action.payload.node;
      }
      if (state.selectedNode === action.payload.node || state.mode === "draw") {
        return undefined;
      }
      return action.payload.node;
    }
    default:
      return state.selectedNode;
  }
}