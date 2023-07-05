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
    location: "456 Elm St, Townsville",
    area: 2000,
    images: "https://example.com/property-image-1.jpg",
    type: "residential",
    beds: 4,
    facilities: "Garden, Garage",
    description: "Spacious 4-bedroom house with a beautiful garden."
  },
  {
    price: 1200000,
    location: "789 Oak Ave, Countryside",
    area: 3000,
    images: "https://example.com/property-image-2.jpg",
    type: "commercial",
    beds: 0,
    facilities: "Conference rooms, Cafeteria",
    description: "Large commercial space suitable for office or retail purposes."
  },
  {
    price: 500000,
    location: "321 Pine Rd, Beachside",
    area: 1800,
    images: "https://example.com/property-image-3.jpg",
    type: "residential",
    beds: 3,
    facilities: "Swimming pool, Balcony",
    description: "Stunning beachside villa with a private swimming pool and ocean views."
  },
  {
    price: 800000,
    location: "987 Maple Ln, Mountainview",
    area: 2500,
    images: "https://example.com/property-image-4.jpg",
    type: "residential",
    beds: 5,
    facilities: "Fireplace, Home theater",
    description: "Luxurious mountain-view retreat with a cozy fireplace and home theater."
  },
  {
    price: 600000,
    location: "654 Cedar Ave, Cityscape",
    area: 2000,
    images: "https://example.com/property-image-5.jpg",
    type: "commercial",
    beds: 0,
    facilities: "Parking, High-speed internet",
    description: "Spacious commercial building with ample parking and high-speed internet connectivity."
  },
  {
    price: 200000,
    location: "789 Birch St, Suburbia",
    area: 1500,
    images: "https://example.com/property-image-6.jpg",
    type: "residential",
    beds: 2,
    facilities: "Backyard, Storage room",
    description: "Cozy 2-bedroom home with a backyard and additional storage room."
  },
  {
    price: 900000,
    location: "123 Spruce Ave, Downtown",
    area: 2800,
    images: "https://example.com/property-image-7.jpg",
    type: "commercial",
    beds: 0,
    facilities: "Open floor plan, Central location",
    description: "Modern commercial space with an open floor plan and a prime downtown location."
  },
  {
    price: 1500000,
    location: "456 Walnut Rd, Countryside",
    area: 3500,
    images: "https://example.com/property-image-8.jpg",
    type: "residential",
    beds: 1,
    facilities: "Swimming pool, Garden",
    description: "Charming 1-bedroom cottage with a swimming pool and a beautiful garden."
  }
]

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
