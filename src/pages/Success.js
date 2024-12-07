import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams(); // Récupère les paramètres de l'URL
  const [output, setOutput] = useState(""); // État pour stocker le statut du paiement

  useEffect(() => {
    // Appel API pour récupérer les détails du paiement
    const paymentId = searchParams.get("payment_id"); // Récupère l'ID de paiement de l'URL

    if (paymentId) {
      axios
        .get(`/api/payment/${paymentId}`) // Utilise l'ID de paiement pour faire une requête à l'API
        .then((res) => {
          // Vérifie si la réponse est valide
          if (res.data && res.data.result) {
            setOutput(res.data.result.status); // Met à jour le statut du paiement
          } else {
            setOutput("ERROR"); // Si la réponse n'est pas valide, définit le statut sur erreur
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du statut de paiement", err);
          setOutput("ERROR"); // En cas d'erreur, on définit le statut sur erreur
        });
    }
  }, [searchParams]); // L'effet dépend des paramètres de l'URL, notamment de l'ID de paiement

  return (
    <React.Fragment>
      {/* Affiche le message de succès si le paiement est réussi */}
      {output === "SUCCESS" && (
        <div className="p-4">
          <div role="alert" className="alert alert-success">
            <span>Paiement réussi 🎉</span>
          </div>
        </div>
      )}

      {/* Affiche un message d'erreur si le paiement a échoué ou si une erreur est survenue */}
      {output === "ERROR" && (
        <div className="p-4">
          <div role="alert" className="alert alert-danger">
            <span>Erreur lors du traitement du paiement. Veuillez réessayer.</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Success;
