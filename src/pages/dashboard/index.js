import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { images } from 'theme'
import { WheelGame } from 'components/WheelGame'
import { path } from 'utils/const'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }
  const history = useHistory()

  return (
    <div className={`${styles.bgcontainer} App`}>
      <Row style={{}}>
        <Col xs={12} md={2} style={{}}>
          <div className={styles.logocontainer}>
            <img src={images.logo} alt="img_heart" />
          </div>
        </Col>
        <Col xs={12} md={8} style={{ marginTop: 153 }}>
          <div className={styles.middle}>
            <div className={styles.containertitle}>
              <div className={styles.imgheart}>
                <img src={images.hearts1} alt="img_heart" />
              </div>
              <h1 className={styles.titlebloc}>
                Site de faire-part digital entièrement personnalisé
              </h1>
            </div>
            <div style={{ marginTop: 20 }}>
              <span className={styles.subtitlebloc}>
                Plus simple | Écologique | Unique
              </span>
              <span className={styles.subtitleblocbis}>
                Gérer votre liste d’invités en toute tranquillité
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: '80px',
                marginLeft: 290,
              }}
            >
              <button
                onClick={() => {
                  history.push(path.template)
                }}
                className={styles.mybutton}
                type="button"
              >
                <span className={styles.buttontext}>
                  Et si on se disait oui ?
                </span>
              </button>
              <div className={styles.arrowContainer}>
                <div>
                  <img src={images.arrowleft} alt="img_heart" />
                </div>
                <div>
                  <span className={styles.arrowtext}>
                    en moins de 5 minutes !
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          md={2}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div className={styles.asiderigthcontainer}>
            <img src={images.flowerR} alt="flowerR" />
          </div>
        </Col>
        {/*  <WheelGame /> */}
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className={styles.wheelcontainer}
        >
          <div>
            <img
              src={images.jackpot}
              alt="img_heart"
              style={{
                height: 88,
                width: 77,
              }}
            />
          </div>
          <div style={{ marginLeft: 32 }}>
            <p className={styles.wheeltitle}>Tourner la roue</p>
            <p className={styles.wheelsubtitle}>
              Tenter de gagner <br /> jusqu’à -20% sur votre site !
            </p>
          </div>
        </div>
        <WheelGame
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          setModalOpen={setModalOpen}
        />
      </Row>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard
