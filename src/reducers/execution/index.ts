import ACTIONS from "../actions";
import algorithms from "../../algorithms";

export default function executionReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case ACTIONS.CHANGE_ALGORITHM:
      return {
        ...state.execution,
        algorithm: action.payload.algorithm,
      };
    case ACTIONS.START_EXECUTION: {
      if (!state.selectedNode)
        return state.execution;
      return {
        ...state.execution,
        context: algorithms[state.execution.algorithm](state.edges, state.selectedNode),
        time: 0,
      };
    }
    case ACTIONS.NEXT_EXECUTION_STATE: {
      return {
        ...state.execution,
        time: Math.min(state.execution.time + 1, state.execution.context.length - 1),
      };
    }
    case ACTIONS.PREVIOUSE_EXECUTION_STATE: {
      return {
        ...state.execution,
        time: Math.max(state.execution.time - 1, 0),
      };
    }
    case ACTIONS.RESET: {
      return {
        algorithm: "bfs",
        time: 0,
        isPlaying: false,
        context: [],
      };
    }
    case ACTIONS.DELETE_NODE: {
      return {
        algorithm: "bfs",
        time: 0,
        isPlaying: false,
        context: [],
      };
    }
    default:
      return state.execution;
  }
}