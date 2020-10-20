import React from "react";

import { useAppContext } from "./context";
import { createLine } from "../canvas-utils";
import { HEIGHT, WIDTH } from "../constants";

export default function Edges() {
  const { 
    state: {
      edges,
      nodes,
    }
  } = useAppContext();
  return (
    <svg width={WIDTH} height={HEIGHT}>
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
  )
}