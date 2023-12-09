'use client'

import Image from 'next/image';
import { useState } from 'react';
import './style.css';
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const petInfo = {
    name: '...',
    species: '...',
    breed: '...',
    age: '...',
    vaccineStatus: '...',
    neuterStatus: '...',
    location: '...',
    bio: '...',
    profileImage: '/goated.jpg', // Example URL for the profile image
  };

  const userInfo = {
    name: 'Your Name',
    username: 'Your username',
    profileImage: '/goated.jpg',
  };

  const [editedPetInfo, setEditedPetInfo] = useState({ ...petInfo });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited pet info to the server
    // You can send a request to update the information here
    // Once the save is successful, set isEditing to false
    const updatedPetInfo = editedPetInfo;

    fetch(`api/profile`, { method: 'put', body: JSON.stringify(updatedPetInfo) }).then((response) => {
      if (response.ok) {
        console.log('It worked!');
      }
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPetInfo({
      ...editedPetInfo,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setEditedPetInfo({
        ...editedPetInfo,
        profileImage: URL.createObjectURL(imageFile),
        imageFile,
      });
    }
  };

  return (
    <div className="main-container">
      <div className="top-bar">
        {/* Place your logo or title in the top bar */}
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            {isEditing ? (
              <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
            ) : (
              <Image src={editedPetInfo.profileImage} alt="Profile Picture" width={200} height={200} />
            )}
          </div>

          <div className="profile-info">
            <h1 className="profile-name">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  placeholder="Pet Name"
                  value={editedPetInfo.name}
                  onChange={handleInputChange}
                />
              ) : (
                editedPetInfo.name
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

            {isEditing ? (
              <button onClick={handleSaveClick}>Save</button>
            ) : (
              <button onClick={handleEditClick}>Edit</button>
            )}
          </div>

          <div className="pet-info-container">
            <div className="pet-info-group">
              <div className="pet-info-item">
                <strong>Species:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="species"
                    placeholder="Dog/Cat ..."
                    value={editedPetInfo.species}
                    onChange={handleInputChange}
                  />
                ) : (
                  editedPetInfo.species
                )}
              </div>
              <div className="pet-info-item">
                <strong>Breed:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="breed"
                    placeholder="Labrador Retriever ..."
                    value={editedPetInfo.breed}
                    onChange={handleInputChange}
                  />
                ) : (
                  editedPetInfo.breed
                )}
              </div>
              <div className="pet-info-item">
                <strong>Age:</strong>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    placeholder="Age of your pet ..."
                    value={editedPetInfo.age}
                    onChange={handleInputChange}
                    min="0"
                  />
                ) : (
                  editedPetInfo.age
                )}
              </div>
            </div>

            <div className="pet-info-group">
              <div className="pet-info-item">
                <strong>Vaccine Status:</strong>
                {isEditing ? (
                  <select name="vaccineStatus" value={editedPetInfo.vaccineStatus} onChange={handleInputChange}>
                    <option value="...">...</option>
                    <option value="Up to Date">Up to date</option>
                    <option value="Not up to Date">Not up to Date</option>
                  </select>
                ) : (
                  editedPetInfo.vaccineStatus
                )}
              </div>
              <div className="pet-info-item">
                <strong>Neuter Status:</strong>
                {isEditing ? (
                  <select name="neuterStatus" value={editedPetInfo.neuterStatus} onChange={handleInputChange}>
                    <option value="...">...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                ) : (
                  editedPetInfo.neuterStatus
                )}
              </div>
              <div className="pet-info-item">
                <strong>Location:</strong>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    placeholder="State, City"
                    value={editedPetInfo.location}
                    onChange={handleInputChange}
                  />
                ) : (
                  editedPetInfo.location
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="image-gallery">
              <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}