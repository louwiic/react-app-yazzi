import { useDispatch, useSelector } from 'react-redux'
import { images } from 'theme'
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Button,
} from 'reactstrap'
import { useHistory } from 'react-router-dom'

import styles from './templates.module.scss'

const ButtonView = () => {
  const handleButtonClick = () => {
    /* eslint-disable no-alert */ // Désactive la règle ESLint pour cette ligne
    console.log('Bouton cliqué !') // Affiche une alerte lorsque le bouton est cliqué
    /* eslint-enable no-alert */ // Réactive la règle ESLint
  }
  return (
    <button
      onClick={handleButtonClick}
      className={styles.mybutton}
      type="button"
    >
      <div style={{}}>
        <img src={images.eye} alt="eye" />
        <span className={styles.buttontext}>Prévisualiser</span>
      </div>
    </button>
  )
}

const Back = () => {
  const history = useHistory()
  /* const handleGoBack = () => {
    console.log(' *** test ***')
  }
 */
  return (
    <div className={styles.containerback}>
      <div className="d-flex flex-direction-row align-items-center">
        <button
          type="button"
          onClick={() => {
            console.log('test')
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

const handleButtonClick = () => {
  /* eslint-disable no-alert */ // Désactive la règle ESLint pour cette ligne
  console.log('Bouton cliqué !') // Affiche une alerte lorsque le bouton est cliqué
  /* eslint-enable no-alert */ // Réactive la règle ESLint
}

const Dashboard = () => {
  /* const dispatch = useDispatch() */
  /*  const { me } = useSelector((state) => state.app) */

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>

      <Container>
        <Button className={styles.back} onClick={handleButtonClick}>
          Cliquez-moi
        </Button>
        <Back />
        <div className={styles.containertitle}>
          <h1 className={styles.titlebloc}>
            Sélectionnez votre template de site
          </h1>
        </div>

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
              <ButtonView />
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
              <ButtonView />
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
              <ButtonView />
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
              <ButtonView />
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
