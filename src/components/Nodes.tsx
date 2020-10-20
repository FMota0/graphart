import React from "react";
import { keys } from "lodash";

import Node from "./Node";
import { useAppContext } from "./context";

export default function Nodes() {
  const {
    state: {
      nodes,
    },
  } = useAppContext();

  const ids = keys(nodes);

  return (
    <>
      {
        ids.map(id => (<Node key={id} id={id}/>))
      }
    </>
  )
}