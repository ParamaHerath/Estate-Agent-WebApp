import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>

          {/* Footer sections with links to different pages or dummy links that are not part of the coursework */}
          
          <div className={styles.footerSection}>
            <h3>Sitemap</h3>
            <ul>
              <li><a href="/">Home Page</a></li> 
              <li><a href="/search">Search Properties</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Our Agents</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Privacy Policy</h3>
            <ul>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Terms of Service</a></li>
              <li><a href="/">Cookie Policy</a></li>
              <li><a href="/">GDPR Compliance</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <ul>
              <li>123, Oak Street</li>
              <li>Manchester M1 1AB, UK</li>
              <li>Phone: +44123456789</li>
              <li>Email: <a href='mailto:info@nestquest.uk' className={styles.emailLink}> info@nestquest.uk </a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Socials</h3>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com/nestquestuk" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="https://twitter.com/nestquestuk" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="https://instagram.com/nestquestuk" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="https://linkedin.com/nestquestuk" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; 2025 NestQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 