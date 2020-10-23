import React from "react";

import NodeEditor from "./NodeEditor";
import ExecutionBar from "./ExecutionBar";
import ModesBar from "./ModesBar";

export default function Toolbar() {
  return (
    <div className="flex pb2">
      <ModesBar/>
      <div className="w-10"></div> {/* Temporary spacer */}
      <ExecutionBar/>
      <NodeEditor/>
    </div>
  )
}