import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'
import { images } from 'theme'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  /* const dispatch = useDispatch() */
  /*  const { me } = useSelector((state) => state.app) */

  return (
    <div fluid className={`${styles.bgcontainer} App`}>
      <Row style={{ height: '100vh', width: '100%' }}>
        <Col md={2} style={{}}>
          <div className={styles.logocontainer}>
            <img src={images.logo} alt="img_heart" />
          </div>
        </Col>
        <Col md={8}>
          <div className={styles.middle} style={{ marginTop: 60 }}>
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
              }}
            >
              <button
                onClick={() => console.log(' *** click ***')}
                className={styles.mybutton}
              >
                {' '}
                Et si on se disait oui ?
              </button>
              <div
                style={{
                  height: 45,
                  width: 90,
                  marginTop: 30,
                  marginLeft: 20,
                  backgroundColor: 'orangered',
                }}
              >
                <img src={images.arrowleft} alt="img_heart" />
              </div>
              {/*  <span>En moins de 5 minutes</span> */}
            </div>
          </div>
        </Col>
        <Col
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
      </Row>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard
