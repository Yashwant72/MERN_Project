
const mongoose = require("mongoose");
const User = require("../models/user");
const Property = require("../models/property");

const rawUsersObject = [
  {
    fullName: "John Doe",
    email: "johndoe@example.com",
    password: "@StrongPassword123",
    phone: "1234567890",
    birthDate: new Date("1990-05-15")
  },
  {
    fullName: "Jane Smith",
    email: "janesmith@example.com",
    password: "Secure#Pass456",
    phone: "9876543210",
    birthDate: new Date("1985-12-10")
  }
]

const rawPropObject = [
  {
    price: 350000,
    address: "Taj Mahal, Agra, Uttar Pradesh, India",
    bedrooms: 4,
    bathrooms: 2,
    area: 2000,
    images: "https://source.unsplash.com/featured/?house&sig=1",
    type: "Residential",
    facilities: "Garden, Garage",
    description: "Spacious 4-bedroom house with a beautiful garden."
  },
  {
    price: 1200000,
    address: "Gateway of India, Mumbai, Maharashtra, India",
    bedrooms: 1,
    bathrooms: 1,
    area: 3000,
    images: "https://source.unsplash.com/featured/?house&sig=2",
    type: "Commercial",
    facilities: "Conference rooms, Cafeteria",
    description: "Large commercial space suitable for office or retail purposes."
  },
  {
    price: 500000,
    address: "Hawa Mahal, Jaipur, Rajasthan, India",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: "https://source.unsplash.com/featured/?house&sig=3",
    type: "Residential",
    facilities: "Swimming pool, Balcony",
    description: "Stunning beachside villa with a private swimming pool and ocean views."
  },
  {
    price: 800000,
    address: "Lotus Temple, New Delhi, India",
    bedrooms: 5,
    bathrooms: 3,
    area: 2500,
    images: "https://source.unsplash.com/featured/?house&sig=4",
    type: "Residential",
    facilities: "Fireplace, Home theater",
    description: "Luxurious mountain-view retreat with a cozy fireplace and home theater."
  },
  {
    price: 600000,
    address: "Qutub Minar, New Delhi, India",
    bedrooms: 1,
    bathrooms: 1,
    area: 2000,
    images: "https://source.unsplash.com/featured/?house&sig=5",
    type: "Commercial",
    facilities: "Parking, High-speed internet",
    description: "Spacious commercial building with ample parking and high-speed internet connectivity."
  },
  {
    price: 200000,
    address: "Mysore Palace, Mysore, Karnataka, India",
    bedrooms: 2,
    bathrooms: 1,
    area: 1500,
    images: "https://source.unsplash.com/featured/?house&sig=6",
    type: "Residential",
    facilities: "Backyard, Storage room",
    description: "Cozy 2-bedroom home with a backyard and additional storage room."
  },
  {
    price: 900000,
    address: "Marina Beach, Chennai, Tamil Nadu, India",
    bedrooms: 1,
    bathrooms: 1,
    area: 2800,
    images: "https://source.unsplash.com/featured/?house&sig=7",
    type: "Commercial",
    facilities: "Open floor plan, Central location",
    description: "Modern commercial space with an open floor plan and a prime downtown location."
  },
  {
    price: 1500000,
    address: "Jama Masjid, Delhi, India",
    bedrooms: 1,
    bathrooms: 1,
    area: 3500,
    images: "https://source.unsplash.com/featured/?house&sig=8",
    type: "Residential",
    facilities: "Swimming pool, Garden",
    description: "Charming 1-bedroom cottage with a swimming pool and a beautiful garden."
  },
  {
    price: 400000,
    address: "Chandni Chowk, Delhi, India",
    bedrooms: 2,
    bathrooms: 2,
    area: 2000,
    images: "https://source.unsplash.com/featured/?house&sig=9",
    type: "Residential",
    facilities: "Balcony, Gym",
    description: "Modern 2-bedroom apartment with a balcony and a fitness gym."
  },
  {
    price: 700000,
    address: "Jaisalmer Fort, Jaisalmer, Rajasthan, India",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: "https://source.unsplash.com/featured/?house&sig=10",
    type: "Residential",
    facilities: "Swimming pool, Patio",
    description: "Lakefront property with a swimming pool and a spacious patio area."
  },
  {
    price: 950000,
    address: "Humayun's Tomb, Delhi, India",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    images: "https://source.unsplash.com/featured/?house&sig=11",
    type: "Residential",
    facilities: "Garden, Study room",
    description: "Beautiful hillside house with a garden and a dedicated study room."
  },
  {
    price: 550000,
    address: "Golden Temple, Amritsar, Punjab, India",
    bedrooms: 2,
    bathrooms: 1,
    area: 1500,
    images: "https://source.unsplash.com/featured/?house&sig=12",
    type: "Residential",
    facilities: "Garage, Deck",
    description: "Cozy lakeside home with a garage and a spacious deck for outdoor living."
  },
  {
    price: 300000,
    address: "Victoria Memorial, Kolkata, West Bengal, India",
    bedrooms: 1,
    bathrooms: 1,
    area: 1000,
    images: "https://source.unsplash.com/featured/?house&sig=13",
    type: "Residential",
    facilities: "Swimming pool, Sauna",
    description: "Luxury condominium with a swimming pool and a relaxing sauna."
  },
  {
    price: 750000,
    address: "India Gate, New Delhi, India",
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    images: "https://source.unsplash.com/featured/?house&sig=14",
    type: "Residential",
    facilities: "Balcony, Tennis court",
    description: "Seaside villa with a private balcony and access to a tennis court."
  },
  {
    price: 480000,
    address: "Charminar, Hyderabad, Telangana, India",
    bedrooms: 2,
    bathrooms: 1,
    area: 1500,
    images: "https://source.unsplash.com/featured/?house&sig=15",
    type: "Residential",
    facilities: "Garden, Play area",
    description: "Family-friendly home with a spacious garden and a dedicated play area."
  }
];




const loadUserData = async (data) => {
  const users = await User.create(data);
  const userIds = users.map((user) => user._id);

  return userIds;
}

const createPropertyList = (val, properties) => {
  const filtered = properties.filter((entry) => (
    entry.currentOwner == val
  ))

  const owned = filtered.map((entry) => entry._id);
  return owned;
}

const loadPropertyData = async (data, userIds) => {
  const propData = data.map((entry) => ({
    currentOwner: userIds[Math.floor(Math.random() * userIds.length)],
    ...entry
  }))

  const properties = await Property.create(propData);
  const ownerList = userIds.reduce((acc, val) => ({
    ...acc,
    [val]: createPropertyList(val, properties)
  }), {})

  return ownerList;
}

const updateUsers = async (ownerList) => {
  const users = await User.find({});

  const bulkUpdates = users.map((doc) => ({
    updateOne: {
      filter: { _id: doc._id },
      update: { selling: ownerList[doc._id] }
    }
  }))
  await User.bulkWrite(bulkUpdates);
}

const runTestScript = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connection successful");

  const userIds = await loadUserData(rawUsersObject);
  const ownerList = await loadPropertyData(rawPropObject, userIds);

  await updateUsers(ownerList);
  console.log("Data entry completed");
}

runTestScript();
