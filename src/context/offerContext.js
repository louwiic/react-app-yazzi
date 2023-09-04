import React, { createContext, useContext, useState } from 'react'

// Créez un contexte
const OfferContext = createContext()

// Créez un Hook personnalisé pour accéder au contexte
export function useOfferContext() {
  return useContext(OfferContext)
}

// Créez un Provider pour encapsuler votre application
export function OfferContextProvider({ children }) {
  const [myObject, setMyObject] = useState({
    templateName: '', // Nom du template
    pack: { name: '', options: [] }, // Pack d'options
    customPack: { options: [] }, // Propriété de pack personnalisé
  })

  // Créez une fonction pour mettre à jour myObject
  const updateMyObject = (newData) => {
    setMyObject((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <OfferContext.Provider value={{ myObject, updateMyObject }}>
      {children}
    </OfferContext.Provider>
  )
}
