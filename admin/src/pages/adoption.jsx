import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"; // Import the icons
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Adoption = () => {

    const host = window.location.hostname === 'localhost'
    ? 'localhost'
    : '0.0.0.0'; 
    const [petRecords, setPetRecords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState({}); // Track image index for each pet
    useEffect(() => {
		toast.dismiss(); // Clear all previous toasts
	}, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
				// const token = localStorage.getItem('token');
                // console.log("Token: ",token)
                const response = await axios.post(`http://${host}:8080/api/admin/auth/getadoptionforms`, {}, {
                    withCredentials:true,
                  });

                if (response.data.allforms) {
                    setPetRecords(response.data.allforms);

                    // Initialize index for each pet's images
                    const initialIndexes = response.data.allforms.reduce((acc, pet) => {
                        acc[pet._id] = 0;
                        return acc;
                    }, {});
                    setCurrentIndex(initialIndexes);
                }
            } catch (err) {

                	if ( err.status === 400 ) {
				
		
				toast.error(`Session expired. Please Login again`, {
				  position: 'top-right',
				  style: { marginRight: '100px' },
				  autoClose: false,
				  hideProgressBar: false,
				  closeOnClick: true,
				  pauseOnHover: true,
				  draggable: true,
				  theme: 'colored',
				});
		
				toast.info(
				  <div>
					Login Here!{' '}
					<a
					  href='/'
					  style={{ color: 'red', textDecoration: 'underline' }}>
					  Login
					</a>
				  </div>,
				  {
					position: 'top-right',
					autoClose: false, // Auto-dismiss after 5 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				  });
                }
				console.error('Error fetching data:', err);
			}
		};
		fetchData();
	}, []);

    const handleApprove = async (petId) => {
        console.log(`Pet with ID: ${petId} approved!`);
        // const token=('token');
        const response = await axios.post(`http://${host}:8080/api/admin/auth/approvePetRequest`, { ID: petId },
            {
                 withCredentials:true,      });
        if (response) {
           
				toast.success(`Pet Application Approved Successfully`, {
                    position: 'top-right',
                    style: { marginRight: '100px' },
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                  }); 
        }
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

    return (
        <div className='pet-records container mx-auto p-8'>
<h1 className="text-3xl sm:text-4xl font-bold mb-8 text-red-500 ">
          Pet <span className="text-black">Records</span>
        </h1>            {petRecords.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {petRecords.map((pet) => (
                        <div
                            key={pet._id}
                            className='pet-card bg-white p-6 rounded-lg shadow-lg text-center'
                        >
                            {/* Fixed Image Container */}
                            <div className="relative w-64 h-64 mx-auto flex items-center justify-center overflow-hidden border rounded-lg">
                                {Array.isArray(pet.PetImage) && pet.PetImage.length > 0 ? (
                                    <>
                                        <img
                                            src={`http://${host}:8080/uploads/${pet.PetImage[currentIndex[pet._id]]}`}
                                            className="w-full h-full object-cover"
                                            alt={pet.PetName || "Pet Image"}
                                        />
                                        {pet.PetImage.length > 1 && (
                                            <>
                                                <FaAngleLeft
                                                    onClick={() => handlePrev(pet._id, pet.PetImage.length)}
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-70"
                                                    size={24}
                                                />
                                                <FaAngleRight
                                                    onClick={() => handleNext(pet._id, pet.PetImage.length)}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-70"
                                                    size={24}
                                                />
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <p className="text-xl text-gray-600 flex items-center justify-center">No image available</p>
                                )}
                            </div>

                            <h2 className='text-2xl font-semibold text-blue-600 mt-4'>{pet.PetName}</h2>
                            <p className='text-lg text-gray-700'><strong>Breed:</strong> {pet.PetBreed}</p>
                            <p className='text-lg text-gray-700'><strong>Age:</strong> {pet.Age} years</p>
                            <p className='text-lg text-gray-700'><strong>Color:</strong> {pet.PetColor}</p>
                            <p className='text-lg text-gray-700'><strong>Owner's Phone:</strong> {pet.Phone}</p>
                            <p className='text-lg text-gray-700'><strong>Owner's Name:</strong> {pet.CustomerName}</p>
                            <p className='text-lg text-gray-700'><strong>Owner's Email:</strong> {pet.CustomerEmail}</p>
                            <p className='text-lg text-gray-700'><strong>Posted On:</strong> {new Date(pet.Date).toLocaleDateString()}</p>

                            <button
                                type='button'
                                onClick={() => handleApprove(pet._id)}
                                className={`approve-btn py-2 px-4 rounded-full ${
                                    pet.Status === 'Approved'
                                        ? 'bg-green-500 cursor-not-allowed'
                                        : 'bg-red-500 hover:bg-green-700'
                                } text-white`}
                                disabled={pet.Status === 'Approved'}
                            >
                                {pet.Status === 'Approved' ? 'Approved' : 'Approve'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-700'>No pet records available.</p>
            )}
        </div>
    );
};


