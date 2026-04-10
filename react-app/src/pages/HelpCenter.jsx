import React from "react";

export default function HelpCenter({ compact = false }) {
  // If compact is true (used when embedded inside Profile), reduce top spacing
  const SectionTag = compact ? 'div' : 'section';
  // IMPORTANT: do NOT apply .page-content when compact — it adds large padding-top
  const sectionClass = compact ? '' : 'py-5 main_sec page-content';

  return (
    <SectionTag id="help-center" className={sectionClass}>
      <div className={compact ? '' : 'container'}>
  <h1 className="fw-bold" style={compact ? { marginTop: 0 } : {}}>Help Center</h1>
  <p className="text-muted">Last Updated: April 9, 2026</p>

        <p>
          Welcome to the Help Center for our Affordable Housing platform. This section is designed to assist users with common questions related to using the website, finding housing listings, contacting property owners, managing accounts, and understanding how our platform works.
        </p>

        <p>
          Our goal is to make the process of finding affordable housing as simple and transparent as possible. If you cannot find the answer to your question in this Help Center, please contact our support team through the contact form available on the website.
        </p>

        <h2>1. About Our Platform</h2>
        <p>
          Our website is designed to help students and members of the community find affordable housing opportunities in their area. We provide a platform where housing listings can be viewed, searched, and contacted directly by users.
        </p>
        <p>
          Listings may include apartments, shared housing, student housing, and other rental opportunities that fall within affordable price ranges. Our goal is to make housing information easier to access, especially for students and individuals who may be facing challenges finding reasonably priced accommodations.
        </p>
        <p>
          The platform allows users to browse listings, filter results based on preferences such as price and location, and contact property owners or managers directly.
        </p>

        <h2>2. Creating an Account</h2>
        <p>
          Creating an account allows users to access additional features of the website.
        </p>
        <p>To create an account, follow these steps:</p>
        <ol>
          <li>Click on the “Sign Up” or “Create Account” button on the homepage.</li>
          <li>Enter your name, email address, and create a password.</li>
          <li>Confirm your email address if required.</li>
          <li>Log into your account.</li>
        </ol>
        <p>
          Once your account is created, you will be able to save listings, manage preferences, and receive updates about new housing opportunities.
        </p>

        <h2>3. Searching for Housing Listings</h2>
        <p>
          The website provides several tools to help users search for available housing.
        </p>
        <p>Users can filter listings by:</p>
        <ul>
          <li>Location</li>
          <li>Price range</li>
          <li>Housing type</li>
          <li>Availability date</li>
          <li>Shared or private housing options</li>
        </ul>

        <h2>4. Contacting Property Owners</h2>
        <p>
          When users find a listing they are interested in, they may contact the property owner or manager directly through the platform.
        </p>
        <p>
          Depending on the listing, users may: send a message through the website, send an email to the property owner, or call the phone number provided in the listing.
        </p>

        <h2>5. Saving Listings</h2>
        <p>
          Users who create an account may save listings they are interested in.
        </p>

        <h2>6. Housing Alerts and Updates</h2>
        <p>Users may choose to receive notifications about new listings or housing opportunities.</p>

        <h2>7. Reporting Suspicious Listings</h2>
        <p>
          If you encounter a listing that appears suspicious, misleading, or fraudulent, please report it through the website. Our team will review reported listings and take appropriate action if necessary.
        </p>

        <h2>8. Account Management</h2>
        <p>
          Users may update their account information at any time through their account settings (Profile page).
        </p>

        <h2>9. Technical Issues</h2>
        <p>
          If you experience technical issues while using the website, try refreshing the page, clearing your cache, or using another browser. If the issue persists, contact support.
        </p>

        <h2>10. Safety Recommendations</h2>
        <p>
          Verify the identity of property owners, avoid sending payments before seeing properties, and use secure payment methods.
        </p>

        <h2>11. Contacting Support</h2>
        <p>
          Contact support through the website’s contact form or by email.
        </p>
  <p>Support Email: affordablehousing@gmail.com</p>

        <h2>12. Future Updates</h2>
        <p>
          Updates to this Help Center will be posted when new features become available.
        </p>
      </div>
    </SectionTag>
  );
}
