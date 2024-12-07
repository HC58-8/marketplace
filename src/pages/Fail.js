import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Fail = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('payment_id');

    return (
        <div>
            <h1>Échec du Paiement 😞</h1>
            <p>ID du paiement : {paymentId}</p>
        </div>
    );
};

export default Fail;
