import { cloneDeep, clamp } from "lodash";

import { generateId } from "../../utils";
import ACTIONS from "../actions";
import { NODE_MINIMUM_SIZE } from "../../constants";

export default function nodesReducer(state: CanvasAppState, action: CanvasAppAction): Dict<CanvasNode> {
  switch (action.type) {
    case ACTIONS.CANVAS_MOUSE_MOVE: {
      if (state.movePosition) {
        const e = action.payload.event;
        const deltaX = e.clientX - state.movePosition.initialMouse.clientX;
        const deltaY = e.clientY - state.movePosition.initialMouse.clientY;
        let fixedDeltaX = deltaX;
        let fixedDeltaY = deltaY;
        const updatedNodes = cloneDeep(state.movePosition.nodes);
        state.nodesToMove.forEach(id => {
          fixedDeltaX = clamp(fixedDeltaX, -updatedNodes[id].left, state.gridRef!.current!.getBoundingClientRect().width - updatedNodes[id].left - updatedNodes[id].width);
          fixedDeltaY = clamp(fixedDeltaY, -updatedNodes[id].top, state.gridRef!.current!.getBoundingClientRect().height - updatedNodes[id].top - updatedNodes[id].height);
        });
        state.nodesToMove.forEach(id => {
          updatedNodes[id].top += fixedDeltaY;
          updatedNodes[id].left += fixedDeltaX;
        });
        return updatedNodes;
      }
      return state.nodes;
    }
    case ACTIONS.CANVAS_MOUSE_UP: {
      if (state.mode === "draw" && state.boxPreview) {
        if(state.boxPreview.box.width > 0){
          const id = generateId();
          const size = state.boxPreview.box.width;
          return {
            ...state.nodes,
            [id]: {
              ...state.boxPreview.box,
              id,
              shape: "circle",
              color: "light-silver",
              label: id,
              width: Math.max(size, NODE_MINIMUM_SIZE),
              height: Math.max(size, NODE_MINIMUM_SIZE),
            }
          };
        }
      }
      return state.nodes;
    }
    case ACTIONS.CHANGE_NODE_SHAPE: {
      const { selectedNode, selectedShape } = action.payload;
      return {
        ...state.nodes,
        [selectedNode]: {
          ...state.nodes[selectedNode],
          shape: selectedShape as Shape,
        },
      };
    }
    case ACTIONS.CHANGE_NODE_COLOR: {
      const { selectedNode, selectedColor } = action.payload;
      return {
        ...state.nodes,
        [selectedNode]: {
          ...state.nodes[selectedNode],
          color: selectedColor,
        },
      };
    }
    case ACTIONS.CHANGE_LABEL: {
      const { selectedNode, newLabel } = action.payload;
      return {
        ...state.nodes,
        [selectedNode]: {
          ...state.nodes[selectedNode],
          label: newLabel,
        },
      };
    }
    case ACTIONS.DELETE_NODE: {
      if (state.selectedNode) {
        const nodes = {...state.nodes};
        delete nodes[state.selectedNode];
        return nodes;
      }
      return state.nodes;
    }
    case ACTIONS.RESET:
      return {};
    default:
      return state.nodes;
  }
}