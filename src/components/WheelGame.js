import { useState } from 'react'
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
  ModalHeader,
  Row,
  Spinner,
} from 'reactstrap'
import { path } from 'utils/const'
import { firestore } from 'utils/firebase'
import { useOfferContext } from 'context/offerContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import WheelComponent from 'react-wheel-of-prizes'

import styles from './wheel.module.scss'

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

export const WheelGame = ({ modalOpen, toggleModal, setModalOpen }) => {
  const { myObject, updateMyObject } = useOfferContext()
  const history = useHistory()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [errors, setErrors] = useState({})
  const [showSpinned, setShowSpinned] = useState(false)
  const [lot, setLot] = useState('')
  const [selectedGender, setSelectedGender] = useState('')

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value)
  }
  const [messageAlert, setMessageAlert] = useState(
    'Merci pour votre participation 🎁',
  )

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
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

    const newErrors = {}

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

    if (Object.keys(newErrors).length === 0) {
      const data = {
        ...formData,
        lot,
      }
      console.log(' *** data ***', data)
      try {
        await firestore.collection('anonymous').add(data)
        setIsOpenModal(true)

        setTimeout(() => {
          setIsOpenModal(false)
          setModalOpen(!modalOpen)
        }, 1800)
      } catch (error) {
        console.log(' *** error ***', error)
      }
    } else {
      setErrors(newErrors)
    }
  }

  const segments = ['-5%', '-10%', '-15%', '-30%', '-15%', '-5%', '-10%']
  const segColors = [
    '#cf3030',
    '#e58432',
    '#d2d456',
    '#9ccf57',
    '#88bbf7',
    '#e58432',
    '#d2d456',
  ]
  const onFinished = (winner) => {
    updateMyObject({
      wheelGains: winner,
    })
    setLot(winner)
  }
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      style={{
        width: '90%',
        maxWidth: '90%',
        margin: '0 auto',
      }}
    >
      <SuccessAlertModal
        isOpen={isOpenModal}
        message={messageAlert}
        showSpinned={showSpinned}
      />
      <ModalBody
        style={{
          display: 'flex',
        }}
      >
        <Row>
          {!lot && <Col md={3}></Col>}
          <Col md={7}>
            <h4
              style={{
                fontFamily: 'Playfair Display',
                textAlign: 'center',
                color: '#00908A',
                fontSize: 40,
                marginBlock: 10,
              }}
            >
              Tourner la roue pour découvrir votre lot !
            </h4>
            <WheelComponent
              segments={segments}
              segColors={segColors}
              winningSegment="won 10"
              onFinished={(winner) => onFinished(winner)}
              primaryColor="#160723"
              contrastColor="#ffffff"
              buttonText=" "
              isOnlyOnce={false}
              size={290}
              upDuration={500}
              downDuration={1000}
              fontFamily="Poppins"
            />
          </Col>
          {!lot && <Col md={2}></Col>}
          {lot && (
            <Col md={5}>
              {lot && (
                <div style={{ marginBottom: 30 }}>
                  <h3
                    style={{
                      fontFamily: 'Playfair Display',
                      display: 'flex',
                      color: '#00908A',
                      fontSize: 35,
                    }}
                  >
                    Vous avez gagné {lot} sur la création de votre site de
                    faire-part
                  </h3>
                  <span className={styles.textForm} style={{ marginTop: 10 }}>
                    Recevoir mon lot par e-mail
                  </span>
                </div>
              )}
              {errors.lot && (
                <div
                  className="warning"
                  style={{
                    color: '#ff6d00',
                    fontWeight: '500',
                    fontSize: 20,
                  }}
                >
                  {errors.lot}
                </div>
              )}

              <Container>
                <Form
                  onSubmit={handleSubmit}
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                  }}
                >
                  <FormGroup tag="fieldset" className="row" style={{ gap: 20 }}>
                    <FormGroup
                      style={{
                        flex: 1,
                      }}
                    >
                      <Label for="firstname" className={styles.label}>
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
                      <Label for="lastname" className={styles.label}>
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
                  </FormGroup>

                  <FormGroup>
                    <Label for="phoneNumber" className={styles.label}>
                      Téléphone
                    </Label>
                    <Input
                      type="tel"
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
                  {/* <FormGroup>
                  <Label for="dateMaried" className={styles.label}>
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
                </FormGroup> */}
                  <FormGroup>
                    <Label for="email" className={styles.label}>
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

                  <Button
                    color="primary"
                    type="submit"
                    className={styles.mybutton}
                  >
                    Recevoir mon lot par e-mail
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
            </Col>
          )}
        </Row>
      </ModalBody>
    </Modal>
  )
}
