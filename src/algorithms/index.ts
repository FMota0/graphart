import bfs from "./bfs";

const algorithms: {
  [k: string]: (edges: Edges, start: string) => any
} = {
  bfs,
}

export default algorithms;