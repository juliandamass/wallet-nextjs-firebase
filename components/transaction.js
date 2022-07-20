import { deleteDoc, doc } from 'firebase/firestore';
import moment from 'moment';
import { useRouter } from 'next/router';
import { db } from '../firebase';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  TrashIcon,
} from '@heroicons/react/outline';

const Transaction = ({ id, amount, name, type, timestamp }) => {
  const router = useRouter();

  const deleteTransaction = async (id, e) => {
    e.stopPropagation();

    const docRef = doc(db, 'transactions', id);
    await deleteDoc(docRef);
  };

  const transactionDetail = (id) => {
    router.push(`/transaction/${id}`);
  };

  return (
    <div
      className="col-span-1  border border-gray-100 p-3 rounded-lg hover:shadow-lg transition ease-in-out cursor-pointer"
      onClick={(e) => transactionDetail(id)}
    >
      <div className="flex flex-row w-full">
        <div className="flex flex-row items-center mr-auto">
          <div className="w-12 h-12 min-w-min rounded-full mr-4 flex items-center justify-center border border-gray-400">
            {type == 'debit' ? (
              <TrendingUpIcon className="w-6 h-6 text-emerald-600" />
            ) : (
              <TrendingDownIcon className="w-6 h-6 text-rose-600" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1 leading-none">{name}</p>
            <p className="text-2xl font-bold leading-none">{amount}</p>
          </div>
        </div>
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center border border-rose-600 bg-white hover:bg-rose-600 text-rose-600 hover:text-white transition ease-in-out"
          onClick={(e) => deleteTransaction(id, e)}
        >
          <TrashIcon className="h-4 w-4 " />
        </button>
      </div>
    </div>
  );
};

export default Transaction;
