import { pick } from "lodash";
import events from "../canvasEvents";

export default function movePositionReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case events.CANVAS_MOUSE_DOWN: {
      if (state.mode === "move") {
        return {
          nodes: state.nodes,
          initialMouse: pick(action.payload.event, "clientX", "clientY"),
        };
      }
      return state.movePosition;
    }
    case events.CANVAS_MOUSE_UP:
      return undefined;
    default:
      return state.movePosition;
  }
}