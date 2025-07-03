import React from 'react';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link, NavLink , useNavigate, useLocation } from 'react-router-dom';

const ForgotPassword2 = () => {
    const navigate = useNavigate();

    // Ensure the hook is called in a valid router context

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get('email') ;

    console.log('Email received from URL:', email);

    const openMailBox = async () => {
        navigate('/forgot2?email=' + email);
        window.open('https://www.gmail.com', '_blank', 'noopener, noreferrer');
    };

    return (
        <div className="flex flex-col items-center justify-center my-28">
            <div className="flex justify-center items-center mb-8">
                <MdMarkEmailRead className="w-24 h-24" />
            </div>

            <div className="w-full max-w-xl text-center">
                <h1 className="text-5xl font-bold mb-4">Check your email!</h1>
                <h2 className="text-sm text-gray-400 mb-16">
                    Thanks! An email was sent that will <br />
                    ask you to click on a link to verify your account.
                </h2>

                <button
                    onClick={openMailBox}
                    className="w-full bg-[#F24C4C] text-white py-4 rounded-full hover:bg-[#d43b3b] focus:outline-none"
                >
                    Open Email Inbox And Continue
                </button>
            </div>

            {/* <div className="flex items-center mt-12"> */}
                {/* <FaArrowLeft className="text-[#F24C4C] w-6 h-6 mr-2" /> */}
                {/* <Link
                    to="/forgot1"
                    className="text-[#F24C4C] text-lg font-medium hover:underline"
                >
                    Back to Page
                </Link> */}
            {/* </div> */}


            
        </div>
    );
};

export default ForgotPassword2;
