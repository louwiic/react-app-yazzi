import { useEffect, useMemo, useState } from 'react'
import { WheelGame } from 'components/WheelGame'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { path } from 'utils/const'
import { useOfferContext } from 'context/offerContext'
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
            history.push(path.dashboard)
          }}
          className={styles.back}
        >
          <img src={images.arrowback} alt="arrowback" />
        </button>
        <span className={styles.backtext}>Modifier ma sélection</span>
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

const Template = ({ myObject }) => {
  function _capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  let img
  if (myObject?.templateName === 'sky') {
    img = images.mockeupsky1
  } else if (myObject?.templateName === 'naturaly') {
    img = images.mockupnaturally1
  } else if (myObject?.templateName === 'golden') {
    img = images.mockupgolden1
  } else {
    img = images.mockuprosaly
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <span className={styles.titleContent}>Template : </span>
      <img src={img} alt="img_heart" />
      <span className={styles.packname}>
        {_capitalizeFirstLetter(myObject?.templateName)}
      </span>
    </div>
  )
}

const Pack = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [errors, setErrors] = useState({})
  const [dataCSV, setDataCSV] = useState([])
  const history = useHistory()
  const { myObject, updateMyObject } = useOfferContext()
  const offer1 = ['Aucun', 'Compris avec votre pack', 140, 220]
  const offer2 = ['Aucun', 40, 150, 210, 280]
  const offer3 = ['Aucun', 180, 350, 690]
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const getAditionnalOptions = (offer, pack) => {
    const content =
      typeof offer?.[pack?.length - 1] === 'number'
        ? `+${offer?.[pack?.length - 1]}€`
        : offer?.[pack?.length - 1]
    return content
  }

  const tarif = useMemo(() => {
    let price
    if (myObject?.pack?.name === 'Every') {
      price = 1104
    } else if (myObject?.pack?.name === 'Serena') {
      price = 924
    } else if (myObject?.pack?.name === 'Darling') {
      price = 804
    } else if (myObject?.pack?.name === 'Essential') {
      price = 624
    }

    const priceOffer1 = offer1?.[myObject?.customPack?.offer1?.length - 1]
    const priceOffer2 = offer2?.[myObject?.customPack?.offer2?.length - 1]
    const priceOffer3 = offer3?.[myObject?.customPack?.offer3?.length - 1]

    return price
  }, [myObject])

  useEffect(() => {
    /*  console.log(' *** myObject  recap ***', myObject) */
  }, [myObject])

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>

      <SuccessAlertModal isOpen={isOpenModal} message={'Export CSV terminé'} />
      <Back history={history} />

      <Container className="d-flex" style={{ flexDirection: 'column' }}>
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
          <div
            style={{ marginTop: 80, display: 'flex', flexDirection: 'column' }}
          >
            <span style={{ alignSelf: 'center', marginBottom: 30 }}>
              Votre tarif :{' '}
            </span>
            <h1 className={styles.titlebloc}>{tarif}€ TTC</h1>
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
        <div
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#30303010',
            marginTop: 50,
            marginBottom: 50,
          }}
        ></div>
        <Row className={styles.content}>
          <Col md={3}>
            <Template myObject={myObject} />
          </Col>
          <Col md={3}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span className={styles.titleContent}>Pack : </span>
              <span className={styles.titlePack}>{myObject?.pack?.name}</span>
            </div>
          </Col>

          <Col md={6}>
            <span className={styles.titleContent}>Options : </span>
            <div
              style={{ flexDirection: 'row', display: 'flex', marginTop: 16 }}
            >
              <div>
                <span className={styles.titleOptions}>Campagnes SMS</span>

                <p className={styles.titlecustompack}>
                  {
                    myObject?.customPack?.offer1?.[
                      myObject?.customPack?.offer1?.length - 1
                    ]
                  }{' '}
                  (
                  {getAditionnalOptions(offer1, myObject?.customPack?.offer1) ||
                    'Aucun'}
                  )
                </p>
              </div>
              <div
                style={{
                  marginLeft: 52,
                }}
              >
                <span className={styles.titleOptions}>Extraction & envoie</span>
                <div>
                  {
                    myObject?.customPack?.offer2?.[
                      myObject?.customPack?.offer2?.length - 1
                    ]
                  }{' '}
                  (
                  {getAditionnalOptions(offer2, myObject?.customPack?.offer2) ||
                    'Aucun'}
                  )
                </div>
              </div>
            </div>
            <div
              style={{
                flexDirection: 'column',
                marginTop: 24,
              }}
            >
              <span className={styles.titleOptions}>Gestion & Suivi</span>
              <div>
                {
                  myObject?.customPack?.offer3?.[
                    myObject?.customPack?.offer3?.length - 1
                  ]
                }{' '}
                (
                {getAditionnalOptions(offer3, myObject?.customPack?.offer3) ||
                  'Aucun'}
                )
              </div>
            </div>
          </Col>
        </Row>
        <ButtonView
          text="Générer un nouveau devis"
          onClick={() => {
            history.push(path.dashboard)
          }}
        />
      </Container>
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
    </div>
  )
}

Pack.propTypes = {}
Pack.defaultProps = {}

export default Pack
