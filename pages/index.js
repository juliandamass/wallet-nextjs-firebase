import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { TransactionContext } from './transaction-context';
import TransactionForm from '../components/transaction-form';
import TransactionList from '../components/transaction-list';
import Loading from '../components/loading';

export default function Home() {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');

  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMsg(msg);
    setAlertOpen(true);
  };

  return <Loading />;

  return (
    // <TransactionContext.Provider value={{ showAlert }}>
    <div>
      <div>
        {isAlertOpen}
        {alertType}
        {alertMsg}
      </div>
      <br />
      <TransactionForm />
      <TransactionList />
    </div>
    // </TransactionContext.Provider>
  );
}
