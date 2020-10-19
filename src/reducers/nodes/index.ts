import { cloneDeep } from "lodash";
import { generateId } from "../../utils";
import events from "../canvasEvents";

export default function nodesReducer(state: CanvasAppState, action: CanvasAppAction): Dict<CanvasNode> {
  switch (action.type) {
    case events.CANVAS_MOUSE_MOVE: {
      if (state.movePosition) {
        const e = action.payload.event;
        const deltaX = e.clientX - state.movePosition.initialMouse.clientX;
        const deltaY = e.clientY - state.movePosition.initialMouse.clientY;
        const updatedNodes = cloneDeep(state.movePosition.nodes);
        state.nodesToMove.forEach(id => {
          updatedNodes[id].top += deltaY;
          updatedNodes[id].left += deltaX;
        });
        return updatedNodes;
      }
      return state.nodes;
    }
    case events.CANVAS_MOUSE_UP: {
      if (state.mode === "draw" && state.boxPreview) {
        const id = generateId();
        return {
          ...state.nodes,
          [id]: {
            ...state.boxPreview.box,
            id,
            shape: "circle",
            color: "light-silver",
          }
        };
      }
      return state.nodes;
    }
    case events.CHANGE_NODE_SHAPE: {
      const { selectedNode, selectedShape } = action.payload;
      return {
        ...state.nodes,
        [selectedNode]: {
          ...state.nodes[selectedNode],
          shape: selectedShape as Shape,
        }
      };
    }
    case events.CHANGE_NODE_COLOR: {
      const { selectedNode, selectedColor } = action.payload;
      return {
        ...state.nodes,
        [selectedNode]: {
          ...state.nodes[selectedNode],
          color: selectedColor,
        }
      };
    }
    default:
      return state.nodes;
  }
}