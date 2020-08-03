const { ApolloError } = require('apollo-server-express');

const init = (db) => {
  const findImages = async (rows) => { 
    const prodIds = rows.map((prod) => prod.id).join(',');
    const { rows: imagesRes } = await db.query(`select * from images where product_id in (${prodIds})`);

    const products = rows.map((prod) => {
      return {
        ...prod,
        images: imagesRes.filter((img) => img.product_id === prod.id)
      };
    });
    
    return products;
  };

  const findAll = async ({ limit = 10, offset = 0, orderBy = 'id', order = 'ASC' } = {}) => {
    const { rows } = await db.query(`select * from products order by ${orderBy} ${order} limit ${limit + 1} offset ${offset * limit}`);
    if (!rows[0]) {
      throw new ApolloError('Products not found', 404);
    }

    const products = await findImages(rows);

    const hasNext = rows.length > limit;
    if (hasNext) {
      products.pop();
    }
    
    return {
      data: products,
      hasNext
    };
  };

  const findById = async (id) => {
    const { rows } = await db.query('select * from products where id = $1', [id]);
    if (!rows[0]) {
      throw new ApolloError('Product not found', 404);
    }

    const product = await findImages(rows);
    return product[0];
  };

  const create = async (data) => {
    const { rows } = await db.query('insert into products (name, price) values ($1, $2) returning *', data);
    if (!rows[0]) {
      throw new ApolloError('Failed to create product', 500);
    }

    return rows[0];
  };

  const destroy = async (id) => {
    const { rowCount } = await db.query('delete from products where id = $1', [id]);
    if (rowCount === 0) {
      throw new ApolloError('Failed to delete product', 500);
    }

    return;
  };

  return {
    findAll,
    findById,
    create,
    destroy
  };
};

module.exports = init;
