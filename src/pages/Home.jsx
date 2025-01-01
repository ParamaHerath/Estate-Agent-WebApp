import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Estate Agent WebApp</h1>
      <p className={styles.description}>
        Welcome to the Estate Agent WebApp. This is the home page.
      </p>
      <Link to="/search" className={styles.browseLink}>
        Browse Property
      </Link>
    </div>
  );
}

export default Home;