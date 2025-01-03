import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Sitemap</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/search">Search Properties</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/agents">Our Agents</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Privacy Policy</h3>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/gdpr">GDPR Compliance</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <ul>
              <li>123, Oak Street</li>
              <li>Manchester M1 1AB, UK</li>
              <li>Phone: +44123456789</li>
              <li>Email: info@estateagent.com</li>
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