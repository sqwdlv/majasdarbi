const phoneData = [
  {
    model: "iPhone 13 Pro",
    brand: "Apple",
    storage: "128GB",
    price: 999,
  },
  {
    model: "Galaxy S21 Ultra",
    brand: "Samsung",
    storage: "256GB",
    price: 1199,
  },
  {
    model: "Pixel 6 Pro",
    brand: "Google",
    storage: "128GB",
    price: 899,
  },
  {
    model: "OnePlus 9",
    brand: "OnePlus",
    storage: "128GB",
    price: 799,
  },
];


function filterPhonesByPrice(minPrice, maxPrice) {
  const filteredPhones = [];

  for (let i = 0; i < phoneData.length; i++) {
    const phone = phoneData[i];
    if (phone.price >= minPrice && phone.price <= maxPrice) {
      filteredPhones.push(phone);
    }
  }

  return filteredPhones;
}


const minPrice = 800;
const maxPrice = 1200;
const filteredPhones = filterPhonesByPrice(minPrice, maxPrice);


filteredPhones.forEach((phone) => {
  console.log(`${phone.brand} ${phone.model}: $${phone.price}`);
});
