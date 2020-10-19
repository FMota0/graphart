import { pick } from "lodash";

export function isInside(A: CanvasCoordinate, B: CanvasCoordinate): boolean {
  return (
    B.top <= A.top &&
    B.left <= A.left &&
    B.top + B.height >= A.top + A.height &&
    B.left + B.width >= A.left + A.width
  );
}

export function createBoxPreview(e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>): BoxPreview {
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

export function updateBoxPreview(boxPreview: BoxPreview, e: React.MouseEvent, square = false): BoxPreview {
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

export function createLine(U: CanvasNode, V: CanvasNode): Line {
  const topU = U.top + U.width / 2, leftU = U.left + U.width / 2;
  const topV = V.top + V.width / 2, leftV = V.left + V.width / 2;
  return {
    top: topU,
    left: leftU,
    bottom: topV,
    right: leftV,
  };
}