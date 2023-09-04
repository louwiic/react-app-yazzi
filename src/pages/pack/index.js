import PreviewWindow from 'components/IFrame'
import { Col, Container, Row } from 'reactstrap'
import { images } from 'theme'
import { path } from 'utils/const'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './pack.module.scss'

const packs = [
  {
    offer: 'Essential',
    options1: {
      text: 'Site internet',
      checked: false,
    },
    options2: {
      text: 'Album photo',
      checked: true,
    },
    options3: {
      text: 'Gestion RSVP + Relance SMS',
      checked: true,
    },
  },
  {
    offer: 'Darling',
    options1: {
      text: 'Site internet',
      checked: false,
    },
    options2: {
      text: 'Album photo',
      checked: false,
    },
    options3: {
      text: 'Gestion RSVP + Relance SMS',
      checked: true,
    },
  },
  {
    offer: 'Serena',
    options1: {
      text: 'Site internet',
      checked: false,
    },
    options2: {
      text: 'Album photo',
      checked: true,
    },
    options3: {
      text: 'Gestion RSVP + Relance SMS',
      checked: false,
    },
  },
  {
    offer: 'Every',
    options1: {
      text: 'Site internet',
      checked: false,
    },
    options2: {
      text: 'Album photo',
      checked: false,
    },
    options3: {
      text: 'Gestion RSVP + Relance SMS',
      checked: false,
    },
  },
]

const ButtonView = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.mybutton} type="button">
      <div style={{}}>
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
        Etape 02
      </span>
    </div>
  )
}

const CheckComponent = ({ title, nocheck = false }) => {
  return (
    <div className={styles.containercheck}>
      <span className={styles.titlecheck}>{title}</span>
      <div
        className={styles.contentcheck}
        style={nocheck ? { backgroundColor: '#25586615' } : {}}
      >
        <img src={nocheck ? images.nocheck : images.check} alt="arrowback" />
      </div>
    </div>
  )
}

const PackOffer = ({ history }) => {
  return (
    <Row className={styles.row}>
      {packs?.map((item) => {
        return (
          <Col lg="3" md={6} className={styles.col}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: 'solid 1px',
                borderRadius: '24px',
                overflow: 'visible',
                borderWidth: 2,
                borderColor: '#00908A',
              }}
            >
              <span style={{ textAlign: 'center', marginTop: '20px' }}>
                Pack
              </span>
              <span className={styles.titlebutton}>{item?.offer}</span>
              <CheckComponent
                title="Site internet"
                nocheck={item?.options1?.checked}
              />
              <CheckComponent
                title="Album photo"
                nocheck={item?.options2?.checked}
              />
              <CheckComponent
                title="Gestion RSVP + Relance SMS"
                nocheck={item?.options3?.checked}
              />
              <ButtonView
                onClick={() => {
                  history.push(path.custompacks)
                }}
                link="https://yazzievent.com/template-rosaly/"
                showIcon={false}
                text="Sélectionner"
              />
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

const Pack = () => {
  const history = useHistory()
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoadging] = useState(false)

  const handleClosePreview = () => {
    setShowPreview(false)
    setPreviewUrl('')
  }

  const handleOpenPreview = (url, number) => {
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

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>

      <Back history={history} />
      <div className={styles.containertitle}>
        <h1 className={styles.titlebloc}>Sélectionnez votre pack</h1>
      </div>

      <PackOffer history={history} />
    </div>
  )
}

Pack.propTypes = {}
Pack.defaultProps = {}

export default Pack
