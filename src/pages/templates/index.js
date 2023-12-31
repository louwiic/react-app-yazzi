import PreviewWindow from 'components/IFrame'
import { Col, Row } from 'reactstrap'
import { images } from 'theme'
import { path } from 'utils/const'

import { useOfferContext } from 'context/offerContext'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './templates.module.scss'

const ButtonView = ({
  text,
  onClick,
  showIcon = true,
  className,
  textStyle,
}) => {
  return (
    <button
      onClick={onClick}
      className={className || styles.mybutton}
      type="button"
    >
      <div style={{}}>
        {showIcon && <img src={images.eye} alt="eye" />}
        <span className={textStyle || styles.buttontext}>
          {text || 'Prévisualiser'}
        </span>
      </div>
    </button>
  )
}

const ButtonShow = ({ title, text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.mybuttonshow} type="button">
      <div>
        <img src={images.eye} alt="eye" />
        <span style={{ marginLeft: 10 }}>Voir {title}</span>
      </div>
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
              handleOpenPreview('rosaly')
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

              handleOpenPreview('sky')
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
              handleOpenPreview('naturaly')
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
              handleOpenPreview('golden')
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
      top: -40,
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

  const selectStyle =
    templateChoosed === 'rosaly'
      ? {
          border: '2px solid #00908A',
          paddingBlock: 16,
          paddingInline: 8,
          borderRadius: 16,
        }
      : undefined
  const selectStyleSky =
    templateChoosed === 'sky'
      ? {
          border: '2px solid #00908A',
          paddingBlock: 16,
          paddingInline: 8,
          borderRadius: 16,
        }
      : undefined
  const selectStyleNat =
    templateChoosed === 'naturaly'
      ? {
          border: '2px solid #00908A',
          paddingBlock: 16,
          paddingInline: 8,
          borderRadius: 16,
        }
      : undefined
  const selectStyleGol =
    templateChoosed === 'golden'
      ? {
          border: '2px solid #00908A',
          paddingBlock: 16,
          paddingInline: 8,
          borderRadius: 16,
        }
      : undefined

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>

      {showPreview && (
        <>
          <div>
            <div className="d-flex flex-direction-row align-items-center">
              <button
                type="button"
                onClick={() => {
                  history.goBack()
                }}
                className={styles.back2}
              >
                <img src={images.arrowback} alt="arrowback" />
              </button>
              <span className={styles.titlepreview}>
                Découvrez nos autres templates
              </span>
            </div>

            <Row>
              <Col md={3}>
                <div
                  onClick={() => {
                    setTemplateChoosed('rosaly')
                    handleOpenPreview('rosaly')
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 32,
                    width: '80%',
                    ...selectStyle,
                  }}
                >
                  <img src={images.mockuprosaly} alt="img_heart" />
                  <ButtonShow
                    text="Changer de template"
                    onClick={() => {
                      setTemplateChoosed('rosaly')
                      handleOpenPreview('rosaly')
                    }}
                    title="rosaly"
                    link=""
                  />
                </div>
              </Col>
              <Col md={3}>
                <div
                  onClick={() => {
                    setTemplateChoosed('sky')
                    handleOpenPreview('sky', 2)
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 40,
                    width: '80%',
                    ...selectStyleSky,
                  }}
                >
                  <img src={images.mockeupsky1} alt="img_heart" />
                  <ButtonShow
                    text="Changer de template"
                    onClick={() => {
                      setTemplateChoosed('sky')
                      handleOpenPreview('sky', 2)
                    }}
                    title="sky"
                    link=""
                  />
                </div>
              </Col>
              <Col md={3}>
                <div
                  onClick={() => {
                    setTemplateChoosed('naturaly')
                    handleOpenPreview('naturaly', 2)
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 40,
                    width: '80%',
                    ...selectStyleNat,
                  }}
                >
                  <img src={images.mockupnaturally1} alt="img_heart" />
                  <ButtonShow
                    text="Changer de template"
                    onClick={() => {
                      setTemplateChoosed('naturaly')
                      handleOpenPreview('naturaly', 2)
                    }}
                    title="naturaly"
                    link=""
                  />
                </div>
              </Col>
              <Col md={3}>
                <div
                  onClick={() => {
                    setTemplateChoosed('golden')
                    handleOpenPreview('golden')
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 40,
                    width: '80%',
                    ...selectStyleGol,
                  }}
                >
                  <img src={images.mockupgolden1} alt="img_heart" />
                  <ButtonShow
                    text="Changer de template"
                    onClick={() => {
                      setTemplateChoosed('golden')
                      handleOpenPreview('golden')
                    }}
                    title="golden"
                    link=""
                  />
                </div>
              </Col>
              <Col md={3}>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <ButtonView
                    onClick={handleSelectTemplate}
                    link="https://yazzievent.com/template-rosaly/"
                    text={`Choisir ce  template`}
                    showIcon={false}
                    className={styles.buttonView}
                    textStyle={styles.buttontextChoice}
                  />
                </div>
              </Col>
            </Row>
          </div>
          {showPreview && <PreviewWindow url={previewUrl} />}
        </>
      )}

      {!showPreview && (
        <>
          <Back history={history} />

          <div className={styles.containertitle}>
            <h1 className={styles.titlebloc}>
              Sélectionnez votre template de site
            </h1>
          </div>

          <TemplateOffer
            handleOpenPreview={handleOpenPreview}
            setTemplateChoosed={setTemplateChoosed}
          />
        </>
      )}
    </div>
  )
}

Template.propTypes = {}
Template.defaultProps = {}

export default Template
