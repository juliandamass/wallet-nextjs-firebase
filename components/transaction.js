import { deleteDoc, doc } from 'firebase/firestore';
import moment from 'moment';
import { useRouter } from 'next/router';
import { db } from '../firebase';

const Transaction = ({ id, name, timestamp }) => {
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
    <div onClick={(e) => transactionDetail(id)}>
      <p>
        {name} {moment(timestamp).format('MMMM DD, yyyy')}
      </p>
      <br />
      <button onClick={(e) => deleteTransaction(id, e)}>Delete</button>
      <br />
      <br />
    </div>
  );
};

export default Transaction;
