import React from "react";

import { useAppContext } from "./context";
import { createLine } from "../canvas-utils";

export default function Edges() {
  const { 
    state: {
      edges,
      nodes,
    }
  } = useAppContext();
  return (
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
  )
}