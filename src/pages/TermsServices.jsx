import React from "react";
import "../styles/TermsServices.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TermsServices() {
  return (
    <>
      <Header />

      <div className="terms-container">

        <h1>Spendofy Terms & Services</h1>

        <p><b>Effective Date:</b> March 2026</p>

        <p>
          Welcome to Spendofy. By using our application you agree to follow
          these Terms of Service. Spendofy is a personal finance management
          platform designed to help users track expenses, create budgets,
          and manage financial goals.
        </p>

        <h5>1. Description of Service</h5>

        <p>
          Spendofy provides tools to track spending, manage budgets and monitor
          financial habits. Spendofy is not a bank or financial institution and
          does not provide financial, investment or tax advice.
        </p>

        <h5>2. User Accounts</h5>

        <p>
          To access certain features of Spendofy, users must create an account.
          You agree to provide accurate information during registration and
          keep your account information updated.
        </p>

        <h5>3. Account Security</h5>

        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials including your email and password.
        </p>

        <h5>4. Account Termination</h5>

        <p>
          Users may delete their account at any time. Spendofy reserves the
          right to suspend or terminate accounts that violate our policies
          or misuse the platform.
        </p>

        <h5>5. Data Storage</h5>

        <p>
          Spendofy stores user financial records such as transactions,
          budgets, and categories to help users manage their finances.
          Users can request deletion of their data by deleting their account.
        </p>

        <h5>6. Bank Integration</h5>

        <p>
          Spendofy may allow users to connect their bank accounts to
          automatically import transactions. This feature is optional and
          may rely on third-party services.
        </p>

        <h5>7. Acceptable Use</h5>

        <ul>
          <li>No illegal or fraudulent activities</li>
          <li>No hacking or system abuse</li>
          <li>No uploading harmful software or malware</li>
          <li>No harassment of other users</li>
        </ul>

        <h5>8. Service Availability</h5>

        <p>
          We try to keep Spendofy available at all times but cannot guarantee
          uninterrupted service. Maintenance or technical issues may cause
          temporary downtime.
        </p>

        <h5>9. Limitation of Liability</h5>

        <p>
          Spendofy is provided "as is". We are not responsible for any
          financial losses, damages or data loss arising from the use
          of this service.
        </p>

        <h5>10. Changes to Terms</h5>

        <p>
          We may update these Terms at any time. Updated terms will be posted
          on this page.
        </p>

        <h5>11. Contact</h5>

        <p>
          If you have any questions about these Terms, contact us at:
        </p>

        <p className="contact-email">
          support@spendofy.com
        </p>

      </div>

      <Footer />
    </>
  );
}

export default TermsServices;