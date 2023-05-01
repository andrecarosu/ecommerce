require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Category_product,
  Detail_order,
  Detail_shopping,
  Order,
  Product,
  Review,
  Shopping,
  Supplier,
  Type_user,
  User,

} = sequelize.models;

// Aca vendrian las relaciones

/*---------------relaciones de uno a muchos---------------------*/

User.belongsTo(Type_user, { foreignKey: 'type_id' });
Type_user.hasMany(User, { foreignKey: 'type_id' });

Review.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Review, { foreignKey: "product_id" });

Review.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Review, { foreignKey: "user_id" });

Product.belongsTo(Category_product, { foreignKey: "category_id" });
Category_product.hasMany(Product, { foreignKey: "category_id" });

// Product.belongsTo(Supplier, { foreignKey: "supplier_id" });
// Supplier.hasMany(Product, { foreignKey: "supplier_id" });

Order.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Order, { foreignKey: "user_id" });

// Supplier.belongsTo(Shopping, { foreignKey: "shopping_id" });
// Shopping.hasMany(Supplier, { foreignKey: "shopping_id" });

/*---------------relaciones de muchos a muchos---------------------*/

Product.belongsToMany(Order, { through: { model: Detail_order, unique: false, fields: ["name"] } });
Order.belongsToMany(Product, { through: { model: Detail_order, unique: false, fields: ["name"] } });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
