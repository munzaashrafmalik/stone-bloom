import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

// Stone & Bloom - Complete Jewelry Collection (Earrings + Rings + Necklaces)
const jewelryProducts = [
  // ========== NECKLACES (21 Products) ==========
  
  // Necklace 1 - FEATURED
  {
    name: "Silver Plated Adjustable Necklace",
    description: "Elegant silver plated necklace for everyday wear or special occasions. Made with high-quality alloy, silver plating resists tarnish. Adjustable 30cm length fits all neck sizes. Unisex design perfect for anyone. Lightweight and comfortable for all-day wear.",
    price: 610,
    originalPrice: 800,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/239-40-494443-product-1-withcode.jpg"],
    stock: 72,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 24
  },
  
  // Necklace 2 - FLASH SALE
  {
    name: "Golden Leaf Necklace - Daily Wear",
    description: "Elegant golden leaf design necklace perfect for work, weddings, or Eid. Premium quality alloy material with intricate leaf detailing. Adjustable chain fits most necklines. Tarnish-resistant and lightweight for everyday use.",
    price: 370,
    originalPrice: 500,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/239-40-351189-product-1.jpg"],
    stock: 92,
    rating: 4.6,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 26
  },
  
  // Necklace 3 - FLASH SALE
  {
    name: "Multi Butterfly Korean Necklace",
    description: "Trending Korean style butterfly necklace. Available in Golden and Silver. Alloy construction, lightweight and durable. Perfect for casual and party wear.",
    price: 450,
    originalPrice: 600,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710180-product-1.webp"],
    stock: 200,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Golden", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // Necklace 4
  {
    name: "Charms Hanging Gold Plated Pendant",
    description: "Beautiful gold plated pendant with artificial stones. Stainless steel construction. Charms hanging design. Elegant and unique design perfect for special occasions.",
    price: 750,
    originalPrice: 950,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2147-40-710911-product-6.webp"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Standard Size"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Necklace 5 - FEATURED
  {
    name: "Double Butterfly Korean Zircon Necklace",
    description: "Trending double butterfly design with zircon stones. Available in Silver and Golden. Alloy material, lightweight and comfortable. Perfect for gifting or personal use.",
    price: 499,
    originalPrice: 650,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710178-product-2.webp"],
    stock: 200,
    rating: 4.9,
    numReviews: 0,
    sizes: [],
    colors: ["Silver", "Golden"],
    isFeatured: true,
    isOnSale: true,
    discount: 23
  },
  
  // Necklace 6 - FLASH SALE
  {
    name: "Single Pearl Korean Necklace",
    description: "Elegant single pearl pendant on Korean style chain. Available in Golden and Silver. Alloy construction. Minimalist design perfect for daily wear.",
    price: 499,
    originalPrice: 650,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710177-product-1.webp"],
    stock: 198,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Golden", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 23
  },
  
  // Necklace 7
  {
    name: "Engraved Flower Ball Chain Necklace",
    description: "Beautiful engraved flower design on ball chain. Golden finish. Alloy material. Perfect for parties and special occasions.",
    price: 690,
    originalPrice: 850,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710174-product-1.webp"],
    stock: 99,
    rating: 4.6,
    numReviews: 0,
    sizes: [],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 19
  },
  
  // Necklace 8 - FLASH SALE
  {
    name: "Pearl Shape Flower Korean Necklace",
    description: "Korean style flower necklace with pearl shape design. Available in White and Black. Alloy construction. Trendy and elegant.",
    price: 485,
    originalPrice: 650,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710164-product-2.webp"],
    stock: 200,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["White", "Black"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // Necklace 9
  {
    name: "Heart Shape Black Stainless Steel Necklace",
    description: "Elegant heart shape pendant in black stainless steel. Available in Silver and Golden. Alloy material. Perfect for gifting.",
    price: 650,
    originalPrice: 800,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710162-product-2.webp"],
    stock: 100,
    rating: 4.6,
    numReviews: 0,
    sizes: [],
    colors: ["Black", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 19
  },
  
  // Necklace 10 - FLASH SALE
  {
    name: "2 in 1 4 Leaf Clover Magnetic Necklace",
    description: "Unique 2-in-1 design with 4 leaf clover magnetic pendant. Available in Golden and Silver. Alloy construction. Lucky and stylish.",
    price: 565,
    originalPrice: 750,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710159-product-3.webp"],
    stock: 199,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Golden", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // Necklace 11
  {
    name: "Swan Shape Elegant Korean Pendant",
    description: "Elegant swan shape pendant necklace. Available in Red and Black. Alloy material. Korean design perfect for parties.",
    price: 485,
    originalPrice: 650,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-710156-product-2.webp"],
    stock: 200,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Red", "Black"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // Necklace 12 - FEATURED
  {
    name: "Elegant Knot Shape Pearl Pendant",
    description: "Elegant knot shape design with pearl. Stainless steel construction. Available in Silver and Golden. Perfect for daily wear or special occasions.",
    price: 499,
    originalPrice: 650,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-40-709742-product-1968.webp"],
    stock: 100,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Silver", "Golden"],
    isFeatured: true,
    isOnSale: true,
    discount: 23
  },
  
  // Necklace 13
  {
    name: "Butterfly Design Silver Plated Pendant",
    description: "Beautiful butterfly design silver plated pendant. Stainless steel construction. Tarnish-resistant. Perfect for gifting.",
    price: 850,
    originalPrice: 1100,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2161-40-709408-product-2.webp"],
    stock: 100,
    rating: 4.9,
    numReviews: 0,
    sizes: [],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 23
  },
  
  // Necklace 14 - FLASH SALE
  {
    name: "Pack Of 4 Pearl Necklace Deal - Eid Special",
    description: "Eid special deal! 4 pearl necklaces in one pack. Handmade with resin polish. Adjustable and free size. Great value for money.",
    price: 1699,
    originalPrice: 2400,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2292-40-707695-product-1.webp"],
    stock: 100,
    rating: 4.9,
    numReviews: 0,
    sizes: ["Adjustable", "Free Size"],
    colors: ["White"],
    isFeatured: false,
    isOnSale: true,
    discount: 29
  },
  
  // Necklace 15
  {
    name: "Butterfly Hanging Crystal Necklace",
    description: "Elegant butterfly necklace with golden finish and soft pink crystals. Stainless steel construction. Perfect for everyday style.",
    price: 669,
    originalPrice: 850,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2059-40-706129-product-1.webp"],
    stock: 200,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Necklace 16 - FLASH SALE
  {
    name: "Butterfly Hanging Gemstone Necklace",
    description: "Beautiful butterfly pendant with black gemstones. Golden finish. Alloy construction. Perfect for someone who loves soft, classy jewelry.",
    price: 669,
    originalPrice: 850,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2059-40-703774-product-1.webp"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Necklace 17
  {
    name: "Butterfly Design Gold Plated Pendant",
    description: "Gold plated pendant with artificial stones. Butterfly design. Stainless steel construction. Comes with 2 pieces.",
    price: 710,
    originalPrice: 900,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2147-40-692501-product-1.webp"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Necklace 18
  {
    name: "Ring Shaped Silver Plated Pendant",
    description: "Unique ring shaped pendant with artificial stones. Silver plated stainless steel. Comes with 7 pieces. Elegant and beautiful.",
    price: 705,
    originalPrice: 900,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2147-40-691116-product-2.webp"],
    stock: 100,
    rating: 4.6,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 22
  },
  
  // Necklace 19 - FEATURED
  {
    name: "Heart Design Necklace - Double Heart",
    description: "Beautiful double heart necklace. Golden finish. Alloy construction. Unique and beautiful design perfect for gifting.",
    price: 815,
    originalPrice: 1000,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/2059-40-688262-product-2.webp"],
    stock: 100,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Golden"],
    isFeatured: true,
    isOnSale: true,
    discount: 19
  },
  
  // Necklace 20 - FLASH SALE
  {
    name: "Multi Layered Antique Pearl Necklace with Earring",
    description: "Multi-layered antique plated pearl necklace with matching earrings. Comes with scented candle gift. Silver and Golden colors. 18 inches length.",
    price: 460,
    originalPrice: 650,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1653-40-683782-product-1-withcode.webp"],
    stock: 199,
    rating: 4.9,
    numReviews: 0,
    sizes: ["Free Size"],
    colors: ["Silver", "Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 29
  },
  
  // Necklace 21 - FLASH SALE
  {
    name: "Golden Layered Chain Necklace with Black Stone Pendant",
    description: "Layered chain necklace with elegant black stone pendant. Golden plating for luxurious shine. 18-inch length. Perfect for casual, formal, or party wear. Durable and tarnish-resistant.",
    price: 600,
    originalPrice: 800,
    category: "Necklaces",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-29985-163297-product-2.jpg"],
    stock: 940,
    rating: 4.8,
    numReviews: 0,
    sizes: ["18 Inch"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // ========== EARRINGS (21 Products - Existing) ==========
  
  // Earring 1
  {
    name: "Bow Heart Korean Earrings",
    description: "Beautiful bow heart design earrings. Material: Alloy | 2 Pcs | Silver & Golden plating. Perfect for casual and formal wear!",
    price: 599,
    originalPrice: 750,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710630-product-3.webp"],
    stock: 50,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Silver", "Gold"],
    isFeatured: true,
    isOnSale: true,
    discount: 20
  },
  
  // Earring 2
  {
    name: "Golden Plated Flower Pearl Earrings",
    description: "Exquisitely crafted flower pearl earrings. Golden plated. Perfect for casual/formal/party. Package: 1 Pair",
    price: 720,
    originalPrice: 900,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-29984-163291-product-1.jpg"],
    stock: 40,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Gold"],
    isFeatured: true,
    isOnSale: true,
    discount: 20
  },
  
  // Earring 3
  {
    name: "Purple Stone Stud Earrings",
    description: "Beautiful purple stone stud earrings. Golden plating. 1 Pair. Small size.",
    price: 660,
    originalPrice: 850,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-40187-220873-product-2.jpeg"],
    stock: 45,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Purple"],
    isFeatured: false,
    isOnSale: true,
    discount: 22
  },
  
  // Earring 4
  {
    name: "Golden Tulip Pearl Earrings",
    description: "Beautiful tulip pearl design. Golden plated. Perfect for daily wear.",
    price: 630,
    originalPrice: 800,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-40182-220859-product-2.jpeg"],
    stock: 25,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "White"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 5
  {
    name: "Elegant Shine Flower Pearl Zircon Earrings",
    description: "Elegant flower design with pearl and zircon. 2 Pcs. Golden & Silver.",
    price: 490,
    originalPrice: 620,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710615-product-4.webp"],
    stock: 200,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 6
  {
    name: "Zircon Gold Korean Style Baliyaan",
    description: "Traditional Korean style baliyaan with zircon. 2 Pcs. Golden & Silver.",
    price: 499,
    originalPrice: 630,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/thumbnails/products/1967-42-710624-product-6.webp"],
    stock: 198,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 7
  {
    name: "Butterfly Zircon Flower Style Earrings",
    description: "Beautiful butterfly flower style with zircon. 2 Pcs. Golden & Silver.",
    price: 495,
    originalPrice: 620,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710627-product-2.webp"],
    stock: 200,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 20
  },
  
  // Earring 8
  {
    name: "3 Pair Set Funky Gold Plated Crystal Earrings",
    description: "Funky design crystal earrings. 3 Pairs set! Gold plated. Pink color.",
    price: 420,
    originalPrice: 550,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1119-42-710457-product-1.webp"],
    stock: 100,
    rating: 4.6,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Pink"],
    isFeatured: true,
    isOnSale: true,
    discount: 24
  },
  
  // Earring 9
  {
    name: "Clover Shape Zircon Earrings AHJ-970",
    description: "Elegant clover shape with zircon. 2 Pcs. Black & White.",
    price: 550,
    originalPrice: 700,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710629-product-1.webp"],
    stock: 200,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Black", "White"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 10
  {
    name: "Heart Shape Pearl Korean Earrings PXJ-976",
    description: "Cute heart shape with pearl. 2 Pcs. Silver & Golden.",
    price: 480,
    originalPrice: 600,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710635-product-1.webp"],
    stock: 200,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Silver", "Gold"],
    isFeatured: true,
    isOnSale: true,
    discount: 20
  },
  
  // Earring 11
  {
    name: "Bow Shape Long Zircon Earrings",
    description: "Elegant long bow shape with zircon. 2 Pcs. Golden & Silver.",
    price: 550,
    originalPrice: 700,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710645-product-2.webp"],
    stock: 200,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 12
  {
    name: "Korean Leaf Design Pearl Studs",
    description: "Beautiful leaf design with pearl. Stainless steel. 2 Pcs.",
    price: 499,
    originalPrice: 630,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-709738-product-2.webp"],
    stock: 200,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 13
  {
    name: "Hexa Star Korean Zircon Large Earrings",
    description: "Large hexa star design with zircon. 2 Pcs. Golden & Silver.",
    price: 499,
    originalPrice: 630,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710155-product-1.webp"],
    stock: 200,
    rating: 4.6,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 14
  {
    name: "Dangling Korean Black Shiny Earrings",
    description: "Stylish dangling Korean earrings. 2 Pcs. Black color.",
    price: 499,
    originalPrice: 630,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710154-product-1.webp"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Black"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 15
  {
    name: "Zircon Beads Elegant Korean Earrings",
    description: "Elegant Korean style with zircon beads. 2 Pcs.",
    price: 530,
    originalPrice: 670,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710160-product-1.webp"],
    stock: 200,
    rating: 4.8,
    numReviews: 0,
    sizes: [],
    colors: ["Gold", "Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 16
  {
    name: "Cross Shape Zircon Korean Earrings",
    description: "Stylish cross shape with zircon. 2 Pcs. Silver & Golden.",
    price: 485,
    originalPrice: 610,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1967-42-710163-product-9.webp"],
    stock: 200,
    rating: 4.6,
    numReviews: 0,
    sizes: [],
    colors: ["Silver", "Gold"],
    isFeatured: false,
    isOnSale: true,
    discount: 20
  },
  
  // Earring 17
  {
    name: "Gold Plated Earrings",
    description: "Classic gold plated earrings. Alloy material. 1 Pc.",
    price: 530,
    originalPrice: 670,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-42-674227-product-1.webp"],
    stock: 100,
    rating: 4.6,
    numReviews: 0,
    sizes: [],
    colors: ["Gold"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 18
  {
    name: "Square Design Gold Plated Earrings",
    description: "Modern square design. Gold plated. 1 Pc.",
    price: 485,
    originalPrice: 610,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-42-674244-product-1.webp"],
    stock: 100,
    rating: 4.5,
    numReviews: 0,
    sizes: [],
    colors: ["Gold"],
    isFeatured: false,
    isOnSale: true,
    discount: 20
  },
  
  // Earring 19
  {
    name: "Silver Plated Earrings",
    description: "Elegant silver plated earrings. Alloy material. 1 Pc.",
    price: 550,
    originalPrice: 690,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-42-674229-product-1.webp"],
    stock: 100,
    rating: 4.6,
    numReviews: 0,
    sizes: [],
    colors: ["Silver", "White"],
    isFeatured: false,
    isOnSale: true,
    discount: 20
  },
  
  // Earring 20
  {
    name: "Golden Dollar Sign Earrings",
    description: "Stylish dollar sign design. Golden plated. 1 Pair",
    price: 490,
    originalPrice: 620,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-42-324026-product-1.jpg"],
    stock: 100,
    rating: 4.5,
    numReviews: 0,
    sizes: [],
    colors: ["Gold"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // Earring 21
  {
    name: "Golden Sparkly Loop Earrings",
    description: "Sparkly loop earrings. Golden plated. Perfect for party/festive wear!",
    price: 570,
    originalPrice: 720,
    category: "Earrings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-29984-163294-product-3.jpg"],
    stock: 85,
    rating: 4.7,
    numReviews: 0,
    sizes: [],
    colors: ["Gold"],
    isFeatured: false,
    isOnSale: true,
    discount: 21
  },
  
  // ========== RINGS (20 Products - Existing) ==========
  
  // Ring 1
  {
    name: "Elegant Adjustable Crystal Silver Ring",
    description: "Elegant silver plated crystal adjustable ring for daily wear. Perfect for weddings, office wear, or festive gatherings.",
    price: 600,
    originalPrice: 800,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/12-44-455495-product-1.jpg"],
    stock: 3,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 25
  },
  
  // Ring 2
  {
    name: "Elegant Crystal Silver Ring - Premium",
    description: "Premium silver plated crystal adjustable ring. Durable stainless steel construction.",
    price: 670,
    originalPrice: 900,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/12-44-455494-product-1.jpg"],
    stock: 3,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 26
  },
  
  // Ring 3
  {
    name: "Adjustable Crystal Silver Ring - Daily",
    description: "Sleek silver plated crystal ring for daily wear or special events.",
    price: 550,
    originalPrice: 750,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/12-44-455490-product-1.jpg"],
    stock: 5,
    rating: 4.6,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 27
  },
  
  // Ring 4
  {
    name: "Elegant Crystal Silver Ring - Unisex",
    description: "Sophisticated silver plated crystal adjustable ring for any occasion.",
    price: 600,
    originalPrice: 800,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/12-44-455496-product-1.jpg"],
    stock: 3,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 25
  },
  
  // Ring 5
  {
    name: "Adjustable Cubic Zirconia Silver Ring",
    description: "Elegant cubic zirconia ring with silver-plated metal. Sparkling stones.",
    price: 720,
    originalPrice: 950,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-39977-219775-product-1.jpeg"],
    stock: 110,
    rating: 4.9,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 24
  },
  
  // Ring 6
  {
    name: "Golden Zircon Circle Open Ball Ring",
    description: "Elegant zircon circle open ball ring for girls. Golden finish.",
    price: 450,
    originalPrice: 600,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/556-44-409176-product-1.jpg"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // Ring 7
  {
    name: "2pcs Silver Plated Heart Ring Set",
    description: "Trendy heart design ring set (2 pieces). Silver plated alloy.",
    price: 310,
    originalPrice: 450,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1123-44-387938-product-5.jpg"],
    stock: 50,
    rating: 4.5,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 31
  },
  
  // Ring 8
  {
    name: "Modern Gold Plated Rings Set (6 Pcs)",
    description: "Modern gold-plated rings set with 6 distinct styles.",
    price: 500,
    originalPrice: 700,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-44-324022-product-1.jpg"],
    stock: 80,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: true,
    isOnSale: true,
    discount: 29
  },
  
  // Ring 9
  {
    name: "Women Heart Adjustable Ring - Off White",
    description: "Heart-shaped adjustable ring with off-white enamel finish.",
    price: 609,
    originalPrice: 800,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-44-611368-product-1.png"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Off White", "Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 24
  },
  
  // Ring 10
  {
    name: "Women Leaf Design Adjustable Golden Ring",
    description: "Elegant leaf design adjustable ring with golden hue.",
    price: 655,
    originalPrice: 850,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-44-611369-product-1.png"],
    stock: 100,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden", "Off White"],
    isFeatured: false,
    isOnSale: true,
    discount: 23
  },
  
  // Ring 11
  {
    name: "Adjustable Golden Ring - Partywear",
    description: "Sleek golden adjustable ring for women. Durable alloy.",
    price: 695,
    originalPrice: 900,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-44-611370-product-1.png"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 23
  },
  
  // Ring 12
  {
    name: "Heart Shape Spinning Ring",
    description: "Unique heart shape spinning ring with clear crystal stone.",
    price: 660,
    originalPrice: 850,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/603-44-619559-product-3.jpg"],
    stock: 17,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 22
  },
  
  // Ring 13
  {
    name: "Gold Plated Adjustable Stone Ring",
    description: "Elegant gold-plated ring with artificial stones.",
    price: 635,
    originalPrice: 850,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-44-611301-product-1.png"],
    stock: 100,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // Ring 14
  {
    name: "Adjustable Moissanite Ring - 925 Silver",
    description: "Luxurious 925 Sterling Silver ring with white moissanite stone.",
    price: 620,
    originalPrice: 800,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/1080-44-533664-product-2.jpg"],
    stock: 25,
    rating: 4.9,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 23
  },
  
  // Ring 15
  {
    name: "Butterfly Design Gold Plated Ring",
    description: "Beautiful butterfly design gold plated adjustable ring.",
    price: 760,
    originalPrice: 950,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-44-674226-product-1.webp"],
    stock: 100,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden"],
    isFeatured: true,
    isOnSale: true,
    discount: 20
  },
  
  // Ring 16
  {
    name: "6 Pcs Silver Plated Bridal Ring Set",
    description: "Elegant bridal ring set with 6 pieces. Silver plated.",
    price: 400,
    originalPrice: 600,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/239-25071-134728-product-1.jpg"],
    stock: 16,
    rating: 4.7,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 33
  },
  
  // Ring 17
  {
    name: "Flower Design Gold Plated Crystal Ring",
    description: "Stunning flower design gold plated ring with white crystals.",
    price: 660,
    originalPrice: 850,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/12-44-639570-product-2.webp"],
    stock: 2,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Golden", "White"],
    isFeatured: false,
    isOnSale: true,
    discount: 22
  },
  
  // Ring 18
  {
    name: "Adjustable Crystal Silver Ring - Modern",
    description: "Modern silver-plated ring with sparkling crystal stones.",
    price: 680,
    originalPrice: 900,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/12-44-463232-product-1.jpg"],
    stock: 4,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 24
  },
  
  // Ring 19
  {
    name: "Elegant Crystal Silver Ring - Daily",
    description: "Elegant silver plated crystal adjustable ring for daily wear.",
    price: 600,
    originalPrice: 800,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/12-44-455496-product-1.jpg"],
    stock: 3,
    rating: 4.8,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: false,
    isOnSale: true,
    discount: 25
  },
  
  // Ring 20
  {
    name: "Silver Plated Couple Rings Set (2 Pcs)",
    description: "Elegant couple's rings set with 2 rings. Premium quality rhodium plating.",
    price: 860,
    originalPrice: 1200,
    category: "Rings",
    brand: "Stone & Bloom",
    images: ["https://content.public.markaz.app/markazimagevideo/public/products/70-44-611367-product-3.png"],
    stock: 325,
    rating: 4.9,
    numReviews: 0,
    sizes: ["Adjustable"],
    colors: ["Silver"],
    isFeatured: true,
    isOnSale: true,
    discount: 28
  }
];

// Admin user
const adminUser = {
  name: 'Stone & Bloom Admin',
  email: 'admin@stoneandbloom.com',
  password: 'admin123',
  phone: '03366840648',
  role: 'admin',
  address: {
    street: 'Saddar',
    city: 'Karachi',
    state: 'Sindh',
    postalCode: '75500',
    country: 'Pakistan'
  }
};

// Seed database
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert jewelry products
    await Product.insertMany(jewelryProducts);
    console.log(`✅ Inserted ${jewelryProducts.length} beautiful jewelry products!`);
    console.log(`   - 💎 Necklaces: 21 products`);
    console.log(`   - ✨ Earrings: 21 products`);
    console.log(`   - 💍 Rings: 20 products`);
    
    // Count featured and sale items
    const featured = jewelryProducts.filter(p => p.isFeatured).length;
    const onSale = jewelryProducts.filter(p => p.isOnSale).length;
    console.log(`   - ⭐ Featured: ${featured} products`);
    console.log(`   - 🔥 On Sale: ${onSale} products`);

    // Create admin user
    const admin = await User.create(adminUser);
    console.log(`✅ Created admin user: ${admin.email}`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n💎 Stone & Bloom - Complete Jewelry Collection');
    console.log(`📦 Total Products: ${jewelryProducts.length}`);
    console.log('💰 Price Range: Rs. 310 - Rs. 1,699');
    console.log('👤 Admin Email: admin@stoneandbloom.com');
    console.log('🔑 Admin Password: admin123');
    console.log('\n✨ All products ready to sell!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
