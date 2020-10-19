interface CanvasCoordinate {
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
  box: CanvasCoordinate;
}

type Shape = "square" | "circle";

interface CanvasNode extends CanvasCoordinate {
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
  nodes: Dict<CanvasNode>;
}