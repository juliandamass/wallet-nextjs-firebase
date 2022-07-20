import { useContext, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from '../firebase';

import { TransactionContext } from '../pages/transaction-context';

const TransactionForm = () => {
  // const { showAlert } = useContext(TransactionContext);

  const [transaction, setTransaction] = useState({
    amount: '',
    name: '',
    type: 'credit',
  });

  const onAdd = async () => {
    const collectionRef = collection(db, 'transactions');
    const docRef = await addDoc(collectionRef, {
      ...transaction,
      timestamp: serverTimestamp(),
    });
    setTransaction({
      amount: '',
      name: '',
      type: 'credit',
    });
    showAlert('success', `Transaction with id ${docRef.id} added`);
  };

  return (
    <div>
      <br />
      <input
        type="text"
        placeholder="Amount"
        onChange={(e) =>
          setTransaction({ ...transaction, amount: e.target.value })
        }
      />
      <br />
      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setTransaction({ ...transaction, name: e.target.value })
        }
      />
      <br />
      <select
        name="type"
        id="type"
        onChange={(e) =>
          setTransaction({ ...transaction, type: e.target.value })
        }
      >
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>
      <br />
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default TransactionForm;
