import PreviewWindow from 'components/IFrame'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { images } from 'theme'
import { path } from 'utils/const'
import { useOfferContext } from 'context/offerContext'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const { fullName, phoneNumber, email, dateMaried } = formData

    // Vérification des champs
    if (!fullName || !phoneNumber || !email || !dateMaried) {
      // Au moins un champ est vide, affichez un message d'erreur

      return // Empêche la soumission du formulaire
    }

    // Vous pouvez ici soumettre les données du formulaire ou les traiter selon vos besoins.
    console.log(formData)
  }

  useEffect(() => {
    console.log(' *** myObject ***', myObject)
  }, [myObject])

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
