const imageMap = {
  "iPhone 15 Pro": "iphone-15-pro.jpg",
  "Asus ROG Phone 7": "asusrog-7.jpg",
  "Google Pixel 8 Pro": "google-pixel-8-pro.jpg",
  "iPhone 14": "iphone-14.jpg",
  "Motorola Edge 40": "motorola-edge-40.jpg",
  "OnePlus 12": "oneplus-12.jpg",
  "Samsung Galaxy A54": "samsung-a54.jpg",
  "Samsung Galaxy S24 Ultra": "samsung-s24.jpg",
  "Sony Xperia 1 V": "sony-xperia.jpg",
  "Xiaomi 14 Pro": "xiaomi-14.jpg",
};

export function getImageForTitle(title) {
  return `/img/${imageMap[title] || "default.jpg"}`;
}
