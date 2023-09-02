import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Spinner from './Spinner'

const PreviewWindow = ({ url: urlProps }) => {
  const iframeRef = useRef(null)
  const [url, setUrl] = useState(urlProps)
  const [loading, setLoading] = useState(false)
  const [cachedPages, setCachedPages] = useState({})
  const [iframeReady, setIframeReady] = useState(false)

  const handleLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    setIframeReady(true)
  }, [urlProps])

  useEffect(() => {
    iframeRef.current.src = 'https://www.monfairepart.com/'

    setTimeout(() => {
      setLoading(true) // Démarrez le chargement
      setUrl(urlProps)
      iframeRef.current.src = urlProps
    }, 400)
  }, [urlProps, cachedPages])

  return (
    <div className="preview-window" style={{ marginTop: 20 }}>
      {loading && (
        <>
          <Spinner color="#00908a" isLoading />
          <span
            style={{
              fontSize: '34px',
              fontWeight: '500',
              fontFamily: "'Poppins', 'Arial Narrow', Arial, sans-serif",
            }}
          >
            Nous préparons l'affichage de votre template ...
          </span>
        </>
      )}
      <iframe
        ref={iframeRef}
        style={{
          width: '100%', // Définit la largeur à 100% de l'espace du parent.
          border: '0', // Supprime les bordures de l'iframe.
        }}
        title="Prévisualisation"
        /* src={url} */
        height={1280}
        onLoad={handleLoad}
      />
    </div>
  )
}

export default PreviewWindow
