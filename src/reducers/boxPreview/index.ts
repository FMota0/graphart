import { createBoxPreview, updateBoxPreview } from "../../canvas-utils";
import ACTIONS from "../actions";

// returns boxPreview next state based on current state and action
export default function boxPreviewReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case ACTIONS.CANVAS_MOUSE_DOWN: {
      if (state.mode !== "move" && state.gridRef) {
        return createBoxPreview(action.payload.event, state.gridRef);
      }
      return state.boxPreview;
    }
    case ACTIONS.CANVAS_MOUSE_MOVE: {
      if (state.boxPreview) {
        return updateBoxPreview(state.boxPreview, action.payload.event, state.mode === 'draw');
      }
      return state.boxPreview;
    }
    case ACTIONS.CANVAS_MOUSE_UP: {
      return undefined;
    }
    case ACTIONS.RESET:
      return undefined;
    default:
      return state.boxPreview;
  }
}