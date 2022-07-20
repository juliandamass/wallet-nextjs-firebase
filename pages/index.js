import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '../firebase';

import Transaction from '../components/transaction';

import { TransactionContext } from './transaction-context';
import TransactionForm from '../components/transaction-form';
import TransactionList from '../components/transaction-list';

import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Home() {
  // const [isAlertOpen, setAlertOpen] = useState(false);
  // const [alertType, setAlertType] = useState('success');
  // const [alertMsg, setAlertMsg] = useState('');

  // const showAlert = (type, msg) => {
  //   setAlertType(type);
  //   setAlertMsg(msg);
  //   setAlertOpen(true);
  // };

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, 'transactions');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTransactions(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  const getBalance = () => {
    let credit = 0;
    let debit = 0;
    let balance = 0;

    transactions.map((transaction) => {
      if (transaction.type == 'credit') credit += Number(transaction.amount);
      if (transaction.type == 'debit') debit += Number(transaction.amount);
    });

    balance = debit - credit;

    return balance;
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
            <p className="text-5xl font-bold ">{getBalance()}</p>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="p-4 pb-20">
          <p className="font-bold mb-4">Transactions</p>
          <div className="grid grid-cols-1 gap-4">
            {transactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                id={transaction.id}
                amount={transaction.amount}
                name={transaction.name}
                type={transaction.type}
                timestamp={transaction.timestamp}
              />
            ))}
          </div>
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
