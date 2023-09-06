import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { images } from 'theme'
import { firestore } from 'utils/firebase'
import styles from './export.module.scss'

const ButtonView = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.mybutton} type="button">
      <div style={{}}>
        <span className={styles.buttontext}>{text || 'Prévisualiser'}</span>
      </div>
    </button>
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
      <Row>
        <Col md={6}>
          <div className={styles.containertitle}>
            <h1 className={styles.titlebloc}>Exporter les sessions</h1>
            <p className={styles.subtitle}></p>
            {/*  <ButtonView text="Exporter les données" onClick={() => {}} /> */}
            {/* <CSVDownload data={dataCSV} target="_blank" /> */}
            <CSVLink
              style={{
                height: 54,
                backgroundColor: '#dfb693',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
              color="#ffffff"
              data={dataCSV}
              headers={headers}
            >
              Télécharger les données
            </CSVLink>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Pack.propTypes = {}
Pack.defaultProps = {}

export default Pack
