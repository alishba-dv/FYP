import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"; // Import the icons
import Cookies from "js-cookie"; // Importing the js-cookie library

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState({}); // Track image index for each pet
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [petType, setPetType] = useState(''); // State for pet type filter
const [myApplications, setMyApplications] = useState([ ]); 
  const userEmail = Cookies.get("curr_userEmail");

const petTypes = ["Dog", "Cat", "Bird", "Rabbit", "Other"]; // Pet type options
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://${host}:8080/api/admin/auth/getapprovedadoptionforms`);
        setPets(response.data.allforms);
       console.log(response) 
        const initialIndexes = response.data.allforms.reduce((acc, pet) => {
          acc[pet._id] = 0; // Default index 0 for each pet
          return acc;
        }, {});
        setCurrentIndex(initialIndexes);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);
  const handleUnpublish = async (petId) => {
    try {
      console.log('Unpublishing pet ID:', petId);
      const response = await axios.get(`http://${host}:8080/api/admin/auth/unpublish`, {
        params: { Id: petId }  
      });
      toast.error(response.data, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: `colored`,
				style: { marginRight: `100px` },
			});
      console.log('Ad unpublished successfully:', response.data);
      window.reload();
    
    } catch (error) {
      console.error('Error deactivating ad:', error.response?.data || error.message);
    }
  };
  


