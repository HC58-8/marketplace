const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailController {
  // Méthode pour envoyer un email
  static async sendEmail(recipientEmail, subject, message) {
    try {
      console.log("Début de l'envoi de l'email...");

      // Configuration du transporteur pour utiliser Gmail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Adresse e-mail depuis .env
          pass: process.env.EMAIL_PASSWORD, // Mot de passe d'application depuis .env
        },
      });

      // Options de l'email
      const mailOptions = {
        from: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
        to: recipientEmail, // Adresse e-mail du destinataire
        subject: subject, // Sujet de l'email
        text: message, // Contenu de l'email
      };

      console.log("Options de l'email configurées : ", mailOptions);

      // Envoi de l'email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email envoyé avec succès :", info.response);

      return { success: true, message: "Email envoyé avec succès." };
    } catch (error) {
      // Gestion des erreurs
      if (error.responseCode === 535) {
        console.error("Erreur : Les identifiants Gmail sont incorrects ou refusés.");
        console.error(
          "Assurez-vous que l'authentification à deux facteurs est activée et qu'un mot de passe d'application est utilisé."
        );
      } else {
        console.error("Erreur inconnue lors de l'envoi de l'email :", error.message);
      }
      return { success: false, message: `Erreur : ${error.message}` };
    }
  }

  // Méthode pour envoyer une confirmation de commande par email
  static async sendOrderConfirmation(email, fullName, orderDetails) {
    const subject = "Confirmation de votre commande";

    // Message personnalisé
    const message = `
      Bonjour ${fullName},

      Merci pour votre commande ! Voici les détails :

      - ID de commande : ${orderDetails.orderId}
      - Produits :
      ${orderDetails.products
        .map((item) => `  • ${item.name} - ${item.price} DT`)
        .join("\n")}
      - Montant total : ${
        orderDetails.products.reduce(
          (total, item) => total + parseFloat(item.price),
          0
        )
      } DT
      - Adresse de livraison : ${orderDetails.shippingAddress}

      Nous vous informerons dès que votre commande sera expédiée.

      Merci de faire confiance à Oxypharma !

      Cordialement,
      L'équipe Oxypharma
    `;

    console.log("Email de confirmation généré avec succès :", { email, fullName, subject });

    return await EmailController.sendEmail(email, subject, message);
  }
}

module.exports = EmailController;
