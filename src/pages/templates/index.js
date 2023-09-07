import PreviewWindow from 'components/IFrame'
import { Col, Row } from 'reactstrap'
import { images } from 'theme'
import { path } from 'utils/const'

import { useOfferContext } from 'context/offerContext'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './templates.module.scss'

const ButtonView = ({ text, onClick, showIcon = true }) => {
  return (
    <button onClick={onClick} className={styles.mybutton} type="button">
      <div style={{}}>
        {showIcon && <img src={images.eye} alt="eye" />}
        <span className={styles.buttontext}>{text || 'Prévisualiser'}</span>
      </div>
    </button>
  )
}

const ButtonShow = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.mybuttonshow} type="button">
      <img src={images.eye} alt="eye" />
    </button>
  )
}

const Back = ({ history }) => {
  return (
    <div className={styles.containerback}>
      <div className="d-flex flex-direction-row align-items-center">
        <button
          type="button"
          onClick={() => {
            history.goBack()
          }}
          className={styles.back}
        >
          <img src={images.arrowback} alt="arrowback" />
        </button>
        <span className={styles.backtext}>Retour</span>
      </div>
      <span
        style={{
          fontSize: '22px',
          fontWeight: '400',
          lineHeight: '29.7px',
          marginTop: '80px',
          fontFamily: "'Poppins', 'Arial Narrow', Arial, sans-serif",
        }}
      >
        Etape 01
      </span>
    </div>
  )
}

const TemplateOffer = ({ setTemplateChoosed, handleOpenPreview }) => {
  return (
    <Row className={styles.row}>
      <Col lg="3" md={6} className={styles.col}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <img src={images.mockuprosaly} alt="img_heart" />
          <span className={styles.titlebutton}>Rosaly</span>
          <ButtonView
            onClick={() => {
              setTemplateChoosed('rosaly')
              handleOpenPreview('https://yazzievent.com/template-rosaly/')
            }}
            link="https://yazzievent.com/template-rosaly/"
          />
        </div>
      </Col>
      <Col lg="3" md={6} className={styles.col}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <img src={images.mockeupsky1} alt="img_heart" />
          <span className={styles.titlebutton}>Sky</span>
          <ButtonView
            onClick={() => {
              setTemplateChoosed('sky')
              handleOpenPreview('https://yazzievent.com/template-sky/', 2)
            }}
          />
        </div>
      </Col>

      <Col lg="3" md={6} className={styles.col}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <img src={images.mockupnaturally1} alt="img_heart" />
          <span className={styles.titlebutton}>Naturally</span>
          <ButtonView
            onClick={() => {
              setTemplateChoosed('naturaly')
              handleOpenPreview('https://yazzievent.com/template-naturally/')
            }}
          />
        </div>
      </Col>
      <Col lg="3" md={6} className={styles.col}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <img src={images.mockupgolden1} alt="img_heart" />
          <span className={styles.titlebutton}>Golden</span>
          <ButtonView
            onClick={() => {
              setTemplateChoosed('golden')
              handleOpenPreview('https://yazzievent.com/template-golden/')
            }}
          />
        </div>
      </Col>
    </Row>
  )
}

const Template = () => {
  const history = useHistory()
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoadging] = useState(false)
  const { myObject, updateMyObject } = useOfferContext()
  const [templateChoosed, setTemplateChoosed] = useState(null)

  function _capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const handleClosePreview = () => {
    setShowPreview(false)
    setPreviewUrl('')
  }

  const handleOpenPreview = (type, number) => {
    let url

    if (type === 'rosaly') {
      url = 'https://yazzievent.com/template-rosaly/'
    } else if (type === 'sky') {
      url = 'https://yazzievent.com/template-sky/'
    } else if (type === 'naturaly') {
      url = 'https://yazzievent.com/template-naturally/'
    } else if (type === 'golden') {
      url = 'https://yazzievent.com/template-golden/'
    }

    handleClosePreview()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setTimeout(() => {
      setPreviewUrl(url)
      setShowPreview(true)
    }, 400)
  }

  const handleSelectTemplate = () => {
    updateMyObject({ templateName: templateChoosed })
    history.push(path.packs)
  }

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>
      {showPreview && (
        <>
          {templateChoosed && (
            <span className={styles.titlepreview}>
              {_capitalizeFirstLetter(templateChoosed)}
            </span>
          )}
          <Row>
            <Col md={9}>
              {showPreview && <PreviewWindow url={previewUrl} />}
            </Col>
            <Col md={3}>
              <ButtonView
                onClick={handleSelectTemplate}
                link="https://yazzievent.com/template-rosaly/"
                text="Choisir ce template"
                showIcon={false}
              />
              <div
                onClick={() => {
                  setTemplateChoosed('rosaly')
                  handleOpenPreview('rosaly')
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img src={images.mockuprosaly} alt="img_heart" />
                <ButtonShow
                  text="Changer de template"
                  onClick={() => {
                    setTemplateChoosed('rosaly')
                    handleOpenPreview('rosaly')
                  }}
                  link=""
                />
              </div>
              <div
                onClick={() => {
                  setTemplateChoosed('sky')
                  handleOpenPreview('sky', 2)
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 40,
                }}
              >
                <img src={images.mockeupsky1} alt="img_heart" />
                <ButtonShow
                  text="Changer de template"
                  onClick={() => {
                    setTemplateChoosed('sky')
                    handleOpenPreview('sky', 2)
                  }}
                  link=""
                />
              </div>
              <div
                onClick={() => {
                  setTemplateChoosed('naturaly')
                  handleOpenPreview('naturaly', 2)
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 40,
                }}
              >
                <img src={images.mockupnaturally1} alt="img_heart" />
                <ButtonShow
                  text="Changer de template"
                  onClick={() => {
                    setTemplateChoosed('naturaly')
                    handleOpenPreview('naturaly', 2)
                  }}
                  link=""
                />
              </div>
              <div
                onClick={() => {
                  setTemplateChoosed('golden')
                  handleOpenPreview('golden')
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 40,
                }}
              >
                <img src={images.mockupgolden1} alt="img_heart" />
                <ButtonShow
                  text="Changer de template"
                  onClick={() => {
                    setTemplateChoosed('golden')
                    handleOpenPreview('golden')
                  }}
                  link=""
                />
              </div>
            </Col>
          </Row>
        </>
      )}

      <Back history={history} />
      {/* Affichage de la prévisualisation */}

      <div className={styles.containertitle}>
        <h1 className={styles.titlebloc}>
          Sélectionnez votre template de site
        </h1>
      </div>

      <TemplateOffer
        handleOpenPreview={handleOpenPreview}
        setTemplateChoosed={setTemplateChoosed}
      />
    </div>
  )
}

Template.propTypes = {}
Template.defaultProps = {}

export default Template