useEffect(() => {
    const fetchmyPets = async () => {
      try {
        const response = await axios.get(`http://${host}:8080/api/admin/auth/getmyadoptionforms`,userEmail);
        setMyApplications(response.data.allforms);
       console.log(response) 
        const initialIndexes = response.data.allforms.reduce((acc, pet) => {
          acc[pet._id] = 0; // Default index 0 for each pet
          return acc;
        }, {});
        setCurrentIndex(initialIndexes);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchmyPets();
  }, []);


  const handleCall = (Phone) => {
    window.location.href = `tel:${Phone}`;
  };

  const handleNext = (petId, imagesLength) => {
    setCurrentIndex(prevIndexes => ({
      ...prevIndexes,
      [petId]: (prevIndexes[petId] + 1) % imagesLength
    }));
  };

  const handlePrev = (petId, imagesLength) => {
    setCurrentIndex(prevIndexes => ({
      ...prevIndexes,
      [petId]: (prevIndexes[petId] - 1 + imagesLength) % imagesLength
    }));
  };

  const applyFilter = () => {
    let filteredPets = pets;
    
    if (search) {
      filteredPets = filteredPets.filter(pet => pet.PetName.toLowerCase().includes(search.toLowerCase()));
    }
    if (petType) {
      filteredPets = filteredPets.filter(pet => pet.PetType.toLowerCase() === petType.toLowerCase());
    }
    return filteredPets;
  };

  const filteredPets = applyFilter();

  return (
		<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Left Filter Section */}
     
			<div className='min-w-[200px] sm:min-w-[250px]'>
  {/* Pet Type Filter */}
  <div className="pl-5 py-4 my-6 transition-all duration-300 ease-in-out">
    <p className="mb-3 text-lg font-semibold text-gray-800">
      PET TYPE
    </p>
    <div className="flex flex-col gap-3 text-large font-medium text-gray-600">
      {petTypes.map((type) => (
        <div key={type}>
          <p
            onClick={() => {
              // Toggle the filter: if it's already selected, unselect it
              setPetType(prevType => prevType === type ? '' : type);
            }}
            className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
              petType === type ? 'text-[#F24C4C]' : 'text-gray-600'
            }`}
          >
            {type}
          </p>
          <hr className="border-t border-gray-300" />
        </div>
      ))}
      <p
        onClick={() => setPetType('')}
        className={`cursor-pointer px-2 py-1 transition duration-300 ease-in-out ${
          petType === '' ? 'text-[#F24C4C]' : 'text-gray-600'
        }`}
      >
        All Types
      </p>
    </div>
  </div>
</div>





      {/* Right Pet Grid */}
      <div className='flex-1'>
				<div className='mb-10'>
					<h1 className='text-[#F24C4C] text-5xl font-semibold sm:text-left'>
						Pets For  <span className='text-black'>Adoption</span>
					</h1>
				</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transform transition duration-300 hover:scale-105"
                style={{ minHeight: '550px' }}
              >
                {/* Image Container */}
                <div className="relative w-64 h-64 mx-auto overflow-hidden border-4 border-gray-200 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                {Array.isArray(pet.PetImage) && pet.PetImage.length > 0 ? (
    <>
      <img
        src={`http://${host}:8080/uploads/${pet.PetImage[currentIndex[pet._id] || 0]}`}
        className="w-full h-full object-cover rounded-lg"
        alt={pet.PetName || "Pet Image"}
      />
      {pet.PetImage.length > 1 && (
        <>
          <FaAngleLeft
            onClick={() => handlePrev(pet._id, pet.PetImage.length)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            size={24}
          />
          <FaAngleRight
            onClick={() => handleNext(pet._id, pet.PetImage.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
            size={24}
          />
        </>
      )}
    </>
  ) : (
    <p className="text-xl text-gray-600 flex items-center justify-center">No image available</p>
  )}
</div>
 

                {/* Pet Details */}
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{pet.PetName}</h2>
                <p className="text-gray-600"><strong>Age:</strong> {pet.Age} years</p>
                <p className="text-gray-600"><strong>Breed:</strong> {pet.PetBreed}</p>
                <p className="text-gray-600"><strong>Gender:</strong> {pet.PetType}</p>
                <p className="text-gray-600 text-center"><strong>Reason for Adoption:</strong> {pet.Reason}</p>
                <p className="text-gray-600"><strong>Contact:</strong> {pet.Phone}</p>

                <button
                  onClick={() => handleCall(pet.Phone)}
                  className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Call Now 📞
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              <p>No pets found for adoption. Please check back later!</p>
            </div>
          )}
        </div>
        {/* My Applications Section */}
<div className='mt-10'>
  <h1 className='text-4xl font-semibold text-[#F24C4C] mb-6'>
    My <span className="text-black">Posted Applications</span>
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {myApplications.length > 0 ? (
      myApplications.map((pet) => (
        <div
          key={pet._id}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transform transition duration-300 hover:scale-105"
          style={{ minHeight: '550px' }}
        >
          <div className="relative w-64 h-64 mx-auto overflow-hidden border-4 border-gray-200 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
            {Array.isArray(pet.PetImage) && pet.PetImage.length > 0 ? (
              <>
                <img
                  src={`http://${host}:8080/uploads/${pet.PetImage[currentIndex[pet._id] || 0]}`}
                  className="w-full h-full object-cover rounded-lg"
                  alt={pet.PetName || "Pet Image"}
                />
                {pet.PetImage.length > 1 && (
                  <>
                    <FaAngleLeft
                      onClick={() => handlePrev(pet._id, pet.PetImage.length)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                      size={24}
                    />
                    <FaAngleRight
                      onClick={() => handleNext(pet._id, pet.PetImage.length)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
                      size={24}
                    />
                  </>
                )}
              </>
            ) : (
              <p className="text-xl text-gray-600 flex items-center justify-center">No image availabe</p>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">{pet.PetName}</h2>
          <p className="text-gray-600"><strong>Age:</strong> {pet.Age} years</p>
          <p className="text-gray-600"><strong>Breed:</strong> {pet.PetBreed}</p>
          <p className="text-gray-600"><strong>Gender:</strong> {pet.PetType}</p>
          <p className="text-gray-600 text-center"><strong>Reason for Adoption:</strong> {pet.Reason}</p>
          <p className="text-gray-600"><strong>Contact:</strong> {pet.Phone}</p>
          <button
      onClick={() => handleUnpublish(pet._id)}
      className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Unpublish
    </button>   

    {/* Application Status */}
    <span
      className={`text-sm font-semibold px-2 py-1 rounded-md w-fit ${
        pet.Status?.toLowerCase() === 'approved'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {pet.Status?.toLowerCase() === 'approved' ? 'Approved' : 'Pending'}
    </span>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-600">
        <p>You haven't posted any applications yet.</p>
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default PetList;

