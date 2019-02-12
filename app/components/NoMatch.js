import React from 'react'

const NoMatch = () => {
  return (
    <div className="NotFound">
      <div>
      <img
          src="https://www.hostinger.co.uk/assets/images/404-3a53e76ef1.png"
          id = "NotFoundImg"
        />
      </div>
      <div>
        <h1>404</h1>
        <h4>Sorry for the inconvenience, but the URL in your address bar goes nowhere...</h4>
      </div>
    </div>
  )
}

export default NoMatch
