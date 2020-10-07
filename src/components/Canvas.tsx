import React, { useState, useRef } from "react";
import { pick, keys, concat, remove, find, includes, cloneDeep } from "lodash";
import "./Canvas.css";

interface Coordinates {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface BoxPreview {
  initialMouse: {
    clientX: number;
    clientY: number;
  };
  gridPos: {
    top: number;
    left: number;
  };
  box: Coordinates;
}

type Shape = "square" | "circle";

interface Node extends Coordinates {
  id: string;
  shape: Shape;
  color: string;
}

interface Dict<V> {
  [k: string]: V
}

interface Edge {
  u: string;
  v: string;
}

type Edges = Array<Edge>;

interface MovePosition {
  initialMouse: {
    clientX: number;
    clientY: number;
  };
  nodes: Dict<Node>;
}

/**
 * returns whether A is inside B
 * @param A 
 * @param B 
 */
function isInside(A: Coordinates, B: Coordinates): boolean {
  return (
    B.top <= A.top &&
    B.left <= A.left &&
    B.top + B.height >= A.top + A.height &&
    B.left + B.width >= A.left + A.width
  );
}

function createBoxPreview(e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) {
  return {
    initialMouse: pick(e, "clientX", "clientY"),
    gridPos: pick(ref.current!.getBoundingClientRect(), "top", "left"),
    box: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    }
  }
}

function updateBoxPreview(boxPreview: BoxPreview, e: React.MouseEvent, square = false) {
  const left = Math.min(boxPreview.initialMouse.clientX, e.clientX);
  const top = Math.min(boxPreview.initialMouse.clientY, e.clientY);
  const right = Math.max(boxPreview.initialMouse.clientX, e.clientX);
  const bottom = Math.max(boxPreview.initialMouse.clientY, e.clientY);
  let size = Math.min(bottom - top, right - left);
  size += size % 2;
  return {
    ...boxPreview,
    box: {
      left: left - boxPreview.gridPos.left,
      top: top - boxPreview.gridPos.top,
      width: square ? size : (right - left),
      height: square ? size : (bottom - top)
    },
  };
}

function generateId(): string {
  return Number(Math.floor(Math.random() * 0x1000000)).toString(16);
};

