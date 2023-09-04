import { images } from 'theme'
import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './custompack.module.scss'

const ButtonShow = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.mybuttonshow} type="button">
      <img src={images.eye} alt="eye" />
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
          percent: 60,
          color: true,
        },
        {
          text: '1 An',
          infos: '+ 200€',
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
    console.log(' *** offerSelected ***', offerSelected?.key)
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
                                color: item.color ? '#00908A' : '#255866',
                                fontSize: 22,
                                fontFamily:
                                  "'Poppins', 'Arial Narrow', Arial, sans-serif",
                                fontWeight: '600',
                              }}
                            >
                              {item.text}
                            </span>
                            <span
                              style={{
                                display: 'block',
                                fontSize: 18,
                                fontWeight: '400',
                                marginTop: 16,
                                color: '#255866',
                              }}
                            >
                              {item.infos}
                            </span>
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
    </div>
  )
}

export default CustomPack
