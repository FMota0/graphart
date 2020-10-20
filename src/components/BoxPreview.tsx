import React from "react";

import { useAppContext } from "./context";

export default function BoxPreview() {
  const {
    state: {
      boxPreview,
      mode,
    },
  } = useAppContext();
  
  if (!boxPreview)
    return null;
  
  return (
    <div
      className="absolute ba b--blue"
      style={
        { 
          ...boxPreview.box,
          borderRadius: (mode === "draw" ? "100%" : "0%") 
        }
      }
      />
  )
}