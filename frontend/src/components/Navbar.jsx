import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import { CiShoppingCart } from 'react-icons/ci';
import { VscAccount } from 'react-icons/vsc';
import { IoMdSearch } from 'react-icons/io';
import { AiOutlineMenuFold, AiOutlineLogin } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import logo from '../assets/logo.png';
import { ShopContext } from '../context/ShopContext';

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { setShowSearch, getItemCount, navigate, isLoggedIn } =
		useContext(ShopContext);
	const location = useLocation();
	console.log('Logged in or not', isLoggedIn);

	const isCollectionPage =
		location.pathname === '/collection' ||
		location.pathname === '/collection1' ||
		location.pathname === '/collection2';

	return (
		<div className='flex items-center justify-between py-5 font-medium z-30 sticky top-0 bg-white shadow-lg'>
			<div
				onClick={() => navigate('/')}
				className='cursor-pointer'>
				<img
					src={logo}
					alt='Logo'
					className='w-[120px] h-auto ml-3'
				/>
			</div>

			<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
				<NavLink
					to='/'
					className={({ isActive }) =>
						isActive ? 'text-black font-semibold' : ''
					}>
					<p>Home</p>
				</NavLink>

				<div className='relative group'>
					<div className='flex flex-col items-center cursor-pointer gap-1'>
						<p>Collection</p>
					</div>
					<div className='hidden group-hover:block absolute left-0 pt-4'>
						<ul className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
							<NavLink
								to='/collection'
								className='cursor-pointer hover:text-black'>
								Food Products
							</NavLink>
							<NavLink
								to='/collection1'
								className='cursor-pointer hover:text-black'>
								Accessories
							</NavLink>
							<NavLink
								to='/collection2'
								className='cursor-pointer hover:text-black'>
								Medicine
							</NavLink>
						</ul>
					</div>
				</div>

				<div className='relative group'>
					<div className='flex flex-col items-center cursor-pointer gap-1'>
						<p>Adoption</p>
					</div>
					<div className='hidden group-hover:block absolute left-0 pt-4'>
						<ul className='flex flex-col gap-2 w-60 py-3 px-3 bg-slate-100 text-gray-500 rounded shadow-lg'>
							<NavLink
								to='/adoption'
								className='cursor-pointer hover:text-black'>
								Post For Adoption
							</NavLink>
							<NavLink
								to='/petlist'
								className='cursor-pointer hover:text-black'>
								Want To Adopt
							</NavLink>
						</ul>
					</div>
				</div>

				{/* <NavLink to='/adoption'> */}

				{/* </NavLink> */}
				<NavLink to='/blog'>
					<p>Blog</p>
				</NavLink>
				<NavLink to='/about'>
					<p>About us</p>
				</NavLink>
			</ul>

			<div className='flex items-center justify-center gap-3 pr-5'>
				{isCollectionPage && (
					<IoMdSearch
						onClick={() => setShowSearch(true)}
						className='cursor-pointer text-2xl'
					/>
				)}

				<div className='group relative'>
					<Link to={isLoggedIn ? '#' : '/login'}>
						{isLoggedIn ? (
							<VscAccount className='cursor-pointer text-2xl' />
						) : (
							<AiOutlineLogin className='cursor-pointer text-2xl' />
						)}
					</Link>
					{isLoggedIn && (
						<div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
							<div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
								<Link to='/myprofile'>
									<p className='cursor-pointer hover:text-black'>My Profile</p>
								</Link>

								<Link to='/order'>
									<p className='cursor-pointer hover:text-black'>Orders</p>
								</Link>
								<Link to='/manage'>
									<p className='cursor-pointer hover:text-black'>
										Subscriptions
									</p>
								</Link>
								<Link to={'/logout'}>
									<p className='cursor-pointer hover:text-black'>Logout</p>
								</Link>
							</div>
						</div>
					)}
				</div>
				<Link
					to='/cart'
					className='relative'>
					<CiShoppingCart className='cursor-pointer text-3xl' />
					<p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-700 text-white aspect-square rounded-full text-[8px]'>
						{getItemCount()}
					</p>
				</Link>
				<AiOutlineMenuFold
					onClick={() => setIsMenuOpen(true)}
					className='w-5 cursor-pointer sm:hidden'
				/>
			</div>

			<div
				className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 ${
					isMenuOpen ? 'w-full' : 'w-0 overflow-hidden'
				} z-20`}>
				<div className='flex flex-col text-gray-600'>
					<div
						onClick={() => setIsMenuOpen(false)}
						className='flex items-center gap-4 p-3 cursor-pointer'>
						<RiArrowDropDownLine className='h-4 rotate-90' />
						<p>Back</p>
					</div>
					<NavLink
						onClick={() => setIsMenuOpen(false)}
						className='py-2 pl-6 border'
						to='/'>
						Home
					</NavLink>
					<div className='pl-4 py-3 border rounded'>
						<p className='text-gray-600 font-medium mb-2'>Collection</p>
						<ul className='space-y-1'>
							<li>
								<NavLink
									onClick={() => setIsMenuOpen(false)}
									to='/collection'
									className='block p-2 rounded hover:bg-black hover:text-white transition-colors'>
									Food Products
								</NavLink>
							</li>
							<li>
								<NavLink
									onClick={() => setIsMenuOpen(false)}
									to='/collection1'
									className='block p-2 rounded hover:bg-black hover:text-white transition-colors'>
									Accessories
								</NavLink>
							</li>
							<li>
								<NavLink
									onClick={() => setIsMenuOpen(false)}
									to='/collection2'
									className='block p-2 rounded hover:bg-black hover:text-white transition-colors'>
									Medicine
								</NavLink>
							</li>
						</ul>
					</div>

					<div className='pl-4 py-2 border rounded'>
						<p className='text-gray-600 font-medium mb-2'>Adoption</p>
						<ul className='space-y-1'>
							<li>
								<NavLink
									onClick={() => setIsMenuOpen(false)}
									className='block py-2 pl-4 hover:bg-gray-100 rounded'
									to='/adoption'>
									Post For Adoption
								</NavLink>
							</li>
							<li>
								<NavLink
									onClick={() => setIsMenuOpen(false)}
									className='block py-2 pl-4 hover:bg-gray-100 rounded'
									to='/petlist'>
									Want To Adopt
								</NavLink>
							</li>
						</ul>
					</div>

					<NavLink
						onClick={() => setIsMenuOpen(false)}
						className='py-2 pl-6 border'
						to='/blog'>
						Blog
					</NavLink>
					<NavLink
						onClick={() => setIsMenuOpen(false)}
						className='py-2 pl-6 border'
						to='/about'>
						About us
					</NavLink>
				</div>
			</div>
		</div>
	);
};
