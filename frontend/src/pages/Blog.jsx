import React from 'react';
import Image1 from '../assets/Image18.jpg';
import Image2 from '../assets/Image19.jpg';
import Image3 from '../assets/Image20.jpg';
import Image4 from '../assets/Image21.jpg';
import Image5 from '../assets/Image22.jpg';

const blogData = [
	{
		image: Image1,
		name: 'Dogs',
		heading: '14 Foods You Can Share with Your Dog',
		date: 'January 10,2024',
		description: `<section style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; padding: 20px;">
  <h2 style="color: #2C3E50;">🐶 14 Dog-Friendly Foods You Can Share with Your Canine Companion 🦴</h2>
  
  <p>As pet lovers, we all want to treat our furry friends while keeping them safe and healthy. While some human foods can be harmful to dogs, many are not only safe but also nutritious. Here are <b>14 dog-friendly foods</b> that you can share with your canine companion:</p>

  <ol style="margin-top: 20px;">
    <li>🍎 <b>Apples:</b> Apples are a great source of vitamins A and C, fiber, and antioxidants. Remove the seeds and core before giving them to your dog.<br><br></li>

    <li>🥕 <b>Carrots:</b> Low in calories and high in fiber, carrots are excellent for your dog's dental health and vision.<br><br></li>

    <li>🫐 <b>Blueberries:</b> Packed with antioxidants, vitamins, and fiber, blueberries can help improve your dog's brain function and immune system.<br><br></li>

    <li>🥜 <b>Peanut Butter (Unsalted, Xylitol-Free):</b> A favorite treat for many dogs, peanut butter provides protein and healthy fats. Ensure it does not contain xylitol, which is toxic to dogs.<br><br></li>

    <li>🎃 <b>Pumpkin:</b> Plain, cooked pumpkin is rich in fiber and aids in digestion. Avoid pumpkin pie filling, as it often contains added sugars and spices.<br><br></li>

    <li>🍠 <b>Sweet Potatoes:</b> Cooked, plain sweet potatoes are loaded with fiber, vitamins, and minerals, making them a nutritious snack for dogs.<br><br></li>

    <li>🍗 <b>Chicken (Plain, Cooked):</b> A lean source of protein, plain-cooked chicken is easy on the stomach. Avoid giving your dog seasoned or fried chicken.<br><br></li>

    <li>🐟 <b>Salmon (Cooked):</b> Cooked salmon provides omega-3 fatty acids that promote healthy skin, a shiny coat, and a robust immune system.<br><br></li>

    <li>🥚 <b>Eggs (Cooked):</b> Scrambled or boiled eggs are rich in protein and essential amino acids. Always cook the eggs to avoid the risk of salmonella.<br><br></li>

    <li>🟢 <b>Green Beans:</b> Plain green beans are low in calories and full of fiber, vitamins, and minerals. They make a perfect low-calorie snack.<br><br></li>

    <li>🥒 <b>Cucumbers:</b> Hydrating and low in calories, cucumbers are an ideal crunchy treat for overweight dogs.<br><br></li>

    <li>🍌 <b>Bananas:</b> In moderation, bananas provide potassium, vitamins, and fiber. Be cautious with portion sizes due to their high sugar content.<br><br></li>

    <li>🍉 <b>Watermelon (Seedless):</b> A refreshing treat on hot days, watermelon is hydrating and packed with vitamins A, B6, and C. Always remove the seeds and rind.<br><br></li>

    <li>🍚 <b>Rice (Plain, Cooked):</b> Plain, cooked rice is gentle on your dog's stomach and can help with digestive issues. Avoid adding spices or seasoning.<br><br></li>
  </ol>

  <h3 style="color: #E74C3C;">🚫 Foods to Avoid</h3>
  <p>While these 14 foods are safe, be aware of common human foods that are toxic to dogs, including:</p>
  <ul style="margin-bottom: 20px;">
    <li>🍫 Chocolate</li>
    <li>🍇 Grapes & Raisins</li>
    <li>🧄 Onions & Garlic</li>
    <li>❌ Anything with Xylitol</li>
  </ul>

  <h3 style="color: #27AE60;">💡 Final Thoughts</h3>
  <p>Sharing human food with your dog can be a healthy and enjoyable experience if done responsibly. Always introduce new foods gradually and consult your veterinarian if you're unsure about a specific food. 🐾</p>
</section>

`},
	{
		image: Image2,
		name: 'Cats',
		heading: '14 Foods You Can Share with Your Cat',
		date: 'January 10,2024',
		description:
`<section>
    <h2>🐾 Cat-Friendly Human Foods You Can Share with Your Kitty 🐾</h2>
    <p>As cat lovers, we all want to treat our feline friends while keeping them safe and healthy. While some human foods can be harmful to cats, many are not only safe but also nutritious. Here are <b>14 cat-friendly foods</b> that you can safely share with your kitty:</p>
    
    <ol>
        <li>
            <b>🐔 Cooked Chicken:</b> Plain, cooked chicken is a lean protein source that supports muscle health. <br> Avoid seasoning and bones. <br><br>
        </li>

        <li>
            <b>🐟 Salmon (Cooked):</b> Rich in omega-3 fatty acids, cooked salmon promotes a healthy coat and skin. <br> Avoid raw salmon and added spices. <br><br>
        </li>

        <li>
            <b>🥚 Eggs (Cooked):</b> Scrambled or boiled eggs provide essential proteins and amino acids. <br> Always serve cooked to prevent salmonella risk. <br><br>
        </li>

        <li>
            <b>🎃 Pumpkin (Plain, Cooked):</b> A great source of fiber, plain pumpkin aids digestion and helps with hairballs. <br><br>
        </li>

        <li>
            <b>🥕 Carrots (Cooked):</b> Steamed or boiled carrots offer vitamins and fiber, but should be served in small amounts. <br><br>
        </li>

        <li>
            <b>🫐 Blueberries:</b> Packed with antioxidants, a few fresh blueberries can be a healthy treat for your cat. <br><br>
        </li>

        <li>
            <b>🌱 Green Beans (Cooked):</b> Plain, cooked green beans are a low-calorie treat that provides fiber and vitamins. <br><br>
        </li>

        <li>
            <b>🍏 Apples (Without Seeds):</b> Small apple slices without seeds are safe for cats and contain vitamins A and C. <br><br>
        </li>

        <li>
            <b>🥒 Cucumber:</b> Thin cucumber slices can be a refreshing, hydrating treat that many cats enjoy. <br><br>
        </li>

        <li>
            <b>🍚 Plain Rice:</b> Plain, cooked rice is gentle on the stomach and can help with digestive issues. <br><br>
        </li>

        <li>
            <b>🧀 Cheese (In Moderation):</b> A small amount of plain cheese is safe for most cats who are not lactose intolerant. <br><br>
        </li>

        <li>
            <b>🌿 Spinach (In Small Amounts):</b> Rich in vitamins, spinach is safe for cats in small portions unless they have urinary issues. <br><br>
        </li>

        <li>
            <b>🍌 Bananas:</b> In moderation, bananas provide potassium and fiber. <br> Avoid overfeeding due to sugar content. <br><br>
        </li>

        <li>
            <b>🍉 Melon (Without Seeds):</b> Seedless melon can be a hydrating treat in small quantities on warm days. <br><br>
        </li>
    </ol>

    <h3><b>🚫 Foods to Avoid</b></h3>
    <p>While these 14 foods are safe, you should <b>avoid feeding your cat</b> the following:</p>
    <ul>
        <li>❌ Chocolate</li>
        <li>❌ Onions & Garlic</li>
        <li>❌ Grapes & Raisins</li>
        <li>❌ Dairy (if lactose intolerant)</li>
        <li>❌ Artificial sweeteners (like Xylitol)</li>
    </ul>

    <h3>📌 Final Thoughts</h3>
    <p>Sharing human food with your cat can be a healthy and enjoyable experience if done responsibly. Always introduce new foods gradually and consult your veterinarian if you're unsure about a specific food.</p>
</section>
`},
	{
		image: Image3,
		name: 'Cats',
		heading: 'Dental Care for Small Pets: Keeping Rabbits and Guinea Pigs Healthy',
		date: 'January 10,2024',
		description:
`<section>
    <h2>🐾 Essential Dental Care for Small Pets: Rabbits & Guinea Pigs 🐾</h2>
    <p>Small pets like <b>rabbits</b> and <b>guinea pigs</b> have unique dental needs. Their teeth grow continuously, making proper dental care crucial to prevent overgrowth and other health issues. Here’s how to maintain their oral health effectively.</p>

    <h3>📌 1. Why Dental Care is Important for Small Pets</h3>
    <ul>
        <li><b>Prevents Overgrown Teeth:</b> Avoids pain and difficulty eating. <br></li>
        <li><b>Reduces Risk of Infections:</b> Minimizes oral infections and abscesses. <br></li>
        <li><b>Supports Overall Health:</b> Ensures proper digestion and well-being. <br><br></li>
    </ul>

    <h3>🦷 2. Common Dental Problems in Rabbits and Guinea Pigs</h3>
    <ul>
        <li><b>Overgrown Teeth:</b> Can lead to pain, drooling, and eating difficulties. <br></li>
        <li><b>Malocclusion:</b> Misalignment of teeth causes uneven wear and severe discomfort. <br></li>
        <li><b>Mouth Sores:</b> Sharp, overgrown teeth can irritate soft tissues, causing painful sores. <br><br></li>
    </ul>

    <h3>🔍 3. Signs of Dental Issues</h3>
    <ul>
        <li><b>Difficulty Eating:</b> Struggling to chew or dropping food. <br></li>
        <li><b>Excessive Drooling:</b> Also known as "slobbers," it indicates pain. <br></li>
        <li><b>Weight Loss:</b> Reduced appetite and difficulty maintaining weight. <br></li>
        <li><b>Swelling:</b> Watch for lumps or swelling around the jaw. <br><br></li>
    </ul>

    <h3>🏡 4. Maintaining Dental Health at Home</h3>
    <ul>
        <li><b>Provide a High-Fiber Diet:</b> Offer unlimited hay (such as timothy hay) to promote natural tooth wear. <br></li>
        <li><b>Chew Toys:</b> Safe wooden toys, apple branches, and cardboard help trim teeth. <br></li>
        <li><b>Monitor Eating Habits:</b> Watch for signs of pain or difficulty chewing. <br><br></li>
    </ul>

    <h3>👩‍⚕️ 5. When to See a Veterinarian</h3>
    <ul>
        <li><b>Regular Check-Ups:</b> Schedule dental exams every 6-12 months. <br></li>
        <li><b>Signs of Pain:</b> Seek veterinary care if your pet shows discomfort or weight loss. <br></li>
        <li><b>Overgrown Teeth:</b> Only a professional should trim overgrown teeth—never attempt it at home. <br><br></li>
    </ul>

    <h3>✅ 6. Preventative Care Tips</h3>
    <ul>
        <li><b>Balanced Diet:</b> Provide fresh vegetables and unlimited hay. <br></li>
        <li><b>Chew Materials:</b> Ensure access to safe and suitable chewing materials. <br></li>
        <li><b>Daily Observation:</b> Monitor your pet’s behavior for early signs of dental issues. <br><br></li>
    </ul>

    <h3>💡 Final Thoughts</h3>
    <p>Dental care is vital for the health and happiness of rabbits and guinea pigs. With proper nutrition, regular monitoring, and professional check-ups, you can prevent dental issues and ensure your small pet thrives. 🐰🐹</p>
</section>

`	},
	{
		image: Image4,
		name: 'Cats',
		heading: 'Common Signs Your Pet Might Be Sick (And When to See a Vet)',
		date: 'January 10,2024',
		description:
`
<section style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; padding: 20px;">
  <h2 style="color: #2C3E50;">🐾 Signs Your Pet Might Be Sick – When to Consult a Vet 🩺</h2>
  
  <p>Pets can’t tell us when they feel unwell, so it’s crucial to recognize the signs of illness early. Identifying these symptoms can help you seek timely veterinary care and ensure your pet’s health and happiness. Here are common signs your pet might be sick and when to consult a vet:</p>

  <h3>🥣 1. Changes in Appetite or Thirst</h3>
  <p><b>Signs to Watch For:</b> Sudden loss of appetite, increased thirst, or refusal to eat.</p>
  <p><b>When to See a Vet:</b> If changes persist for more than 24 hours or are accompanied by other symptoms.</p>

  <h3>⚖️ 2. Unexplained Weight Loss or Gain</h3>
  <p><b>Signs to Watch For:</b> Rapid weight loss or gain without a change in diet or activity level.</p>
  <p><b>When to See a Vet:</b> Sudden weight fluctuations can indicate underlying health problems and should be evaluated.</p>

  <h3>😴 3. Lethargy or Decreased Activity</h3>
  <p><b>Signs to Watch For:</b> Unusual tiredness, lack of interest in play, or excessive sleeping.</p>
  <p><b>When to See a Vet:</b> If your pet is unusually inactive for more than a day, it may be a sign of illness or injury.</p>

  <h3>🤢 4. Vomiting or Diarrhea</h3>
  <p><b>Signs to Watch For:</b> Frequent vomiting, loose stools, or signs of discomfort.</p>
  <p><b>When to See a Vet:</b> If vomiting or diarrhea lasts more than 24 hours, contains blood, or is paired with lethargy.</p>

  <h3>🌬️ 5. Respiratory Issues</h3>
  <p><b>Signs to Watch For:</b> Coughing, wheezing, or difficulty breathing.</p>
  <p><b>When to See a Vet:</b> Breathing problems are always a medical emergency – seek veterinary care immediately.</p>

  <h3>⚠️ 6. Changes in Behavior</h3>
  <p><b>Signs to Watch For:</b> Aggression, hiding, or unusual anxiety.</p>
  <p><b>When to See a Vet:</b> Behavioral changes may indicate pain or neurological issues and require professional assessment.</p>

  <h3>🐕 7. Skin and Coat Problems</h3>
  <p><b>Signs to Watch For:</b> Hair loss, excessive scratching, redness, or lumps.</p>
  <p><b>When to See a Vet:</b> Persistent skin issues may be caused by allergies, parasites, or infections.</p>

  <h3>🚽 8. Bathroom Habit Changes</h3>
  <p><b>Signs to Watch For:</b> Difficulty urinating, blood in urine, or accidents in the house.</p>
  <p><b>When to See a Vet:</b> Changes in urination or bowel movements can signal infections or more serious conditions.</p>

  <h3 style="color: #27AE60;">💡 Final Thoughts</h3>
  <p>Always trust your instincts—if your pet seems "off," consult your veterinarian. Early intervention can make a significant difference in treatment outcomes. 🐾</p>
</section>

`},
	{
		image: Image5,
		name: 'Cats',
		heading: 'The Ultimate Guide to Pet Dental Care',
		date: 'January 10,2024',
		description:
`
<section style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; padding: 20px;">
  <h2 style="color: #2C3E50;">🦷 Keep Your Pet's Teeth Clean & Healthy 🐾</h2>
  
  <p>Oral health is a crucial part of your pet's overall well-being. Poor dental hygiene can lead to severe health issues like infections and organ damage. Here’s a comprehensive guide to keeping your pet’s teeth clean and healthy.</p>

  <h3>❓ 1. Why Dental Care Matters</h3>
  <ul>
    <li>🛑 <b>Prevents:</b> Bad breath and tooth decay</li>
    <li>🦠 <b>Reduces:</b> The risk of gum disease</li>
    <li>❤️ <b>Protects:</b> Heart, kidney, and liver health by reducing harmful oral bacteria</li>
  </ul>

  <h3>⚠️ 2. Common Dental Problems in Pets</h3>
  <p>Poor dental hygiene can lead to serious health issues. Watch out for these common problems:</p>
  <ul>
    <li>🟡 <b>Plaque and Tartar Buildup:</b> Hard deposits that can lead to gum disease.</li>
    <li>🟥 <b>Gingivitis:</b> Red, swollen gums caused by plaque buildup.</li>
    <li>🦷 <b>Tooth Decay and Loss:</b> Advanced gum disease can cause teeth to loosen or fall out.</li>
  </ul>

  <h3>🔍 3. Signs of Dental Issues</h3>
  <p>If you notice any of these signs, it may be time to consult your veterinarian:</p>
  <ul>
    <li>👃 Bad breath (persistent odor)</li>
    <li>💧 Excessive drooling or pawing at the mouth</li>
    <li>🍴 Difficulty eating or loss of appetite</li>
    <li>🩸 Bleeding or inflamed gums</li>
  </ul>

  <h3>🏠 4. At-Home Dental Care Routine</h3>
  <p>Regular dental care at home can prevent many oral health problems:</p>
  <ul>
    <li>🪥 <b>Brushing Teeth:</b> Use pet-safe toothpaste and a soft brush. Aim to brush 2-3 times per week.</li>
    <li>🦴 <b>Dental Chews:</b> Provide vet-approved dental chews to reduce plaque and freshen breath.</li>
    <li>💧 <b>Water Additives:</b> Add dental solutions to your pet’s water bowl to fight bacteria.</li>
  </ul>

  <h3>🏥 5. Professional Dental Cleanings</h3>
  <p>Routine professional cleanings are essential to maintain oral health:</p>
  <ul>
    <li>📅 Schedule regular veterinary cleanings to remove stubborn tartar.</li>
    <li>🔍 Most pets need professional cleanings annually, but your vet will guide you based on your pet’s needs.</li>
  </ul>

  <h3>🛡️ 6. Preventative Measures</h3>
  <p>Take these extra steps to prevent dental problems:</p>
  <ul>
    <li>👩‍⚕️ Regular check-ups with your veterinarian</li>
    <li>🧸 Provide dental toys that encourage safe chewing</li>
    <li>🥦 Feed a balanced diet that supports oral health</li>
  </ul>

  <h3 style="color: #27AE60;">💡 Final Thoughts</h3>
  <p>Good dental hygiene is essential for your pet's overall health. With regular care and veterinary visits, you can prevent most dental problems and keep your pet smiling happily! 🐶🐾</p>
</section>

`	},
];

