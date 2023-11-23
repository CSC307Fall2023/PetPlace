'use client'
import Image from 'next/image';
import { useEffect, useState, useMemo} from 'react';
import './style.css';
import { MenuItem } from '@mui/material';
import Link from 'next/link';


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [editedGallery, setEditedGallery] = useState([]);

  //const [showUploadedImages, setShowUploadedImages] = useState(false);

  const [petInfo, setPetInfo] = useState({
    petName: '...',
    species: '...',
    breed: '...',
    age: '...',
    vaxxed: '...',
    sprayedNeutered: '...',
    location: '...',
    bio: '...',
    profileImage: '/goated.jpg', // Example URL for the profile image
  });

  const userInfo = {
    profileImage: "/goated.jpg",
    name: "Your Name",
    username: "Your username"
  }


  const [editedPetInfo, setEditedPetInfo] = useState({ ...petInfo });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  async function handleSaveClick () {
    // Save the edited pet info to the server
    // You can send a request to update the information here
    // Once the save is successful, set isEditing to false
    const updatedPetInfo = editedPetInfo

    await fetch(`api/profile/petinfo`, {method: "put", body: JSON.stringify(updatedPetInfo)}).then((response) =>{
      if(response.ok){
        console.log("It worked!");
        setPetInfo({...editedPetInfo});
      }
    })
    setIsEditing(false)

  };

  //Updates whatever section got updated. So if name got updated it will update name and if species got updated it updates species textbox
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPetInfo({
      ...editedPetInfo,
      [name]: value,
    });
  };

  //Adds a profile pic for the pet
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; 
    if (imageFile) {
      setEditedPetInfo({
        ...editedPetInfo, 
        profileImage: URL.createObjectURL(imageFile), 
        imageFile
      })
    }

  }

  //updates the EditedGallery with the image user provided.
  const handleImageSelection = (e) => {
    const images = Array.from(e.target.files);
    const file = images[0];
    const reader = new FileReader();
    const ar = []
    reader.onload = () => {
      ar.push(reader.result)
      setEditedGallery(ar)
    };
    reader.readAsDataURL(file);
    // console.log(images)
    // console.log(ar)
  }; 

  
  //update display gallery and also save it in the backend
  async function handleImageUpload () {
    setGallery((prevGallery) => [...prevGallery, ...editedGallery]);
    const imageUrls = editedGallery.map((image) => image);
    await fetch(`api/profile`, {method: "put", body: JSON.stringify(imageUrls)}).then((response) =>{
      if(response.ok){
        console.log("It worked!")
      }
    })
    setEditedGallery([])
  }


  useEffect(() => {
    console.log("mount")
    const fetchPetInfo = async () => {
      try {
        const response = await fetch(`api/profile/petinfo/getter`, {method: "get"})
        if(response.ok){
          const data = await response.json(); // Parse the JSON response
          if(data.status === 'No Profile'){
            setIsEditing(true)
          }
          else{
            setEditedPetInfo(data);
          }
          console.log(data)
        }
      } catch (error) {
        console.error('Error fetching pet information:', error);
      }
    };
    
    const fetchpetGal = async () =>{
      try {
        const response2 = await fetch(`api/profile/galleryhome/getter`, {method: "get"})
        if(response2.ok){
          const data2 = await response2.json()
          setGallery(data2)
        }
        
      } catch(error){
        console.error('Error fetching pet information:', error);
      }
    }

    fetchPetInfo();
    fetchpetGal()
  }, []);

  //memorize gallery to prevent from re rendering if gallery isn't updated.
  const memorizedGallery = useMemo(() => (

    gallery.map((image, index) => {
      // console.log(image)
      return (
        <div key={index}>
          <Image src={image} alt={`Gallery Image ${index}`} width={100} height={100} />
        </div>
      );
      
    })
  ), [gallery]);


  return (
    <div className="profile-container">
      <div className = "pet-container">
        <div className="profile-header">
          <div className="profile-image">
            {isEditing ? (
              <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
            ) : (
              <Image src={editedPetInfo.profileImage} alt="Profile Picture" width = {200} height ={200} />
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {isEditing ? (
                <input
                  type="text"
                  name="petName"
                  placeholder = "Pet Name"
                  value={editedPetInfo.petName}
                  onChange={handleInputChange}
                />
              ) : (
                editedPetInfo.petName
              )}
            </h1>

            <p className="profile-bio">
              {isEditing ? (
                <textarea
                  name="bio"
                  placeholder="Short bio or description goes here"
                  value={editedPetInfo.bio}
                  onChange={handleInputChange}
                />
              ) : (
                editedPetInfo.bio
              )}
            </p>

          </div>

        </div>
        <h2>Pet Info</h2>
        <ul className="pet-info-list">
          <li className="pet-info-item">
            <strong>Species:</strong>
            {isEditing ? (
              <input
                type="text"
                name="species"
                placeholder = "Dog/Cat ..."

                value={editedPetInfo.species}
                onChange={handleInputChange}
              />
            ) : (
              editedPetInfo.species
            )}
          </li>
          <li className="pet-info-item">
            <strong>Breed:</strong>
            {isEditing ? (
              <input
                type="text"
                name="breed"
                placeholder = "Labrador Retriever ..."
                value={editedPetInfo.breed}
                onChange={handleInputChange}
              />
            ) : (
              editedPetInfo.breed
            )}
          </li>
          <li className="pet-info-item">
            <strong>Age:</strong>
            {isEditing ? (
              <input
                type="number"
                name="age"
                placeholder = "Age of your pet ..."
                value={editedPetInfo.age}
                onChange={handleInputChange}
                min="0"
              />
            ) : (
              editedPetInfo.age
            )}
          </li>
          <li className="pet-info-item">
            <strong>Vaccine Status:</strong>
            {isEditing ? (
              <select
                name="vaxxed"
                value={editedPetInfo.vaxxed}
                onChange={handleInputChange}
              > 
                <option value = "...">...</option>
                <option value = "Up to Date">Up to Date</option>
                <option value = "Not up to Date">Not up to Date</option>
              </select>
            ) : (
              editedPetInfo.vaxxed
            )}
          </li>
          <li className="pet-info-item">
            <strong>Neuter Status:</strong>
            {isEditing ? (
              <select
                name="sprayedNeutered"
                value={editedPetInfo.sprayedNeutered}
                onChange={handleInputChange}
              > 
                <option value = "...">...</option>
                <option value = "Yes">Yes</option>
                <option value = "No">No</option>
              </select>
            ) : (
              editedPetInfo.sprayedNeutered
            )}
          </li>
          <li className="pet-info-item">
            <strong>Location:</strong>
            {isEditing ? (
              <input 
              type="text" 
              name="location"
              placeholder = "State, City"
              value={editedPetInfo.location}
              onChange={handleInputChange} />
            ) : (
              editedPetInfo.location
            )}
          </li>
        </ul>
        {!isEditing ? (
          <div>
            <input
              type="file"
              accept="image/*"
              // multiple
              onChange={handleImageSelection}
            />
            <button onClick={handleImageUpload}>+</button> 
          </div>
        ): null}
        
        {!isEditing && (
          <div>
            {memorizedGallery}
          </div>
        )}
        
        {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )} 
      </div>
      <div className = "userContainer">
        <p>userinfo</p>
      </div>
    </div>
  );
}