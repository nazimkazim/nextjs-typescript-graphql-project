import React from 'react'

function PostfolioCard({portfolio}) {
  return (
    <div className="card subtle-shadow no-border">
      <div className="card-body">
        <h5 className="card-title">{portfolio && portfolio.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{portfolio && portfolio.jobTitle}</h6>
        <p className="card-text fs-2">{portfolio && portfolio.description}</p>
      </div>
      <div className="card-footer no-border">
        <small className="text-muted">{portfolio && portfolio.startDate} - {portfolio && portfolio.endDate}</small>
      </div>
    </div>
  )
}

export default PostfolioCard
