import React from 'react'
import { Link } from 'react-router-dom'

export default function GameNav() {
  return (
    <div className="nav">
    <div id="logo">
      <a href="http://paraminnovation.org/"></a>
    </div>
    <div>
      <p>
        <Link to="/gaming-zone"><i class="fa-solid fa-arrow-left"></i></Link>
      </p>
    </div>
  </div>
  )
}
