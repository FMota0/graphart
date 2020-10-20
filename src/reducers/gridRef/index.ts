import ACTIONS from "../actions";

export default function gridRefReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case ACTIONS.SET_GRID_REF:
      return action.payload.gridRef;
    default:
      return state.gridRef;
  }
}