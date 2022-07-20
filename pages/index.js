import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { TransactionContext } from './transaction-context';
import TransactionForm from '../components/transaction-form';
import TransactionList from '../components/transaction-list';
import Loading from '../components/loading';

import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Home() {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');

  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMsg(msg);
    setAlertOpen(true);
  };

  return (
    // <TransactionContext.Provider value={{ showAlert }}>
    <div className="w-full text-gray-900">
      {/* <div>
        {isAlertOpen}
        {alertType}
        {alertMsg}
      </div> */}
      <div className="bg-gray-50 border-b-2 border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="p-4 pb-0 text-end">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <p className="text-gray-600">to your wallet</p>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600">Total Balance</p>
            <p className="text-5xl font-bold ">5000</p>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="p-4 pb-20">
          <p className="font-bold mb-4">Transactions</p>
          <TransactionList />
        </div>
      </div>
      <div className="fixed bottom-4 lg:bottom-10 right-4 lg:right-10">
        <Link href="/update">
          <button className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-emerald-600 bg-white hover:bg-emerald-600 text-emerald-600 hover:text-white transition ease-in-out">
            <PlusIcon className="h-6 w-6 " />
          </button>
        </Link>
      </div>
    </div>
    // </TransactionContext.Provider>
  );
}
