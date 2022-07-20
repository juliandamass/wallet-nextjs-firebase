import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '../firebase';

import Transaction from '../components/transaction';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, 'transactions');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    console.log(q);
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

  return (
    <div>
      {transactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          id={transaction.id}
          name={transaction.name}
          timestamp={transaction.timestamp}
        />
      ))}
    </div>
  );
};

export default TransactionList;
