import { useContext, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from '../firebase';

import { TransactionContext } from '../pages/transaction-context';
import Link from 'next/link';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const TransactionForm = () => {
  // const { showAlert } = useContext(TransactionContext);

  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState({
    amount: '',
    name: '',
    type: 'credit',
  });

  const onAdd = async () => {
    setLoading(true);

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

    router.push(`/`);

    // showAlert('success', `Transaction with id ${docRef.id} added`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-4">
        <Link href="/">
          <button className="flex items-center justify-center border-2 border-gray-700 rounded-full bg-white hover:bg-gray-700 px-4 py-1 pl-2 text-gray-700 hover:text-white font-bold leading-none transition ease-in-out mb-4">
            <ArrowNarrowLeftIcon className="w-4 h-4 mr-1" />
            Back
          </button>
        </Link>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            className="w-full border-2 border-gray-400 px-4 py-2 bg-white rounded-lg leading-none"
            onChange={(e) =>
              setTransaction({ ...transaction, amount: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full border-2 border-gray-400 px-4 py-2 bg-white rounded-lg leading-none"
            onChange={(e) =>
              setTransaction({ ...transaction, name: e.target.value })
            }
          />
          <select
            name="type"
            id="type"
            className="w-full border-2 border-gray-400 px-4 py-2 bg-white rounded-lg leading-none"
            onChange={(e) =>
              setTransaction({ ...transaction, type: e.target.value })
            }
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <button
            className="w-full flex items-center justify-center p-4 bg-emerald-600 text-xl text-white font-bold rounded-lg leading-none hover:shadow-lg transition ease-in-out"
            disabled={isLoading ? 'disabled' : ''}
            onClick={onAdd}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
