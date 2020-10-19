import events from "../canvasEvents";

export default function gridRefReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case events.SET_GRID_REF:
      return action.payload.gridRef;
    default:
      return state.gridRef;
  }
}