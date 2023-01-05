import React from 'react';
import './home.css';
import Welcomepanel from '../components/Welcomepanel';
import Bookshelf from '../components/Bookshelf';

function home() {
  return (
    <>
    <Welcomepanel />
    <Bookshelf />
    </>
  )
}

export default home