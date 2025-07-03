import React, { useState } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa';
import { IoGiftOutline } from 'react-icons/io5';
import { GoTrophy } from 'react-icons/go';
import Image1 from '../assets/FB_IMG_1744039892226.jpg';
import Image2 from '../assets/img101.jpg';

import Image3 from '../assets/img103.jpg';
import Image4 from '../assets/img104.jpg';
const data = [
	{
		image: FaRegHeart,
		name: 'OUR EMPLOYEES CARE',
		description:
			'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to identify on the runway heading towards.',
	},
	{
		image: IoGiftOutline,
		name: 'GIFT YOUR PET',
		description:
			'Bring value to your pet’s experience with our customized gift options, ensuring they feel at home.',
	},
	{
		image: GoTrophy,
		name: 'AWARDS AND RECOGNITIONS',
		description:
			'We have received numerous awards for our excellence in pet care and attention to detail in health and wellness.',
	},
];

const staafData = [
	{
		image: Image1,
		name: 'Ubaid Ur Rehman',
		rank: 'Frontend Developer',
	},
	{
		image: Image3,
		name: 'Alishba Shabbir',
		rank: 'Backend Developer',
	},
	{
		image: Image2,
		name: 'Noman Nawaz',
		rank: 'Backend Developer',
	},
	{
		image: Image4,
		name: 'Abu Baker',
		rank: 'Frontend Developer',
	},
];

const About = () => {
	const [openSection, setOpenSection] = useState(null);

	const toggleSection = (section) => {
		setOpenSection(openSection === section ? null : section);
	};

	return (
		<div className='container max-w-screen-xl mx-auto p-4'>
			<h1
				data-aos='fade-down'
				className='text-[#F24C4C] text-5xl font-semibold text-center pt-12 sm:text-left'
				style={{ fontFamily: 'Playfair Display, serif' }}>
				ABOUT <span className='text-black'>US</span>
			</h1>
			<h1 className='font-semibold mt-24'>WHAT WE STAND FOR</h1>
			<h1
				data-aos='fade-right'
				className='text-[#F24C4C] w-[90%] md:w-[45%] text-5xl font-semibold  py-8 sm:text-left'
				style={{ fontFamily: 'Playfair Display, serif' }}>
				We are invested in making{' '}
				<span className='text-black pt-2'>an incredible place</span>
			</h1>

			<div className='flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 mt-10'>
				<div className='md:w-1/2'>
					<p data-aos='fade-right'>
						Our staff spends time interacting with and monitoring the pets to
						ensure their safety and happiness while they are with us. Capitalize
						on low hanging fruit to identify a ballpark value added activity to
						beta test. Override the digital divide with additional clickthroughs
						from DevOps.
					</p>
					<p data-aos='fade-right'>
						{' '}
						Nanotechnology immersion along the information highway will close
						the loop on focusing solely on the bottom line. Collaboratively
						administrate empowered markets via plug-and-play networks.
						Dynamically procrastinate B2C users after installed base benefits
						dramatically visualize.
					</p>
				</div>

				<div
					className='md:w-1/2'
					data-aos='fade-left'>
					<div className='border-b py-4'>
						<div
							className='flex justify-between items-center cursor-pointer'
							onClick={() => toggleSection('section1')}>
							<h2 className='font-bold'>WELL-TRAINED STAFF</h2>
							{openSection === 'section1' ? <IoMdRemove /> : <IoMdAdd />}
						</div>
						{openSection === 'section1' && (
							<div className='mt-2'>
								<p>
									Our staff spends time interacting with and monitoring the pets
									to ensure their safety and happiness while they are with us.
								</p>
							</div>
						)}
					</div>

					<div className='border-b py-4'>
						<div
							className='flex justify-between items-center cursor-pointer'
							onClick={() => toggleSection('section2')}>
							<h2 className='font-bold'>METICULOUS ABOUT MEDS</h2>
							{openSection === 'section2' ? <IoMdRemove /> : <IoMdAdd />}
						</div>

						{openSection === 'section2' && (
							<div className='mt-2'>
								<p>
									We are very careful when it comes to administering medication
									and keeping up with pets' medical needs.
								</p>
							</div>
						)}
					</div>

					<div className='border-b py-4'>
						<div
							className='flex justify-between items-center cursor-pointer'
							onClick={() => toggleSection('section3')}>
							<h2 className='font-bold'>WHAT TO BRING</h2>
							{openSection === 'section3' ? <IoMdRemove /> : <IoMdAdd />}
						</div>
						{openSection === 'section3' && (
							<div className='mt-2'>
								<p>
									Please bring your pet's favorite toys, bedding, and food to
									help them feel more at home.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
				{data.map((item, index) => {
					const IconComponent = item.image;
					return (
						<div
							data-aos='flip-up'
							key={index}
							className='flex flex-col items-start px-4 py-4 shadow-lg bg-white rounded-lg'>
							<IconComponent className='text-4xl mb-4' />
							<h2 className='font-semibold text-lg'>{item.name}</h2>
							<p className='text-sm mt-2'>{item.description}</p>
						</div>
					);
				})}
			</div>

			<div className='flex flex-col justify-center items-center mt-14'>
				<h1
					data-aos='fade-up'
					className='text-[#F24C4C] text-5xl font-semibold text-centerpt-4'
					style={{ fontFamily: 'Playfair Display, serif' }}>
					We are invested in making
				</h1>
				<h1
					data-aos='fade-up'
					className='text-5xl font-semibold text-center  pt-4'
					style={{ fontFamily: 'Playfair Display, serif' }}>
					an incredible place
				</h1>
				<p
					data-aos='fade-up'
					className='mt-6 text-center'>
					We offer long-term and short-term boarding. <br /> Every dog has its
					own private, spacious room and daily individual time.
				</p>
			</div>

			<div className='flex flex-row justify-evenly flex-wrap gap-8 mt-16'>
				{staafData.map((item, index) => (
					<div
						data-aos='fade-right'
						data-aos-offset='300'
						data-aos-easing='ease-in-sine'
						key={index}
						className='flex flex-col items-center'>
						<img
							src={item.image}
							alt={item.name} // Descriptive alt text for accessibility
							className='w-32 h-32 rounded-full object-cover'
						/>
						<p className='font-semibold mt-2'>{item.name}</p>
						<p className='text-gray-500'>{item.rank}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default About;
