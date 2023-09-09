import { images } from 'theme'
import 'react-step-progress-bar/styles.css'
import { path } from 'utils/const'
import { ProgressBar, Step } from 'react-step-progress-bar'
import { useOfferContext } from 'context/offerContext'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './custompack.module.scss'

const ButtonView = ({ text, onClick, classeTextButton, className }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      <div style={{}}>
        <span className={classeTextButton}>{text || 'Prévisualiser'}</span>
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
          marginTop: 30,
          fontFamily: "'Poppins', 'Arial Narrow', Arial, sans-serif",
        }}
      >
        Etape 03
      </span>
      <span
        style={{
          fontSize: 50,
          fontWeight: '700',
          color: '#00908A',
          marginTop: 16,
          fontFamily: "'Playfair Display', 'Arial Narrow', Arial, sans-serif",
        }}
      >
        Customisez votre pack
      </span>
      <div style={{ width: 592, display: 'flex' }}>
        <span
          style={{
            fontSize: 18,
            fontWeight: '400',
            marginTop: 16,
            fontFamily: "'Poppins', 'Arial Narrow', Arial, sans-serif",
            flex: 1,
          }}
        >
          Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </span>
      </div>
    </div>
  )
}

const CustomPack = () => {
  const history = useHistory()
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoadging] = useState(false)
  const [progress, setProgress] = useState(25)
  const [offer1, setOffer1] = useState(20)
  const [offer2, setOffer2] = useState(16)
  const [offer3, setOffer3] = useState(20)
  const { updateMyObject } = useOfferContext()

  const offers = [
    {
      title: 'Campagne SMS',
      key: 'offer1',
      of: offer1,
      data: [
        {
          text: 'O relance',
          percent: 20,
          color: true,
        },

        {
          text: '1 relance',
          percent: 40,
          infos: 'Compris avec votre pack',
          color: true,
        },
        {
          text: '2 relances',
          infos: '+ 140€',
          percent: 60,
        },
        {
          text: '3 relances',
          infos: '+ 200€',
          percent: 100,
        },
      ],
    },
    {
      title: 'Extraction & Envoie',
      key: 'offer2',
      of: offer2,
      data: [
        {
          text: 'Aucun',
          percent: 16,
          color: true,
        },

        {
          text: 'Une fois',
          percent: 34,
          infos: '+ 40€',
        },
        {
          text: 'Tous les 3 mois',
          infos: '+ 150€',
          percent: 50,
        },
        {
          text: 'Tous les mois',
          infos: '+ 210€',
          percent: 66,
        },
        {
          text: 'Tous les 15 jours',
          infos: '+ 280€',
          percent: 100,
        },
      ],
    },
    {
      title: 'Gestion & Suivi',
      key: 'offer3',
      of: offer3,
      data: [
        {
          text: 'Aucun',
          percent: 20,
          color: true,
        },

        {
          text: '3 Mois',
          percent: 40,
          infos: '+ 180€',
          color: true,
        },
        {
          text: '6 mois',
          infos: '+ 350€',
          percent: 60,
          color: true,
        },
        {
          text: '1 An',
          infos: '+ 690',
          percent: 100,
        },
      ],
    },
  ]

  const handleClosePreview = () => {
    setShowPreview(false)
    setPreviewUrl('')
  }

  const isActive = (stepNumber) => {
    return /* activeStep */ 1 === stepNumber
  }

  const handleSelect = (percent, offerSelected) => {
    if (offerSelected?.key === 'offer1') {
      setOffer1(percent)
    }
    if (offerSelected?.key === 'offer2') {
      setOffer2(percent)
    }
    if (offerSelected?.key === 'offer3') {
      setOffer3(percent)
    }
  }

  const handleSelectOptions = () => {
    const selectedOptions = {}

    // Parcourir chaque valeur reçue (offer1, offer2, offer3)
    ;[offer1, offer2, offer3].forEach((selectedPercent, index) => {
      // Utiliser la fonction map pour obtenir une liste d'options correspondantes
      const optionsForValue = offers[index].data
        .filter((option) => option.percent <= selectedPercent)
        .map((option) => option.text)

      // Stocker les options correspondantes dans l'objet selectedOptions
      selectedOptions[`offer${index + 1}`] = optionsForValue
    })

    updateMyObject({
      customPack: selectedOptions,
    })
    history.push(path.form)
  }
  return (
    <div className={`${styles.container} App`}>
      <div className={styles.flower}>
        <img src={images.leaf} alt="eye" />
      </div>
      <Back history={history} />

      {offers?.map((offer, index) => {
        return (
          <div style={{ marginTop: index === 0 ? 64 : 120 }}>
            <p className={styles.offerTitle}>{offer.title}</p>
            <ProgressBar
              filledBackground="linear-gradient(to right, #00908A70, #00908A)"
              className={styles.progressBar}
              percent={offer.of}
            >
              <div></div>
              {offer.data.map((item, key) => {
                return (
                  <Step>
                    {({ accomplished }) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              height: 100,
                              marginTop: 75,
                            }}
                          >
                            <div
                              onClick={() => handleSelect(item.percent, offer)}
                              className={styles.circle}
                              style={{ cursor: 'pointer' }}
                            />
                            <span
                              onClick={() => handleSelect(item.percent, offer)}
                              style={{
                                color: accomplished ? '#00908A' : '#255866',
                                fontSize: 22,
                                fontFamily:
                                  "'Poppins', 'Arial Narrow', Arial, sans-serif",
                                fontWeight: '600',
                              }}
                            >
                              {item.text}
                            </span>
                            {/* <span
                              style={{
                                display: 'block',
                                fontSize: 18,
                                fontWeight: '400',
                                marginTop: 16,
                                color: '#255866',
                              }}
                            >
                              {item.infos}
                            </span> */}
                          </div>
                        </div>
                      )
                    }}
                  </Step>
                )
              })}
              <div></div>
            </ProgressBar>
          </div>
        )
      })}
      <div style={{ display: 'flex', alignSelf: 'flex-end', marginTop: 80 }}>
        <ButtonView
          onClick={() => history.push(path.form)}
          link="https://yazzievent.com/template-rosaly/"
          showIcon={false}
          text="Passer"
          className={styles.buttonSkiped}
          classeTextButton={styles.buttontextskiped}
        />
        <ButtonView
          onClick={handleSelectOptions}
          link="https://yazzievent.com/template-rosaly/"
          showIcon={false}
          text="Valider mes options"
          className={styles.buttonValidate}
          classeTextButton={styles.buttontext}
        />
      </div>
    </div>
  )
}

export default CustomPack
