import React from 'react'

interface ILoader {
  list: any[]
}

const Loader: React.FC<ILoader> = ({ list }) => {
  return (
    <div>
      {!list.length && <div className="d-flex justify-content-center">
        <div className="spinner-border text-secondary" style={{'width': '3rem', 'height': '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
    </div>
  )
}

export default Loader