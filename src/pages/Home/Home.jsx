import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.css'

function Home() {
  return (
    <>
      <Header />
      <div className={styles.banner}>
        <div className={styles.container}>
          <h1 className={styles.title}>Hey there!</h1>
          <p className={styles.description}>
           <b>Looking for your dream home?</b><br></br>
          </p>
          <p className={styles.description}>
           Find the perfect flat or house that suits your needs, lifestyle, and budget. Whether you're buying, renting, or just exploring, we've got listings for every taste and preference.<br></br>
          </p>
          <p className={styles.description}> 
           <b>Start your search today and discover the possibilities!</b>
          </p>
          <Link to="/search" className={styles.browseLink}>
            Let's find your home!
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;