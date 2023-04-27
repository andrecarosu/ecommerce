const { Supplier} = require("../../db");
const { Op, Sequelize } = require("sequelize");

const getAllSuppliers = async () => {
  try {
    const dataSupplier = await Supplier.findAll({
      attributes: [
        "supplier_id",
        "name",
        "address",
        "phone",
        "state",
        "contact_name",
        "post",
        "email",
        "city",
      ],
      include: [
        {
          model: Type_user,
          attributes: ["name"]
        }       
      ]
    });
    const results = [...dataSupplier];
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getSupplierById = async idSupplier => {
  try {
    const supplier = await Supplier.findByPk(idSupplier, {
      attributes: [
        "supplier_id",
        "name",
        "address",
        "phone",
        "state",
        "contact_name",
        "post",
        "email",
        "city",
      ],
    });
    return supplier;
  } catch (error) {
    console.error(error);
  }
};

const getSupplierByName = async name => {
  try {
    const supplier = await Supplier.findAll({
      attributes: [
        "supplier_id",
        "name",
        "address",
        "phone",
        "state",
        "contact_name",
        "post",
        "email",
        "city",
      ],
      where: {
        [Op.or]: [
          { name: name }
        ],
      },
    });
    return supplier;
  } catch (error) {
    console.error(error);
  }
};



module.exports = { getAllSuppliers, getSupplierById, getSupplierByName};
