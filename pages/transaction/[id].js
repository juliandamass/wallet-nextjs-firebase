import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { db } from '../../firebase';

const TransactionDetail = ({ transactionProps }) => {
  const transaction = JSON.parse(transactionProps);

  console.log(transaction);

  return (
    <div>
      <Link href="/">
        <button>Back</button>
      </Link>
      <br />
      <p>{transaction.amount}</p>
      <p>{transaction.name}</p>
    </div>
  );
};

export default TransactionDetail;

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'transactions'));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const docRef = doc(db, 'transactions', id);
  const docSnap = await getDoc(docRef);

  return {
    props: { transactionProps: JSON.stringify(docSnap.data()) || null },
  };
};
