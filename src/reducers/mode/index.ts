import events from "../canvasEvents";

export default function modeReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case events.CHANGE_MODE:
      return action.payload.mode || state.mode;
    default:
      return state.mode;
  }
}