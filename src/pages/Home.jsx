import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1>Estate Agent WebApp</h1>
      <p>Welcome to the Estate Agent WebApp. This is the home page.</p>
      <Link to="/search">
        Browse Property
      </Link>
    </>
  );
}

export default Home;