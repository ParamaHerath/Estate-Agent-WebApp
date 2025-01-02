import styles from './Footer.module.css';

function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2024 Estate Agent WebApp. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer; 