interface Line {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

function createLine(U: Node, V: Node): Line {
  const topU = U.top + U.width / 2, leftU = U.left + U.width / 2;
  const topV = V.top + V.width / 2, leftV = V.left + V.width / 2;
  return {
    top: topU,
    left: leftU,
    bottom: topV,
    right: leftV,
  };
}

type Modes = "draw" | "select" | "move" | "edit";

export function Canvas () {
  const [ mode, setMode ] = useState<Modes>("draw");

  const [ boxPreview, setBoxPreview ] = useState<BoxPreview | undefined>(
    undefined
  );

  const [ nodes, setNodes ] = useState<Dict<Node>>({});

  const [ selectedNode, setSelectedNode ] = useState<string | undefined>(
    undefined
  );

  const [ nodesToMove, setNodesToMove ] = useState<Array<string>>([]);

  const [ movePosition, setMovePosition ] = useState<MovePosition | undefined>(
    undefined
  );

  const [ edges, setEdges ] = useState<Edges>([]);

  const ids = keys(nodes);

  const gridRef = useRef<HTMLDivElement>(null);

  const changeMode = (newMode: Modes) => {
    setSelectedNode(undefined);
    if (newMode !== "move") {
      setNodesToMove([]);
      setMovePosition(undefined);
    }
    setMode(newMode);
  };

  const reset = () => {
    setNodes({});
    setEdges([]);
  };

  return (
    <div className="pt2">
      <div className="center tc" style={{ width: "800px" }}>
        <div>
          <p className="f2"> Mode: {mode} </p>
        </div>
      </div>
      <div className="flex justify-between center pl3 pr3 pb3" style={{ width: "800px" }}>
        <button onClick={() => changeMode("draw")}> Draw </button>
        <button onClick={() => changeMode("select")}> Select </button>
        <button onClick={() => changeMode("move")}> Move </button>
        <button onClick={() => changeMode("edit")}> Edit </button>
        <button onClick={() => reset()}> Reset </button>
      </div>
      <div className="flex justify-center">
        <div
          ref={gridRef}
          className="Grid"
          onMouseDown={e => {
            e.preventDefault();
            if (mode === "move") {
              setMovePosition({
                initialMouse: pick(e, "clientX", "clientY"),
                nodes,
              });
            } else {
              setBoxPreview(createBoxPreview(e, gridRef));
            }
            setSelectedNode(undefined);
          }}
          onMouseMove={e => {
            e.preventDefault();
            if (mode === "move") {
              if (movePosition) {
                const deltaX = e.clientX - movePosition.initialMouse.clientX;
                const deltaY = e.clientY - movePosition.initialMouse.clientY;
                const updatedNodes = cloneDeep(movePosition.nodes);
                nodesToMove.forEach(id => {
                  updatedNodes[id].top += deltaY;
                  updatedNodes[id].left += deltaX;
                });
                setNodes(updatedNodes);
              }
            } else {
              if (boxPreview) {
                setBoxPreview(updateBoxPreview(boxPreview, e, mode === "draw"));
              }
            }
          }}
          onMouseUp={e => {
            e.preventDefault();
            if (mode === "draw") {
              if (boxPreview) {
                const id = generateId();
                setNodes({
                  ...nodes,
                  [id]: {
                    ...boxPreview.box,
                    id,
                    shape: "circle",
                    color: "light-silver"
                  },
                })
              }
            } else if (mode === "select") {
              if (boxPreview) {
                const toMove = ids.filter(id => isInside(nodes[id], boxPreview.box));
                setNodesToMove(toMove);
                if (toMove.length > 0) {
                  setMode("move");
                }
              }
            } else if(mode === "move") {
              if (movePosition) {
                const deltaX = e.clientX - movePosition.initialMouse.clientX;
                const deltaY = e.clientY - movePosition.initialMouse.clientY;
                const updatedNodes = cloneDeep(movePosition.nodes);
                nodesToMove.forEach(id => {
                  updatedNodes[id].top += deltaY;
                  updatedNodes[id].left += deltaX;
                });
                setNodes(updatedNodes);
                setMovePosition(undefined);
              }
            }
            setBoxPreview(undefined);
          }}
        >
          {
            ids.map(id => {
              const { left, top, height, width, shape, color } = nodes[id];

              let borderColor = "";

              if (mode === "draw") {
                if (id === selectedNode) {
                  borderColor = " green";
                }
              } else if(mode === "select") {
                if (boxPreview) {
                  if (isInside(nodes[id], boxPreview.box)) {
                    borderColor = " red";
                  }
                }
              } else {
                if (includes(nodesToMove, id)) {
                  borderColor = " red";
                }
              }

              return (
                <div
                  key={id}
                  className={`absolute bg-${color}`}
                  style={{
                    left,
                    top,
                    height,
                    width,
                    border: "3px solid" + borderColor,
                    borderRadius: (shape === "circle") ? "100%" : "0%",
                  }}
                  onMouseDown={e => {
                    e.preventDefault();
                    if (mode !== "move") {
                      e.stopPropagation();
                    }
                  }}
                  onClick={() => {
                    if (mode === "draw") {
                      if (selectedNode) {
                        let u = id, v = selectedNode;
                        if (u > v)
                          [u, v] = [v, u];
                        const edge = { u, v };
                        const equality = (e: Edge) => e.u === edge.u && e.v === edge.v;
                        if (!!find(edges, equality)) {
                          remove(edges, equality);
                          setEdges(edges);
                        } else {
                          setEdges(concat(edges, [edge]));
                        }
                        setSelectedNode(undefined);
                      } else {
                        setSelectedNode(id);
                      }
                    } else if(mode === "edit") {
                      setSelectedNode(id);
                    }
                  }}
                  >
                </div>
              )
            })
          }
          <svg width="800px" height="600px">
            {
              edges.map(({ u, v }) => {
                const line = createLine(nodes[u], nodes[v]);
                return (
                  <line key={u + "-" + v} y1={line.top} x1={line.left} y2={line.bottom} x2={line.right} style={{
                    stroke: "black",
                    strokeWidth: 2,
                  }}/>
                )
              })
            }
          </svg>
          {
            boxPreview &&
              <div
                className="absolute ba b--blue"
                style={{ ...boxPreview.box, borderRadius: (mode === "draw" ? "100%" : "0%") }}
                />
          }
        </div>
        {
          (mode === "edit") && selectedNode && (
            <>
              <select value={nodes[selectedNode].shape} onChange={e => {
                const updatedNodes = {
                  ...nodes,
                  [selectedNode]: {
                    ...nodes[selectedNode],
                    shape: e.target.value as Shape,
                  }
                };
                setNodes(updatedNodes);
              }}>
                <option value={"circle"}> Circle </option>
                <option value={"square"}> Square </option>
              </select>
              <select value={nodes[selectedNode].color} onChange={e => {
                const updatedNodes = {
                  ...nodes,
                  [selectedNode]: {
                    ...nodes[selectedNode],
                    color: e.target.value,
                  }
                };
                setNodes(updatedNodes);
              }}>
                <option value={"light-silver"}> Light silver </option>
                <option value={"light-blue"}> Light blue </option>
                <option value={"orange"}> Orange </option>
                <option value={"purple"}> Purple </option>
                <option value={"pink"}> Pink </option>
              </select>
            </>
          )
        }
      </div>
    </div>
  )
}