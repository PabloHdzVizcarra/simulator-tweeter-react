import React, {useState} from 'react';
import moment from 'moment';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ModalContainer from '../ModalContainer';
import FormSendTweet from '../FormSendTweet'

import './SendTweet.scss'
import { TWEETS_STORAGE } from '../../utils/constants';


const SendTweet = ({ setToasProps, allTweets }) => {

  // state del modal para abrir y cerrar
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setIsOpenModal(false);
  }

  const sendTweet = (event, formValue) => {
    event.preventDefault();
    const { name, tweet } = formValue;

    let allTweetsArray = [];

    if (allTweets) {
      allTweetsArray = allTweets;
    }

    if (!name || !tweet) {
      setToasProps({
        open: true,
        text: "WARNING: Todos los campos son obligatorios.",
      })

    } else {

      formValue.time = moment();
      allTweetsArray.push(formValue);
      localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray));
      setToasProps({
        open: true,
        text: "Tweet enviado correctamente",
      })


      closeModal();
    }

    allTweetsArray = [];

  }

  return (
    <div className="send-tweet">
      <Fab
        className="send-tweet__open-modal"
        color="primary"
        aria-label="add"
        onClick={openModal}
      >
        <AddIcon />
      </Fab>
      <ModalContainer
        isOpenModal={isOpenModal}
        closeModal={closeModal}
      >
        <FormSendTweet
          sendTweet={sendTweet}
        />
      </ModalContainer>
    </div>
  )
}

export default SendTweet;
