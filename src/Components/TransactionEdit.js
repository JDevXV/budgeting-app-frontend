import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import { apiURL } from "../util/apiURL";
const API = apiURL();

const TransactionEdit = ({ updateTransaction }) => {
  let history = useHistory();
  let { index } = useParams();
  const [transaction, setTransaction] = useState({
    from: "",
    date: "",
    name: "",
    amount: "",
  });
  const handleTextChange = (e) => {
    setTransaction({ ...transaction, [e.target.id]: e.target.value });
  };

  const handleNumber = (e) => {
    setTransaction({ ...transaction, amount: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTransaction(transaction, index);
    history.push(`/transactions/${index}`);
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`${API}/transactions/${index}`);
        console.log(res.data);
        setTransaction(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransaction();
  }, [index]);

  return (
    <div className="d-flex flex-column  align-items-center fontType">
      <form onSubmit={handleSubmit} className="form d-flex flex-column col-5">
        <label htmlFor="date">Transaction Date:</label>
        <input
          id="date"
          value={transaction.date}
          type="date"
          onChange={handleTextChange}
          placeholder="yyyy-MM-dd"
          pattern="\d{4}-\d{2}-\d{2}"
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          required
          value={transaction.name}
          placeholder="Name"
          onChange={handleTextChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          name="Amount"
          type="number"
          value={transaction.amount}
          placeholder="Amount"
          onChange={handleNumber}
        />

        <label htmlFor="daysSinceLastCrisis">From:</label>
        <input
          id="from"
          name="From"
          type="text"
          value={transaction.from}
          onChange={handleTextChange}
          placeholder="From"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TransactionEdit;
