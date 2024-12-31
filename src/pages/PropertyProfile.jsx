import { Link, useParams } from 'react-router-dom'
import propertyData from '../assets/properties.json'

function PropertyProfile() {
  const { id } = useParams()
  const property = propertyData.properties.find(p => p.id === id)

  if (!property) {
    return <div>Error! - Property not found!</div>
  }

  return (
    <div className='container'>
      <div>
        <Link to="/search">⬅️ Back to Search</Link>
      </div>
      <div className="property-profile">
        <div>
          <img src={`/${property.picture}`} alt={`Main image of ${property.id}`} />
        </div>
        <div className="profile-info">
          <h2>Property Profile</h2>
          <p><strong>ID:</strong> {property.id}</p>
          <p><strong>Type:</strong> {property.type}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Price:</strong> {"£ " + property.price}</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyProfile;