import { concat, filter, find } from "lodash";
import ACTIONS from "../actions";

export default function edgesReducer(state: CanvasAppState, action: CanvasAppAction) {
  switch (action.type) {
    case ACTIONS.NODE_CLICK: {
      if (state.mode === "draw" && state.selectedNode) {
        let u = state.selectedNode, v = action.payload.node;
        if (u > v)
          [u, v] = [v, u];
        const edge: Edge = { u, v };
        const { edges } = state;
        const equality = (e: Edge) => e.u === edge.u && e.v === edge.v;
        if (!!find(edges, equality)) {
          return filter(edges, e => !equality(e));
        } else {
          return concat(edges, [edge]);
        }
      }
      return state.edges;
    }
    case ACTIONS.RESET:
      return []
    default:
      return state.edges;
  }
}