import React from 'react';
import Hero from '../components/Hero';
import { LatestCollection } from '../components/LatestCollection';
import { Blog } from '../components/Blog';
import {Adoption} from '../components/Adoption';
import { LatestCollectionAccessories } from '../components/LatestCollectionAccessories';
import { LatestCollectionMedicine } from '../components/LatestCollectionMedicine';
import { Subscription } from '../components/Subscription';

const Home = () => {
	return (
		<>
<Hero></Hero>
			<LatestCollection></LatestCollection>
			<LatestCollectionAccessories></LatestCollectionAccessories>
			<LatestCollectionMedicine></LatestCollectionMedicine>
			<Blog></Blog>
			<Adoption></Adoption>
			<Subscription />
		</>
	);
};

export default Home;