import { useDispatch, useSelector } from 'react-redux'
import styles from './dashboard.module.scss'

const BackgroundContainer = ({ children }) => {
  return <div className={styles.bgcontainer}>{children}</div>
}

const Dashboard = () => {
  /* const dispatch = useDispatch() */
  /*  const { me } = useSelector((state) => state.app) */
  return (
    <div className="App">
      <BackgroundContainer>
        <h1 className={styles.titlebloc}>
          Site de faire-part digital entièrement personnalisé
        </h1>
      </BackgroundContainer>
    </div>
  )
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

export default Dashboard
