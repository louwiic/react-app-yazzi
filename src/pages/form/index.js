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
  Spinner,
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

const SuccessAlertModal = ({ isOpen, toggle, message, showSpinned }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      {showSpinned && (
        <Spinner
          color="#00908a"
          isLoading
          style={{ marginTop: 20, marginLeft: 20 }}
        />
      )}
      <ModalHeader toggle={toggle}>
        <span className={styles.titleModal}>Informations</span>
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
  const [errors, setErrors] = useState({})
  const [showSpinned, setShowSpinned] = useState(false)
  const [selectedGender, setSelectedGender] = useState('')
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value)
  }
  const [messageAlert, setMessageAlert] = useState(
    'Votre demande a bien été pris en compte !',
  )

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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
    formData.genre = selectedGender

    const newErrors = {}

    if (!myObject?.pack?.name || !myObject?.templateName) {
      setMessageAlert(
        'Vous devez choisir un pack et un template avant de continuer',
      )
      setIsOpenModal(true)
      setShowSpinned(true)
      setTimeout(() => {
        setIsOpenModal(false)
        history.push(path.dashboard)
      }, 2500)
      return
    }

    if (!formData.lastname) {
      newErrors.lastname = 'Le champ nom est requis.'
    }

    if (!formData.firstname) {
      newErrors.firstname = 'Le champ prénom est requis.'
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Le champ téléphone est requis.'
    }

    if (!formData.email) {
      newErrors.email = 'Le champ email est requis.'
    }
    if (!formData.dateMaried) {
      newErrors.dateMaried = 'Le champ date du mariage est requis.'
    }

    if (Object.keys(newErrors).length === 0) {
      const data = {
        ...formData,
        offer: {
          pack: myObject?.pack?.name,
          template: myObject.templateName,
          options: {
            campagne_sms: myObject?.customPack?.offer1 || ['O relance'],
            extraction_envoie: myObject?.customPack?.offer2 || ['Aucun'],
            gestion_suivi: myObject?.customPack?.offer3 || ['Aucun'],
          },
        },
      }
      try {
        await firestore.collection('customers').add(data)
        setIsOpenModal(true)

        setTimeout(() => {
          setIsOpenModal(false)
          history.push(path.recap)
        }, 1800)
      } catch (error) {
        console.log(' *** error ***', error)
      }
    } else {
      setErrors(newErrors)
    }
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
        <img src={images.leaf} alt="leaf" />
      </div>
      <SuccessAlertModal
        isOpen={isOpenModal}
        message={messageAlert}
        showSpinned={showSpinned}
      />
      <Row>
        <Col md={6}>
          <Back history={history} />
          <div className={styles.containertitle}>{/*  */}</div>
          <p className={styles.buttontext}>
            Et si on se <br /> disait oui ?
          </p>
          <p className={styles.subtitle}>
            En attendant la finalisation du site, faites vous rappler par notre
            équipe pour en savoir plus sur nos offres et promitions !
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
                <FormGroup tag="fieldset" className="row">
                  <FormGroup
                    check
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Label
                      check
                      style={{
                        color: '#FFFFFF',
                      }}
                    >
                      <Input
                        type="radio"
                        name="gender"
                        value="madame"
                        defaultChecked
                        checked={selectedGender === 'madame'}
                        onChange={handleGenderChange}
                      />{' '}
                      Madame
                    </Label>
                  </FormGroup>
                  <FormGroup
                    check
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Label
                      check
                      style={{
                        color: '#FFFFFF',
                      }}
                    >
                      <Input
                        type="radio"
                        name="gender"
                        value="monsieur"
                        checked={selectedGender === 'monsieur'}
                        onChange={handleGenderChange}
                      />{' '}
                      Monsieur
                    </Label>
                  </FormGroup>
                </FormGroup>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    gap: 20,
                  }}
                >
                  <FormGroup
                    style={{
                      flex: 1,
                    }}
                  >
                    <Label for="firstname" className="text-white">
                      Prénom
                    </Label>
                    <Input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Prénom"
                      value={formData.firstname}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    {errors.firstname && (
                      <div
                        className="warning"
                        style={{
                          color: '#ff6d00',
                          fontWeight: '500',
                          fontSize: 20,
                        }}
                      >
                        {errors.firstname}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup
                    style={{
                      flex: 1,
                    }}
                  >
                    <Label for="lastname" className="text-white">
                      Nom
                    </Label>
                    <Input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Nom"
                      value={formData.lastname}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    {errors.lastname && (
                      <div
                        className="warning"
                        style={{
                          color: '#ff6d00',
                          fontWeight: '500',
                          fontSize: 20,
                        }}
                      >
                        {errors.lastname}
                      </div>
                    )}
                  </FormGroup>
                </div>
                <FormGroup>
                  <Label for="phoneNumber" className="text-white">
                    Téléphone
                  </Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Téléphone"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.phoneNumber && (
                    <div
                      className="warning"
                      style={{
                        color: '#ff6d00',
                        fontWeight: '500',
                        fontSize: 20,
                      }}
                    >
                      {errors.phoneNumber}
                    </div>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label for="email" className="text-white">
                    E-mail
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Votre adresse email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.email && (
                    <div
                      className="warning"
                      style={{
                        color: '#ff6d00',
                        fontWeight: '500',
                        fontSize: 20,
                      }}
                    >
                      {errors.email}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="dateMaried" className="text-white">
                    Date de l'évènement
                  </Label>
                  <Input
                    type="text"
                    name="dateMaried"
                    id="dateMaried"
                    placeholder="Date de votre mariage"
                    value={formData.dateMaried}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.dateMaried && (
                    <div
                      className="warning"
                      style={{
                        color: '#ff6d00',
                        fontWeight: '500',
                        fontSize: 20,
                      }}
                    >
                      {errors.dateMaried}
                    </div>
                  )}
                </FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  className={styles.mybutton}
                >
                  Être rappelé par nos équipes
                </Button>
                {/* <Button
                  color="primary"
                  type="button"
                  onClick={() => history.push(path.recap)}
                  className={styles.mybutton}
                >
                  Recap test
                </Button> */}
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
