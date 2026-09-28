// Emoji artwork only where the emoji really is that product; everything else
// gets a monogram tile rather than a look-alike (no chestnut for walnut,
// jack-o'-lantern for pumpkin, or fallen leaf for tobacco).
const PRODUCT_EMOJI = {
  mango: '🥭', banana: '🍌', grapes: '🍇', lemon: '🍋', apple: '🍎', cherry: '🍒',
  pineapple: '🍍', watermelon: '🍉', oranges: '🍊', kiwi: '🥝', pears: '🍐', strawberry: '🍓',
  rajma: '🫘', 'sweet-corn': '🌽', tomatoes: '🍅', carrot: '🥕', garlic: '🧄',
  'green-chilli': '🌶️', 'green-peas': '🫛', cucumber: '🥒', 'green-pepper': '🫑',
  'curry-leaves': '🌿', 'mint-leaves': '🌿', onion: '🧅', potato: '🥔', yams: '🍠',
  chilly: '🌶️', ginger: '🫚', mint: '🌿',
  'maize-corn': '🌽', oats: '🥣', rice: '🍚', 'soya-beans': '🫘', wheat: '🌾',
  'ground-nut': '🥜', 'sunflower-seeds': '🌻', wood: '🪵',
  chicken: '🐔', goat: '🐐', honey: '🍯', eggs: '🥚', fish: '🐟', prawns: '🦐',
  butter: '🧈', cheese: '🧀', 'milk-dairy': '🥛', rose: '🌹',
  rosebamboos: '🎋', cocoa: '🍫', coconut: '🥥', coffee: '☕', tea: '🍵',
  wool: '🧶', salt: '🧂',
};

const toProducts = (names) =>
  names.map((name) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id, name, emoji: PRODUCT_EMOJI[id] };
  });

// `accent` drives buttons and highlights, `tint` the soft card backgrounds,
// `emoji` the artwork (first one is the hero). `image` is only set where a
// real product photo exists.
const categories = [
  {
    id: "fruits",
    name: "Fruits",
    image: "/images/fruits.jpg",
    accent: "#f97316",
    tint: "#fff3e8",
    emoji: ["🥭", "🍇", "🍎"],
    products: toProducts(["Mango", "Banana", "Grapes", "Guava", "Papaya", "Lemon", "Apple", "Cherry", "Pineapple", "Walnut", "Watermelon", "Almond", "Oranges", "Kiwi", "Pears", "Strawberry", "Pomegranate", "Pista", "Figs", "Dates"])
  },
  {
    id: "vegetables",
    name: "Vegetables",
    image: "/images/vegetables.jpg",
    accent: "#16a34a",
    tint: "#edfbef",
    emoji: ["🥕", "🥦", "🍅"],
    products: toProducts(["Rajma", "Ridge Gourd", "Snake Gourd", "Sweet Corn", "Tomatoes", "Bengal Gram", "Bitter Gourd", "Black Gram", "Bottle Gourd", "Carrot", "Cassava", "Cauliflower", "Drumstick", "Garlic", "Green Chilli", "Green Grams", "Green Peas", "Cow Peas", "Cucumber", "Curry Leaves", "Green Pepper", "Kabuli Chena", "Lentils - Kayadanyalu", "Mint Leaves", "Onion", "Potato", "Pumpkin", "Toordal", "Yams"])
  },
  {
    id: "spices",
    name: "Spices",
    image: "/images/spices.jpg",
    accent: "#dc2626",
    tint: "#fff1ee",
    emoji: ["🌶️", "🧄", "🌿"],
    products: toProducts(["Ajwan", "Ansie", "Asafoetida", "Black Pepper", "Cassia", "Chilly", "Corinader", "Cumin", "Fennel Seeds", "Fenugreek", "Ginger", "Mint", "Mustard", "Poppy Seeds", "Tamarind", "Turmeric"])
  },
  {
    id: "cereals",
    name: "Cereals",
    accent: "#ca8a04",
    tint: "#fefae6",
    emoji: ["🌾", "🌽", "🍚"],
    products: toProducts(["Bajra", "Barley", "Maize Corn", "Oats", "Quinoa", "Ragi", "Rice", "Sorghum Seeds", "Soya Beans", "Wheat"])
  },
  {
    id: "oil-seeds",
    name: "Oil Seeds",
    accent: "#65a30d",
    tint: "#f5fbe7",
    emoji: ["🌻", "🥜", "🫒"],
    products: toProducts(["Black Sesame", "Castor Seeds", "Crude Palm", "Ground Nut", "Niger Seeds", "Sunflower Seeds"])
  },
  {
    id: "forest-products",
    name: "Forest Products",
    accent: "#a16207",
    tint: "#faf5ec",
    emoji: ["🪵", "🌲", "🍂"],
    products: toProducts(["Rubber", "Wood"])
  },
  {
    id: "animal-husbandry",
    name: "Animal Husbandry",
    accent: "#2563eb",
    tint: "#edf3ff",
    emoji: ["🐐", "🐔", "🍯"],
    products: toProducts(["Chicken", "Goat", "Honey"])
  },
  {
    id: "poultry",
    name: "Poultry",
    accent: "#e11d48",
    tint: "#fff0f3",
    emoji: ["🐔", "🥚", "🐣"],
    products: toProducts(["Eggs"])
  },
  {
    id: "aqua",
    name: "Aqua",
    accent: "#0891b2",
    tint: "#e9fafd",
    emoji: ["🐟", "🦐", "🦀"],
    products: toProducts(["Fish", "Prawns"])
  },
  {
    id: "dairy",
    name: "Dairy",
    accent: "#7c3aed",
    tint: "#f4f0ff",
    emoji: ["🥛", "🧀", "🧈"],
    products: toProducts(["Butter", "Cheese", "Ghee", "Milk Dairy"])
  },
  {
    id: "plants",
    name: "Plants",
    accent: "#059669",
    tint: "#eafbf3",
    emoji: ["🪴", "🌿", "🍃"],
    products: toProducts(["Green Betel", "Guargum", "Neem", "Tobacco"])
  },
  {
    id: "flowers",
    name: "Flowers",
    accent: "#db2777",
    tint: "#fdf0f7",
    emoji: ["🌹", "🌸", "🌼"],
    products: toProducts(["Rose"])
  },
  {
    id: "plantation-crop",
    name: "Plantation Crop",
    accent: "#0d9488",
    tint: "#e9faf7",
    emoji: ["🥥", "☕", "🍵"],
    products: toProducts(["RoseBamboos", "Betel Nuts", "Cashew Nuts", "Cocoa", "Coconut", "Coffee", "Sugar", "Tea"])
  },
  {
    id: "fabric",
    name: "Fabric",
    accent: "#4f46e5",
    tint: "#eef0ff",
    emoji: ["🧶", "🧵", "👕"],
    products: toProducts(["Cotton", "Jute", "Silk", "Wool"])
  },
  {
    id: "others",
    name: "Others",
    accent: "#475569",
    tint: "#f1f4f8",
    emoji: ["🧂", "📦", "🛒"],
    products: toProducts(["Salt"])
  }
];

export default categories;
