import { useOfferContext } from 'context/offerContext'
import React, { Component } from 'react'

import WheelComponent from 'react-wheel-of-prizes'
import { Container, Modal, ModalBody, ModalHeader } from 'reactstrap'

export const WheelGame = ({ modalOpen, toggleModal }) => {
  const segments = ['-5%', '-10%', '-15%', '-30%']
  const segColors = ['#c62828', '#fafafa', '#c62828', '#fafafa']
  const onFinished = (winner) => {
    updateMyObject({
      wheelGains: winner,
    })
    console.log(winner)
  }
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      style={{
        width: '70%',
        maxWidth: '70%',
        margin: '0 auto',
      }}
    >
      <ModalHeader toggle={toggleModal}>
        <h3
          style={{
            fontFamily: 'Playfair Display',
            textAlign: 'center',
            display: 'flex',
            alignSelf: 'center',
            color: '#255866',
            fontSize: 56,
          }}
        >
          Tentez votre chance ! 🍀
        </h3>
      </ModalHeader>

      <ModalBody
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            marginLeft: 290,
          }}
        >
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment="won 10"
            onFinished={(winner) => onFinished(winner)}
            primaryColor="#00908A"
            contrastColor="white"
            buttonText="Tourner"
            isOnlyOnce={false}
            size={290}
            upDuration={500}
            downDuration={1000}
            fontFamily="Poppins"
          />
        </div>
      </ModalBody>
    </Modal>
  )
}
