import { Card } from "antd";
import React from "react";

const TermsPage = () => {
  return (
    <Card style={{ marginTop: 50 }}>
      <h1>Terms and Conditions</h1>
      <div>
        This page informs you of our policies regarding the collection, use, and
        disclosure of personal data when you use our Service and the choices you
        have associated with that data. We use your data to provide and improve
        the Service. By using the Service, you agree to the collection and use
        of information in accordance with this policy.
        <h2>Information Collection</h2>
        And Use We collect several different types of information for various
        purposes to provide and improve our Service to you. <br />
        Types of Data Collected <br /> <br />
        <h3> Personal Data</h3>
        While using our Service, we may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you ("Personal Data"). Personally identifiable information may
        include, but is not limited to:
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Cookies and Usage Data</li>
        </ul>
        <br />
        We may use your Personal Data to contact you with newsletters, marketing
        or promotional materials and other information that may be of interest
        to you. You may opt out of receiving any, or all, of these
        communications from us by following the unsubscribe link or instructions
        provided in any email we send.
        <h3> Usage Data</h3>
        We may also collect information on how the Service is accessed and used
        ("Usage Data"). This Usage Data may include information such as your
        computer's Internet Protocol address (e.g. IP address), browser type,
        browser version, the pages of our Service that you visit, the time and
        date of your visit, the time spent on those pages, unique device
        identifiers and other diagnostic data.
        <h3>Tracking & Cookies Data </h3>
        We use cookies and similar tracking technologies to track the activity
        on our Service and hold certain information. <br />
        Cookies are files with small amount of data which may include an
        anonymous unique identifier. Cookies are sent to your browser from a
        website and stored on your device. Tracking technologies also used are
        beacons, tags, and scripts to collect and track information and to
        improve and analyze our Service. <br /> <br />
        You can instruct your browser to refuse all cookies or to indicate when
        a cookie is being sent. However, if you do not accept cookies, you may
        not be able to use some portions of our Service. <br /> <br />
        <h3> Use of Data [Insert your company name]</h3>
        uses the collected data for various purposes: To provide and maintain
        the Service To notify you about changes to our Service To allow you to
        participate in interactive features of our Service when you choose to do
        so To provide customer care and support To provide analysis or valuable
        information so that we can improve the Service To monitor the usage of
        the Service To detect, prevent and address technical issues Transfer Of
        Data Your information, including Personal Data, may be transferred to —
        and maintained on — computers located outside of your state, province,
        country or other governmental jurisdiction where the data protection
        laws may differ than those from your jurisdiction.
      </div>
    </Card>
  );
};

export default TermsPage;
