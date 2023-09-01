import PreviewWindow from 'components/IFrame'
import { Col, Container, Row } from 'reactstrap'
import { images } from 'theme'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './templates.module.scss'

const ButtonView = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.mybutton} type="button">
      <div style={{}}>
        <img src={images.eye} alt="eye" />
        <span className={styles.buttontext}>{text || 'Prévisualiser'}</span>
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

const Dashboard = () => {
  const history = useHistory()
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const handleOpenPreview = (url) => {
    setPreviewUrl(url)
    setShowPreview(true)
  }

  const handleClosePreview = () => {
    setShowPreview(false)
    setPreviewUrl('')
  }

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>

      <Container>
        <Back history={history} />
        {/* Affichage de la prévisualisation */}

        <div className={styles.containertitle}>
          <h1 className={styles.titlebloc}>
            Sélectionnez votre template de site
          </h1>
        </div>
        {showPreview && (
          <>
            <ButtonView
              text={'Choisir un autre template'}
              onClick={handleClosePreview}
              link=""
            />
            <PreviewWindow url={previewUrl} />
          </>
        )}

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
                onClick={() =>
                  handleOpenPreview('https://yazzievent.com/template-rosaly/')
                }
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
                onClick={() =>
                  handleOpenPreview('https://yazzievent.com/template-sky/')
                }
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
                onClick={() =>
                  handleOpenPreview('https://yazzievent.com/template-naturaly/')
                }
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
                onClick={() =>
                  handleOpenPreview('https://yazzievent.com/template-golden/')
                }
              />
            </div>
          </Col>
        </Row>

        {/*     <footer className="footer">
          <p>© Company 2017</p>
        </footer> */}
      </Container>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard
