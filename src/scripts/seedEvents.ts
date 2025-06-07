// scripts/seedEvents.ts
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { authenticateAdmin, db } from './firebase-seed.ts';

// Sample event data (same as before)
const eventCategories = [
  'Technology',
  'Business',
  'Arts & Culture',
  'Sports & Fitness',
  'Food & Drink',
  'Music',
  'Education',
  'Health & Wellness',
  'Networking',
  'Workshop',
  'Conference',
  'Social',
];

const ukCities = [
  'London',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Liverpool',
  'Sheffield',
  'Bristol',
  'Edinburgh',
  'Glasgow',
  'Newcastle',
  'Nottingham',
  'Cardiff',
  'Leicester',
  'Coventry',
  'Bradford',
  'Belfast',
  'Brighton',
  'Hull',
  'Plymouth',
  'Stoke-on-Trent',
];

const sampleEvents = [
  // Technology Events
  {
    title: 'React & Next.js Workshop for Beginners',
    description:
      "Learn the fundamentals of React and Next.js in this hands-on workshop. Perfect for developers looking to expand their frontend skills. We'll cover components, state management, routing, and deployment. All skill levels welcome, laptops required.",
    location: 'TechHub London, 20 Ropemaker Street, London EC2Y 9AR',
    price: 45,
    eventUrl: 'https://techhub.com/react-workshop',
    imageUrl:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=940&h=470&fit=crop',
    category: 'Technology',
  },
  {
    title: 'AI & Machine Learning Conference 2025',
    description:
      'Join leading experts in AI and ML for a full-day conference featuring keynotes, panel discussions, and networking opportunities. Topics include deep learning, natural language processing, and ethical AI development.',
    location:
      'Manchester Central Convention Complex, Petersfield, Manchester M2 3GX',
    price: 120,
    eventUrl: 'https://aimlconf.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=940&h=470&fit=crop',
    category: 'Technology',
  },
  {
    title: 'Cybersecurity Bootcamp',
    description:
      'Intensive 2-day bootcamp covering cybersecurity fundamentals, threat detection, and incident response. Includes hands-on labs and real-world scenarios. Certificate provided upon completion.',
    location: 'Birmingham Science Park Aston, Holt Court, Birmingham B7 4EJ',
    price: 0,
    eventUrl: 'https://cybersec-bootcamp.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=940&h=470&fit=crop',
    category: 'Technology',
  },
  {
    title: 'Web3 & Blockchain Developer Meetup',
    description:
      "Monthly meetup for Web3 developers and blockchain enthusiasts. This month we're discussing DeFi protocols, smart contract security, and the latest developments in the Ethereum ecosystem.",
    location: 'Level39, One Canada Square, Canary Wharf, London E14 5AB',
    price: 0,
    eventUrl: 'https://web3meetup.london',
    imageUrl:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=940&h=470&fit=crop',
    category: 'Technology',
  },
  {
    title: 'UX/UI Design Thinking Workshop',
    description:
      'Learn design thinking methodologies and create user-centered designs. Workshop includes persona development, user journey mapping, and prototyping exercises. Suitable for designers and product managers.',
    location: 'Leeds Digital Festival Hub, 87-89 Baker Street, Leeds LS1 3BL',
    price: 35,
    eventUrl: 'https://uxworkshop.leeds',
    imageUrl:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=940&h=470&fit=crop',
    category: 'Technology',
  },

  // Business Events
  {
    title: 'Startup Pitch Night',
    description:
      'Early-stage startups pitch to investors and industry experts. Great networking opportunity for entrepreneurs, investors, and business professionals. Includes drinks reception and Q&A sessions.',
    location: 'The Shard, 32 London Bridge Street, London SE1 9SG',
    price: 25,
    eventUrl: 'https://startuppitch.london',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=940&h=470&fit=crop',
    category: 'Business',
  },
  {
    title: 'Digital Marketing Masterclass',
    description:
      'Comprehensive masterclass covering SEO, social media marketing, content strategy, and analytics. Led by industry experts with proven track records. Includes practical exercises and case studies.',
    location:
      'Manchester Business School, Booth Street West, Manchester M15 6PB',
    price: 85,
    eventUrl: 'https://digitalmarketing.mbs.ac.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=940&h=470&fit=crop',
    category: 'Business',
  },
  {
    title: 'Women in Leadership Summit',
    description:
      'Empowering women in business with keynote speakers, panel discussions, and networking sessions. Topics include career advancement, work-life balance, and breaking through glass ceilings.',
    location:
      'Edinburgh International Conference Centre, The Exchange, Edinburgh EH3 8EE',
    price: 65,
    eventUrl: 'https://womeninleadership.scot',
    imageUrl:
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=940&h=470&fit=crop',
    category: 'Business',
  },
  {
    title: 'E-commerce Growth Strategies',
    description:
      'Learn proven strategies to scale your online business. Topics include conversion optimization, customer acquisition, inventory management, and international expansion. Case studies included.',
    location: 'Bristol Technology Centre, Coldharbour Lane, Bristol BS16 1QD',
    price: 55,
    eventUrl: 'https://ecommercegrowth.bristol',
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=940&h=470&fit=crop',
    category: 'Business',
  },
  {
    title: 'Freelancer Business Workshop',
    description:
      'Essential skills for freelancers including client acquisition, pricing strategies, contract negotiation, and financial management. Perfect for new and experienced freelancers.',
    location:
      'Liverpool Central Library, William Brown Street, Liverpool L3 8EW',
    price: 0,
    eventUrl: 'https://freelancerworkshop.liverpool',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=940&h=470&fit=crop',
    category: 'Business',
  },

  // Arts & Culture Events
  {
    title: 'Contemporary Art Exhibition Opening',
    description:
      "Opening night for 'Visions of Tomorrow' - a contemporary art exhibition featuring works by emerging British artists. Includes artist talks, wine reception, and gallery tours.",
    location: 'Tate Modern, Bankside, London SE1 9TG',
    price: 15,
    eventUrl: 'https://tate.org.uk/visions-tomorrow',
    imageUrl:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=940&h=470&fit=crop',
    category: 'Arts & Culture',
  },
  {
    title: 'Shakespeare in the Park',
    description:
      'Outdoor performance of Hamlet in beautiful park setting. Professional actors, authentic costumes, and atmospheric lighting. Bring blankets and picnics. Rain or shine performance.',
    location: 'Roundhay Park, Leeds LS8 1DJ',
    price: 20,
    eventUrl: 'https://shakespeareleeds.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=940&h=470&fit=crop',
    category: 'Arts & Culture',
  },
  {
    title: 'Photography Walking Tour',
    description:
      'Guided photography tour through historic city centre. Learn composition techniques, lighting tips, and post-processing basics. All camera types welcome, from smartphones to DSLRs.',
    location: 'Meeting Point: Bath Abbey, Abbey Churchyard, Bath BA1 1LT',
    price: 30,
    eventUrl: 'https://photowalk.bath',
    imageUrl:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=940&h=470&fit=crop',
    category: 'Arts & Culture',
  },
  {
    title: 'Pottery Making Workshop',
    description:
      'Hands-on pottery workshop for beginners. Learn wheel throwing, glazing techniques, and create your own ceramic pieces to take home. All materials and firing included.',
    location: 'Glasgow School of Art, 167 Renfrew Street, Glasgow G3 6RQ',
    price: 45,
    eventUrl: 'https://pottery.gsa.ac.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=940&h=470&fit=crop',
    category: 'Arts & Culture',
  },
  {
    title: 'Street Art & Graffiti Tour',
    description:
      'Explore the vibrant street art scene with local artists as guides. Learn about different techniques, famous artists, and the cultural significance of street art in urban environments.',
    location: 'Shoreditch High Street Station, London E1 6AN',
    price: 0,
    eventUrl: 'https://streetarttour.london',
    imageUrl:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=940&h=470&fit=crop',
    category: 'Arts & Culture',
  },

  // Sports & Fitness Events
  {
    title: 'Parkrun 5K Fun Run',
    description:
      'Weekly free 5K run in beautiful park setting. All abilities welcome, from beginners to experienced runners. Timed event with official results. Post-run coffee and socializing.',
    location: 'Hyde Park, London W2 2UH',
    price: 0,
    eventUrl: 'https://parkrun.org.uk/hydepark',
    imageUrl:
      'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=940&h=470&fit=crop',
    category: 'Sports & Fitness',
  },
  {
    title: 'Yoga in the Park',
    description:
      'Outdoor yoga session suitable for all levels. Bring your own mat and water bottle. Experienced instructor will guide through gentle flows and meditation. Weather permitting.',
    location: 'Kelvingrove Park, Glasgow G3 7TA',
    price: 12,
    eventUrl: 'https://yogaglasgow.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1506629905607-45e5e2f1b5d5?w=940&h=470&fit=crop',
    category: 'Sports & Fitness',
  },
  {
    title: 'Rock Climbing Beginner Course',
    description:
      'Learn indoor rock climbing fundamentals including safety procedures, basic techniques, and equipment usage. All equipment provided. Small group sizes for personalized instruction.',
    location: 'The Climbing Academy, Elephant & Castle, London SE1 6TE',
    price: 40,
    eventUrl: 'https://climbingacademy.com/beginners',
    imageUrl:
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=940&h=470&fit=crop',
    category: 'Sports & Fitness',
  },
  {
    title: 'Cycling Club Weekend Ride',
    description:
      'Scenic 30-mile group ride through countryside. Moderate pace suitable for regular cyclists. Coffee stop included. Helmets mandatory, road bikes recommended.',
    location:
      'Meeting Point: Cambridge Railway Station, Station Road, Cambridge CB1 2JW',
    price: 0,
    eventUrl: 'https://cambridgecycling.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=940&h=470&fit=crop',
    category: 'Sports & Fitness',
  },
  {
    title: 'Swimming Technique Masterclass',
    description:
      'Improve your swimming technique with professional coaching. Focus on freestyle and backstroke. Video analysis included. Suitable for intermediate to advanced swimmers.',
    location: 'Manchester Aquatics Centre, Oxford Road, Manchester M13 9SS',
    price: 25,
    eventUrl: 'https://swimmanchester.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=940&h=470&fit=crop',
    category: 'Sports & Fitness',
  },

  // Food & Drink Events
  {
    title: 'Wine Tasting Evening',
    description:
      'Guided tasting of premium wines from around the world. Learn about wine regions, tasting techniques, and food pairings. Includes cheese and charcuterie selection.',
    location: 'Harrods Wine Shop, 87-135 Brompton Road, London SW1X 7XL',
    price: 55,
    eventUrl: 'https://harrods.com/wine-tasting',
    imageUrl:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=940&h=470&fit=crop',
    category: 'Food & Drink',
  },
  {
    title: 'Craft Beer Festival',
    description:
      'Sample over 50 craft beers from local and international breweries. Food trucks, live music, and brewery talks. Perfect for beer enthusiasts and casual drinkers alike.',
    location: 'Victoria Park, Birmingham B12 9QN',
    price: 18,
    eventUrl: 'https://craftbeerbirmingham.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1558642891-54be180ea339?w=940&h=470&fit=crop',
    category: 'Food & Drink',
  },
  {
    title: 'Cooking Class: Italian Cuisine',
    description:
      'Learn to make authentic Italian dishes including fresh pasta, risotto, and tiramisu. Professional chef instruction, all ingredients provided. Take home recipe cards.',
    location: 'Cookery School, Borough Market, London SE1 1TL',
    price: 75,
    eventUrl: 'https://cookingclass.borough',
    imageUrl:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=940&h=470&fit=crop',
    category: 'Food & Drink',
  },
  {
    title: 'Whisky Appreciation Society',
    description:
      'Monthly meeting for whisky enthusiasts. This month featuring Scottish single malts. Expert-led tasting, history lessons, and social networking. Light snacks provided.',
    location: 'The Scotch Whisky Experience, 354 Castlehill, Edinburgh EH1 2NE',
    price: 35,
    eventUrl: 'https://whiskyedinburgh.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=940&h=470&fit=crop',
    category: 'Food & Drink',
  },
  {
    title: 'Vegan Food Market',
    description:
      'Monthly market featuring local vegan food vendors, organic produce, and eco-friendly products. Live music, cooking demonstrations, and family-friendly activities.',
    location: 'Millennium Square, Leeds LS2 3AD',
    price: 0,
    eventUrl: 'https://veganmarket.leeds',
    imageUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=940&h=470&fit=crop',
    category: 'Food & Drink',
  },

  // Music Events
  {
    title: 'Jazz Night at the Blue Note',
    description:
      'Evening of smooth jazz featuring local musicians and special guest performers. Intimate venue with full bar and light dining menu. Reservations recommended.',
    location: "Ronnie Scott's Jazz Club, 47 Frith Street, London W1D 4HT",
    price: 28,
    eventUrl: 'https://ronniescotts.co.uk',
    imageUrl:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=940&h=470&fit=crop',
    category: 'Music',
  },
  {
    title: 'Open Mic Night',
    description:
      'Weekly open mic for singers, musicians, poets, and comedians. Supportive environment for new performers. Sign-up starts at 7pm, performances begin at 8pm.',
    location: 'The Cavern Club, 10 Mathew Street, Liverpool L2 6RE',
    price: 0,
    eventUrl: 'https://cavernclub.org/openmic',
    imageUrl:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=940&h=470&fit=crop',
    category: 'Music',
  },
  {
    title: "Classical Concert: Beethoven's 9th",
    description:
      "Full orchestra performance of Beethoven's 9th Symphony with professional choir. One of the greatest works in classical music performed in stunning venue.",
    location: 'Royal Albert Hall, Kensington Gore, London SW7 2AP',
    price: 45,
    eventUrl: 'https://royalalberthall.com',
    imageUrl:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=940&h=470&fit=crop',
    category: 'Music',
  },
  {
    title: 'Folk Music Session',
    description:
      'Traditional folk music session with local musicians. Bring your instruments or just come to listen. Friendly atmosphere, all skill levels welcome. Cash bar available.',
    location: 'The Fleece Inn, Bretforton, Worcestershire WR11 7JE',
    price: 5,
    eventUrl: 'https://folkmusic.worcestershire',
    imageUrl:
      'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=940&h=470&fit=crop',
    category: 'Music',
  },
  {
    title: 'Electronic Music Production Workshop',
    description:
      'Learn the basics of electronic music production using industry-standard software. Covers beat making, synthesis, and mixing. Laptops provided or bring your own.',
    location: 'Point Blank Music School, 23 Goswell Road, London EC1M 7AJ',
    price: 60,
    eventUrl: 'https://pointblankmusicschool.com',
    imageUrl:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=940&h=470&fit=crop',
    category: 'Music',
  },
];

// Function to generate random dates between June and December 2025
function getRandomDate(): string {
  const start = new Date('2025-06-01');
  const end = new Date('2025-12-31');
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

// Function to get random city and create realistic venue
function getRandomVenue(category: string): string {
  const city = ukCities[Math.floor(Math.random() * ukCities.length)];

  const venueTypes: { [key: string]: string[] } = {
    Technology: [
      'Tech Hub',
      'Innovation Centre',
      'Co-working Space',
      'University',
      'Conference Centre',
    ],
    Business: [
      'Business Centre',
      'Hotel',
      'Conference Hall',
      'Corporate Office',
      'Convention Centre',
    ],
    'Arts & Culture': [
      'Gallery',
      'Museum',
      'Theatre',
      'Arts Centre',
      'Cultural Centre',
    ],
    'Sports & Fitness': [
      'Sports Centre',
      'Gym',
      'Park',
      'Stadium',
      'Leisure Centre',
    ],
    'Food & Drink': ['Restaurant', 'Pub', 'Market', 'Hotel', 'Event Space'],
    Music: ['Music Venue', 'Concert Hall', 'Pub', 'Club', 'Theatre'],
    Education: [
      'Library',
      'University',
      'Community Centre',
      'School',
      'Learning Centre',
    ],
    'Health & Wellness': [
      'Community Centre',
      'Wellness Centre',
      'Gym',
      'Clinic',
      'Spa',
    ],
    Networking: [
      'Hotel',
      'Business Centre',
      'Bar',
      'Restaurant',
      'Co-working Space',
    ],
  };

  const venues = venueTypes[category] || [
    'Community Centre',
    'Event Space',
    'Hotel',
  ];
  const venueType = venues[Math.floor(Math.random() * venues.length)];

  // Generate realistic UK address
  const streetNumbers = Math.floor(Math.random() * 200) + 1;
  const streetNames = [
    'High Street',
    'Church Lane',
    'Victoria Road',
    'King Street',
    'Queen Street',
    'Market Square',
    'Station Road',
  ];
  const streetName =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  const postcode = generatePostcode(city);

  return `${venueType}, ${streetNumbers} ${streetName}, ${city} ${postcode}`;
}

// Function to generate realistic UK postcodes
function generatePostcode(city: string): string {
  const postcodes: { [key: string]: string[] } = {
    London: ['SW1A 1AA', 'EC1A 1BB', 'W1A 0AX', 'SE1 9RT', 'N1 9GU'],
    Manchester: ['M1 1AA', 'M2 3BB', 'M13 9PL', 'M15 6PB', 'M4 4AA'],
    Birmingham: ['B1 1AA', 'B2 4QA', 'B15 2TT', 'B12 9QN', 'B7 4EJ'],
    Edinburgh: ['EH1 1AA', 'EH3 8EE', 'EH8 9YL', 'EH1 2PA', 'EH2 2AD'],
    Glasgow: ['G1 1AA', 'G3 6RQ', 'G12 8QQ', 'G1 3BJ', 'G3 7TA'],
    Leeds: ['LS1 1AA', 'LS2 3AD', 'LS8 1DJ', 'LS1 3BL', 'LS6 2UE'],
    Liverpool: ['L1 1AA', 'L2 6RE', 'L3 8EW', 'L2 2AL', 'L8 7NJ'],
    Bristol: ['BS1 1AA', 'BS8 1TH', 'BS16 1QD', 'BS2 8EE', 'BS4 3BD'],
    Newcastle: ['NE1 1AA', 'NE8 3BA', 'NE2 4HH', 'NE1 7RU', 'NE6 2PA'],
    Sheffield: ['S1 1AA', 'S10 2TN', 'S3 7HQ', 'S1 2HE', 'S11 8YB'],
  };

  const cityPostcodes = postcodes[city] || ['XX1 1AA', 'XX2 2BB', 'XX3 3CC'];
  return cityPostcodes[Math.floor(Math.random() * cityPostcodes.length)];
}

// Function to generate additional events to reach 100 total
function generateAdditionalEvents(baseEvents: any[]): any[] {
  const additionalEvents = [];
  const eventTitles = [
    'Book Club Monthly Meeting',
    'Charity Fun Run',
    'Local History Walk',
    'Photography Exhibition',
    'Craft Fair',
    'Farmers Market',
    'Film Screening',
    'Poetry Reading',
    'Dance Class',
    'Gardening Workshop',
    'Chess Tournament',
    'Trivia Night',
    'Speed Networking',
    'Volunteer Orientation',
    'Community Clean-up',
    'Pet Adoption Event',
    'Bake Sale',
    'Antiques Fair',
    'Car Boot Sale',
    'Music Festival',
    'Comedy Night',
    'Art Class',
    'Fitness Bootcamp',
    'Cycling Tour',
    'Walking Group',
    'Swimming Lessons',
    'Tennis Tournament',
    'Football Match',
    'Cricket Game',
    'Badminton Club',
    'Table Tennis Tournament',
    'Bowling Night',
    'Ice Skating',
    'Roller Derby',
    'Skateboarding Workshop',
    'Martial Arts Demo',
    'Boxing Class',
    'Zumba Session',
    'Aqua Aerobics',
    'Senior Exercise Class',
    'Kids Sports Day',
    'Family Fun Day',
  ];

  const descriptions = [
    'Join us for an engaging community event that brings people together.',
    'A wonderful opportunity to meet like-minded individuals and learn something new.',
    'Perfect for beginners and experienced participants alike.',
    'Family-friendly event with activities for all ages.',
    'Come and discover something new in a welcoming environment.',
    'Great way to stay active and meet new people in your local area.',
    'Educational and entertaining event suitable for everyone.',
    'Hands-on experience with expert guidance and support.',
    'Relaxed atmosphere perfect for socializing and learning.',
    'Regular meetup for enthusiasts and newcomers.',
  ];

  for (let i = baseEvents.length; i < 100; i++) {
    const randomTitle =
      eventTitles[Math.floor(Math.random() * eventTitles.length)];
    const randomDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomCategory =
      eventCategories[Math.floor(Math.random() * eventCategories.length)];
    const randomPrice =
      Math.random() > 0.4 ? Math.floor(Math.random() * 50) : 0; // 60% chance of paid event

    additionalEvents.push({
      title: randomTitle,
      description: randomDescription,
      location: getRandomVenue(randomCategory),
      price: randomPrice,
      eventUrl: `https://example.com/event-${i}`,
      imageUrl: `https://images.unsplash.com/photo-${
        1500000000000 + Math.floor(Math.random() * 100000000)
      }?w=940&h=470&fit=crop`,
      category: randomCategory,
    });
  }

  return additionalEvents;
}

// Main seeding function
async function seedEvents() {
  try {
    console.log('🔄 Authenticating...');
    await authenticateAdmin();
    console.log('Starting to seed events...');

    // Combine base events with generated ones
    const allEvents = [
      ...sampleEvents,
      ...generateAdditionalEvents(sampleEvents),
    ];

    // Shuffle the events array
    const shuffledEvents = allEvents.sort(() => Math.random() - 0.5);

    let successCount = 0;
    let errorCount = 0;

    for (const eventData of shuffledEvents) {
      try {
        const eventDoc = {
          ...eventData,
          date: getRandomDate(),
          createdAt: Timestamp.now(),
          createdBy: 'System Seed',
        };

        const docRef = await addDoc(collection(db, 'events'), eventDoc);
        console.log(
          `✅ Event created with ID: ${docRef.id} - ${eventDoc.title}`,
        );
        successCount++;

        // Add small delay to avoid overwhelming Firestore
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error creating event: ${eventData.title}`, error);
        errorCount++;
      }
    }

    console.log(`\n🎉 Seeding completed!`);
    console.log(`✅ Successfully created: ${successCount} events`);
    console.log(`❌ Errors: ${errorCount} events`);
    console.log(`📊 Total events in database: ${successCount}`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

// Run the seeding
seedEvents()
  .then(() => {
    console.log('Seeding process finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
