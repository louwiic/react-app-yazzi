import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import styles from './dashboard.module.scss'

const BackgroundContainer = ({ children }) => {
  return (
    <Container fluid className={styles.bgcontainer}>
      {children}
    </Container>
  )
}

const Dashboard = () => {
  /* const dispatch = useDispatch() */
  /*  const { me } = useSelector((state) => state.app) */
  return (
    <div className="App">
      <BackgroundContainer>
        {/* */}
        <Row>
          <Col xs={12} md={3} className="bg-primary">
            <h2>Colonne 1</h2>
          </Col>
          <Col xs={12} md={6} className={styles.middle}>
            <h1 className={styles.titlebloc}>
              Site de faire-part digital entièrement personnalisé
            </h1>
          </Col>
          <Col xs={12} md={3} className="bg-danger">
            <h2>Colonne 3</h2>
          </Col>
        </Row>
      </BackgroundContainer>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard
