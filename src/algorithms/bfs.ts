import { tail, includes } from "lodash";

export default function buildFramesBFS(edges: Edges, start: string) {
  let queue: string[] = [start];
  let visited: string[] = [];
  const frames: Array<{ queue: string[], visited: string[], current: string}> = [];
  while(queue.length > 0){
    frames.push({
      queue,
      visited,
      current: "",
    });
    const current = queue[0];
    queue = tail(queue);
    visited = [...visited, current];
    frames.push({
      queue,
      visited,
      current,
    });
    for(const edge of edges){
      let nxt = null;
      if(edge.u === current) nxt = edge.v;
      else if(edge.v === current) nxt = edge.u;
      if(nxt){
        if(!includes(visited, nxt) && !includes(queue, nxt)){
          queue = [...queue, nxt];
          frames.push({
            queue,
            visited,
            current,
          });
        }
      }
    }
  }
  frames.push({
    queue,
    visited,
    current: "",
  });
  return frames;
}