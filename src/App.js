import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Batch Insert Users
  const handleBatchInsert = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/batch/batch-insert', {
        users: [
          { name: 'virat', email: 'virat@gmail.com' },
          { name: 'kohli', email: 'kohli@gmail.com' },
        ],
      });
      console.log('Response:', response.data); // Log the server response
      setUsers(response.data); // Assuming you want to update the state
    } catch (error) {
      console.error('Batch Insert Error:', error.response?.data || error.message);
    }
  };
  
  // Stripe Payment
  const handleStripePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: 10, // $10
        currency: 'usd',
      });
      setPaymentStatus(response.data);
    } catch (error) {
      console.error('Stripe Payment Error:', error);
    }
  };

  return (
    <div>
      <h1>MERN Project: Batching, Rate Limiting, Stripe</h1>
      <button onClick={handleBatchInsert}>Batch Insert Users</button>
      <button onClick={handleStripePayment}>Pay with Stripe</button>

      {users && <pre>{JSON.stringify(users, null, 2)}</pre>}
      {paymentStatus && <pre>{JSON.stringify(paymentStatus, null, 2)}</pre>}
    </div>
  );
}

export default App;
