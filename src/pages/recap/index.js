import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { images } from 'theme'
import { firestore } from 'utils/firebase'
import styles from './recap.module.scss'

const ButtonView = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.mybutton} type="button">
      <div style={{}}>
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
    </div>
  )
}

const SuccessAlertModal = ({ isOpen, toggle, message }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <span className={styles.titleModal}>🪄</span>
      </ModalHeader>
      <ModalBody>
        <div className={styles.modalMessage} role="alert">
          {message}
        </div>
      </ModalBody>
      {/*  <ModalFooter>
        <Button color="primary" type="submit" className={styles.buttonModal}>
          Fermer
        </Button>
      </ModalFooter> */}
    </Modal>
  )
}

const Pack = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [errors, setErrors] = useState({})
  const [dataCSV, setDataCSV] = useState([])
  const history = useHistory()

  const customersCollection = firestore.collection('customers')

  const headers = [
    'Nom et prenom',
    'Email',
    'Pack',
    'Template',
    'Campagne SMS',
    'Extraction & Envoie',
    'Gestion & Suivi',
  ]
  const loadData = async () => {
    try {
      const snapshot = await customersCollection.get()
      const csvData = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          'Nom et prenom': data.fullName,
          Email: data.email,
          Pack: data.offer.pack,
          Template: data.offer.template,
          'Campagne SMS': (data.offer.options.campagne_sms || []).slice(-1)[0],
          'Extraction & Envoie': (
            data.offer.options.extraction_envoie || []
          ).slice(-1)[0],
          'Gestion & Suivi': (data.offer.options.gestion_suivi || []).slice(
            -1,
          )[0],
        }
      })

      setDataCSV(csvData)
    } catch (error) {
      console.error("Erreur lors de l'export CSV :", error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>

      <SuccessAlertModal isOpen={isOpenModal} message={'Export CSV terminé'} />
      <Back history={history} />

      <Container>
        <div className={styles.containertitle}>
          <div className="d-flex flex-column">
            <div>
              Prix vable uniquement <br /> sur le salon !
            </div>
            <img
              src={images.arrowR}
              alt="leaf"
              style={{
                width: 64,
                height: 80,
              }}
            />
          </div>
          <div style={{ marginTop: 80 }}>
            <h1 className={styles.titlebloc}>1335€ TTC</h1>
          </div>
          <div className="d-flex flex-column" style={{ marginLeft: 30 }}>
            <div>
              Une question ? <br /> N’hésitez-pas à venir nous voir !
            </div>
            <img
              src={images.arrowL}
              alt="leaf"
              style={{
                width: 64,
                height: 80,
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

Pack.propTypes = {}
Pack.defaultProps = {}

export default Pack
