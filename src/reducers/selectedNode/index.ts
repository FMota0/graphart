import ACTIONS from "../actions";

export default function selectedNodeReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch(action.type) {
    case ACTIONS.CANVAS_MOUSE_DOWN:
      return undefined;
    case ACTIONS.CHANGE_MODE:
      return undefined;
    case ACTIONS.NODE_CLICK: {
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