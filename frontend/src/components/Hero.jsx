import { NavLink } from 'react-router-dom';
import Image3 from '../assets/Image1.jpg';
import Image1 from '../assets/Image2.jpg';
import Image2 from '../assets/Image4.jpg';
import Image4 from '../assets/Image15.jpg';

const Hero = () => {
	return (
		<>
			<div
				className='relative h-screen  flex items-center justify-start'
				style={{
					backgroundImage: `url(${Image3})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}>
				<div className='absolute inset-0 bg-black bg-opacity-50'></div>

				<div className='relative z-10 text-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24'>
					<h1
						className='text-4xl pb-5 sm:text-8xl  md:text-6xl md:w-[370px] md:text-left lg:text-7xl lg:w-[400px] lg:text-left font-bold text-white mb-4 '
						data-aos='fade-right'
						style={{ fontFamily: 'Caveat, cursive' }}>
						Crafted with Goodness
					</h1>
					<p
						data-aos='fade-right'
						className='text-xl w-full sm:w-[450px] md:w-[500px] md:text-left lg:w-[600px] lg:text-left text-gray-200 my-6 mx-auto'>
						Very best, highest quality organic ingredients to produce our own
						range of 100% natural pet products
					</p>
				</div>
			</div>
			<div className='w-full  mt-[-80px] '>
				<div className='flex flex-col md:flex-row justify-center items-center gap-10 '>
					<div
						data-aos='zoom-in'
						className=' w-full md:w-[500px] sm:my-5 flex flex-col pl-10 pt-5 items-start justify-start bg-cover bg-center p-6 rounded-lg text-white shadow-2xl hover:shadow-2xl transition-shadow duration-300 relative'
						style={{ backgroundImage: `url(${Image1})`, minHeight: '300px' }}>
						<h5 className='font-semibold text-black'>WEEKLY PROMO</h5>
						<h1 className='text-3xl font-bold text-[#F24C4C] pt-4'>
							ACCESSORIES
						</h1>
						<h2 className='text-2xl mt-2 text-black pb-5 font-bold'>50% OFF</h2>
						<NavLink to='/collection1'>
							<button className='mt-4 px-4 py-2 bg-[#F24C4C] text-white rounded-full'>
								VIEW ALL
							</button>
						</NavLink>
					</div>

					<div
						data-aos='zoom-in'
						className=' w-full md:w-[500px] flex flex-col pl-10 pt-5 items-start justify-start bg-cover p-6 rounded-lg text-white shadow-2xl hover:shadow-2xl transition-shadow duration-300 relative'
						style={{
							backgroundImage: `url(${Image2})`,
							minHeight: '300px',
						}}>
						<h5 className='font-semibold text-black'>WEEKLY PROMO</h5>
						<h1 className='text-3xl font-bold text-[#F24C4C] pt-4'>
							Big Food Brands
						</h1>
						<h2 className='text-2xl mt-2 text-black pb-5 font-bold'>50% OFF</h2>
						<NavLink to='/collection'>
							<button className='mt-4 px-4 py-2 bg-[#F24C4C] text-white rounded-full'>
								VIEW ALL
							</button>
						</NavLink>
					</div>
				</div>

				<div
					data-aos='zoom-in-up'
					className=' mx-auto my-6 w-full md:w-[500px] flex flex-col pl-10 pt-5 items-start justify-start bg-cover p-6 rounded-lg text-white shadow-2xl hover:shadow-2xl transition-shadow duration-300 relative'
					style={{
						backgroundImage: `url(${Image4})`,
						minHeight: '300px',
					}}>
					<h5 className='font-semibold text-black'>WEEKLY PROMO</h5>
					<h1 className='text-3xl font-bold text-[#F24C4C] pt-4'>PHARMACY</h1>
					<h2 className='text-2xl mt-2 text-black pb-5 font-bold'>50% OFF</h2>
					<NavLink to='/collection2'>
						<button className='mt-4 px-4 py-2 bg-[#F24C4C] text-white rounded-full'>
							VIEW ALL
						</button>
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default Hero;
