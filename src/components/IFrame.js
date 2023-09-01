import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Spinner from './Spinner'

const PreviewWindow = ({ url: urlProps }) => {
  const iframeRef = useRef(null)
  const [url, setUrl] = useState(urlProps)
  const [loading, setLoading] = useState(false)
  const [cachedPages, setCachedPages] = useState({})
  useEffect(() => {
    setLoading(true)

    if (cachedPages[url]) {
      /*  Utiliser la page en cache */
      iframeRef.current.contentWindow.location.replace(cachedPages[url])
    } else {
      setUrl(urlProps)
      iframeRef.current.src = urlProps
    }
  }, [urlProps, cachedPages])

  const handleLoad = () => {
    setLoading(false)
    /*  Mettre en cache la page chargée */
    setCachedPages((prevCachedPages) => ({
      ...prevCachedPages,
      [url]: iframeRef.current.contentWindow.location.href,
    }))
  }

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
