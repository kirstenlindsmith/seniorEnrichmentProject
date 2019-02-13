import React from 'react'

const NoMatch = () => {
  return (
    <div className="NotFound center">
      <div>
      <img
          src="https://aik.com.ua/image/catalog/404-cat.png"
          id = "NotFoundImg"
        />
      </div>
      <div>
        <h4>Sorry for the inconvenience,<br /> but the URL in your address bar goes nowhere...</h4>
      </div>
    </div>
  )
}

export default NoMatch
