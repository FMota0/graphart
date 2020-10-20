import ACTIONS from "../actions";

export default function modeReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case ACTIONS.CHANGE_MODE:
      return action.payload.mode || state.mode;
    default:
      return state.mode;
  }
}