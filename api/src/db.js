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

User.belongsTo(Type_user, { foreignKey: 'id_type', });
Type_user.hasMany(User, { foreignKey: 'user_id' });

Producto.hasMany(Motivo_calificacion, { foreignKey: "id_producto" });
Motivo_calificacion.belongsTo(Producto, { foreignKey: "id_producto" });

Ciudad.hasMany(Usuario, { foreignKey: "id_ciudad" });
Usuario.belongsTo(Ciudad, { foreignKey: "id_ciudad" });

Ciudad.hasMany(Comercio, { foreignKey: "id_ciudad" });
Comercio.belongsTo(Ciudad, { foreignKey: "id_ciudad" })

Comercio.hasMany(Producto, { foreignKey: "id_comercio" })
Producto.belongsTo(Comercio, { foreignKey: "id_comercio" })

Categoria_comercio.hasMany(Comercio, { foreignKey: "id_categoria_comercio" });
Comercio.belongsTo(Categoria_comercio, { foreignKey: "id_categoria_comercio" })

Categoria_producto.hasMany(Producto, { foreignKey: 'id_categoria_producto' });
Producto.belongsTo(Categoria_producto, { foreignKey: 'id_categoria_producto' })


/*----------------------------------------------------------------------*/
Producto.belongsToMany(Venta, { through: "Detalle_venta" });
Venta.belongsToMany(Producto, { through: "Detalle_venta" });

Usuario.hasMany(Venta, { foreignKey: "id_usuario" });
Venta.belongsTo(Usuario, { foreignKey: "id_usuario" });

Venta.hasMany(Detalle_venta, { foreignKey: "id_venta" });
Detalle_venta.belongsTo(Venta, { foreignKey: "id_venta" })

Producto.hasMany(Detalle_venta, { foreignKey: "id_producto" });
Detalle_venta.belongsTo(Producto, { foreignKey: "id_producto" })

Comercio.hasMany(Detalle_venta, { foreignKey: "id_comercio" });
Detalle_venta.belongsTo(Comercio, { foreignKey: "id_comercio" })

Pagos.hasMany(Detalle_venta, { foreignKey: "id_pago" });
Detalle_venta.belongsTo(Pagos, { foreignKey: "id_pago" })

Comercio.hasMany(Pagos, { foreignKey: "id_comercio" });
Pagos.belongsTo(Comercio, { foreignKey: "id_comercio" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
