import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
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
  const [dataCSV, setDataCSV] = useState([])
  const [dataCSVWheel, setDataCSVWheel] = useState([])

  const customersCollection = firestore.collection('customers')
  const wheelCollection = firestore.collection('anonymous')

  function formaterDateHeure() {
    const date = new Date()
    // Obtenez l'heure au format HH:mm
    const heures = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // Obtenez la date au format DD/MM/YYYY
    const jour = date.getDate().toString().padStart(2, '0')
    const mois = (date.getMonth() + 1).toString().padStart(2, '0') // Notez que les mois commencent à 0
    const annee = date.getFullYear()

    // Formatez la date et l'heure selon votre format souhaité
    const dateHeureFormatee = `${heures}h${minutes}-${jour}/${mois}/${annee}`

    return dateHeureFormatee
  }

  const headers = [
    'Nom',
    'Prenom',
    'Email',
    'Telephone',
    'Pack',
    'Template',
    'Campagne SMS',
    'Extraction & Envoie',
    'Gestion & Suivi',
  ]

  const headerswheel = ['Nom', 'Prenom', 'Email', 'Telephone', 'Lot']

  const loadData = async () => {
    try {
      const snapshot = await customersCollection.get()
      const csvData = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          Nom: data?.firstname || '-',
          Prenom: data?.lastname || '-',
          Email: data?.email || '-',
          Telephone: data?.phoneNumber || '-',
          Pack: data?.offer.pack || '-',
          Template: data?.offer.template || '-',
          'Campagne SMS': (data?.offer.options.campagne_sms || []).slice(-1)[0],
          'Extraction & Envoie': (
            data?.offer.options.extraction_envoie || []
          ).slice(-1)[0],
          'Gestion & Suivi': (data?.offer.options.gestion_suivi || []).slice(
            -1,
          )[0],
        }
      })

      setDataCSV(csvData)
    } catch (error) {
      console.error("Erreur lors de l'export CSV :", error)
    }
    try {
      const snapshot = await wheelCollection.get()
      const csvWheelData = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          Nom: data?.firstname || '-',
          Prenom: data?.lastname || '-',
          Email: data?.email || '-',
          Telephone: data?.phoneNumber || '-',
          Lot: data?.lot || '-',
        }
      })

      setDataCSVWheel(csvWheelData)
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

            <CSVLink
              filename={`yazzievent-salon-${formaterDateHeure()}`}
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
              Télécharger les données de sessions
            </CSVLink>

            <div style={{ marginTop: 30 }}>
              <h1 className={styles.titlebloc}>
                Exporter les données de la roue
              </h1>
              <CSVLink
                filename={`yazzievent-salon-roue-${formaterDateHeure()}`}
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
                data={dataCSVWheel}
                headers={headerswheel}
              >
                Télécharger les données tiédes
              </CSVLink>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Pack.propTypes = {}
Pack.defaultProps = {}

export default Pack
