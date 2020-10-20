import { keys } from "lodash";
import { isInside } from "../../canvas-utils";
import ACTIONS from "../actions";

export default function nodesToMoveReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case ACTIONS.CANVAS_MOUSE_UP: {
      if (state.boxPreview && state.mode === "select") {
        const ids = keys(state.nodes);
        return ids.filter(id => isInside(state.nodes[id], state.boxPreview!.box));
      }
      return state.nodesToMove;
    }
    default:
      return state.nodesToMove;
  }
}