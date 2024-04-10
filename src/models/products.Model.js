export default class ProductModel {
  constructor(id, name, discription, price, img) {
    this.id = id;
    this.name = name;
    this.description = discription;
    this.price = price;
    this.img = img;
  }
  static get() {
    
    return products;
  }
  static add(product,image) {
    const p = new ProductModel(
      products.length + 1,
      product.name,
      product.description,
      product.price,
      image
    );

    products.push(p);
  }
  static getProduct(id) {
    return products.find((i) => i.id == id);
  }
  static update(product) {
    const index = products.findIndex((i) => i.id == product.id);
    if (index != -1) {
      product.price = parseFloat(product.price);
      products[index] = product;
    }
  }
  static delete(id) {
    const index = products.findIndex((i) => i.id == id);
    if (index != -1) {
      products.splice(index, 1);
    }
  }
}

const products = [
  {
    id: 1,
    name: "Atomic Habits",
    description: "A supremely practical and useful book.",
    price: 300,
    img: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
  },
  {
    id: 2,
    name: "Ikigai",
    description: "The Japanese secret to a long and happy life",
    price: 340,
    img: "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
  },
  {
    id: 3,
    name: "Deep Work",
    description: "RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD",
    price: 280,
    img: "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
  },
];
