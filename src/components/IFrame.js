import React from 'react'

const PreviewWindow = ({ url }) => {
  return (
    <div className="preview-window">
      <iframe title="Prévisualisation" src={url} width={960} height={1200} />
    </div>
  )
}

export default PreviewWindow
