import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'
import { images } from 'theme'
import styles from './templates.module.scss'

const Dashboard = () => {
  /* const dispatch = useDispatch() */
  /*  const { me } = useSelector((state) => state.app) */

  return (
    <div fluid className={`${styles.bgcontainer} App`}>
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
                Sélectionnez votre template de site
              </h1>
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
                onClick={() => {
                  console.log(' *** ok ***')
                }}
                className={styles.mybutton}
                type="button"
              >
                <span className={styles.buttontext}>
                  Et si on se disait oui ?
                </span>
              </button>
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
      </Row>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard
