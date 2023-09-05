import PreviewWindow from 'components/IFrame'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import { images } from 'theme'
import { path } from 'utils/const'
import { useOfferContext } from 'context/offerContext'
import { firestore } from 'utils/firebase'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './form.module.scss'

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
        <span className={styles.titleModal}>Merci !</span>
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
      <span
        style={{
          fontSize: '22px',
          fontWeight: '400',
          lineHeight: '29.7px',
          marginTop: '80px',
          fontFamily: "'Poppins', 'Arial Narrow', Arial, sans-serif",
        }}
      >
        Etape 04
      </span>
    </div>
  )
}

const Pack = () => {
  const history = useHistory()
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoadging] = useState(false)
  const { myObject, updateMyObject } = useOfferContext()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    dateMaried: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsOpenModal(true)

    setTimeout(() => {
      setIsOpenModal(false)
    }, 1800)

    /* const data = {
      ...formData,
      offer: {
        pack: myObject?.pack?.name,
        template: myObject.templateName,
        options: {
          sms_campaign: myObject?.customPack?.offer1,
          exctract_send: myObject?.customPack?.offer2,
          management: myObject?.customPack?.offer3,
        },
      },
    }

    const { fullName, phoneNumber, email, dateMaried } = formData

    try {
      await firestore.collection('customers').add(data)
      setIsOpenModal(true)

      setTimeout(() => {
        setIsOpenModal(false)
      }, 1500)
    } catch (error) {
      console.log(' *** error ***', error)
    }

    if (!fullName || !phoneNumber || !email || !dateMaried) {
      return
    } */
  }

  const handleClosePreview = () => {
    setShowPreview(false)
    setPreviewUrl('')
  }

  const handleOpenPreview = (url, number) => {
    handleClosePreview()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setTimeout(() => {
      setPreviewUrl(url)
      setShowPreview(true)
    }, 400)
  }

  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>
      <SuccessAlertModal
        isOpen={isOpenModal}
        message={'Votre demande a bien été pris en compte !'}
      />
      <Row>
        <Col md={6}>
          <Back history={history} />
          <div className={styles.containertitle}>
            <h1 className={styles.titlebloc}>Entrez vos coordonnées</h1>
            <p className={styles.subtitle}>
              En soumettant ce formulaire, j'accepte que les informations
              saisies soient utilisées pour permettre de me recontacter,
              m'informer de promotions, dans le cadre de la relation commerciale
              qui découle de cette prise de contact.
            </p>
          </div>
          <p className={styles.buttontext}>
            Et si on <br /> se disait oui ?
          </p>
        </Col>
        <Col md={6}>
          <div className={styles.containerForm}>
            <h1 className={styles.titleform}>
              Gérez votre liste d'invités en toute tranquillité
            </h1>
            <Container style={{ marginTop: 48 }}>
              <Form
                onSubmit={handleSubmit}
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <FormGroup>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Nom et prénom"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Entrez votre nom"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Entrez votre email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="dateMaried"
                    name="dateMaried"
                    id="dateMaried"
                    placeholder="Entrez votre mot de passe"
                    value={formData.dateMaried}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  className={styles.mybutton}
                >
                  Recevoir mon estimation
                </Button>
              </Form>
              <div style={{ paddingBottom: 48 }}>
                <p className={styles.textForm}>
                  En soumettant ce formulaire, j'accepte que les informations
                  saisies soient utilisées pour permettre de me recontacter,
                  m'informer de promotions, dans le cadre de la relation
                  commerciale qui découle de cette prise de contact.
                </p>
              </div>
            </Container>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Pack.propTypes = {}
Pack.defaultProps = {}

export default Pack
