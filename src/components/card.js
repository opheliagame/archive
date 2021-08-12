import React from "react"

export default function Card({ children }) {
  return <div className="main" data-packery='{ "itemSelector": ".grid-item"}'>{children}</div>
}