const Blog = () => {
	return (
		<div className='max-w-7xl mx-auto p-6'>
			<h1
				className='text-[#F24C4C] text-5xl font-semibold text-center pt-12 sm:text-left'
				style={{ fontFamily: 'Playfair Display, serif' }}>
				OUR <span className='text-black'>BLOG</span>
			</h1>
			<div className='mt-12'>
				{blogData.map((blog, index) => (
					<div
						key={index}
						className='bg-white rounded-lg overflow-hidden mb-12'>
						<img
							data-aos='fade-right'
							src={blog.image}
							alt={blog.name}
							className='w-[70%] h-auto'
						/>
						<div
							className='p-6'
							data-aos='fade-up'>
							<h2 className='text-xl py-6 font-bold text-[#F24C4C]'>
								{blog.name}
							</h2>
							<h1
								className='text-3xl pb-6 font-semibold'
								style={{ fontFamily: 'Playfair Display, serif' }}>
								{blog.heading}
							</h1>
							<h1 className='text-gray-700 pb-6 font-semibold'>{blog.date}</h1>
							    <div className='mt-2 text-gray-600' dangerouslySetInnerHTML={{ __html: blog.description }} />

							{/* <p className='mt-2 text-gray-600'>{blog.description}</p> */}
							
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Blog;
