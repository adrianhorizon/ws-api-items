const axios = require('axios');

const imageIdProducts = products => {
  const imagesId = [];

  products.forEach(key => imagesId.push(imageIdToProduct(key)));

  return imagesId;
};

const imageIdToProduct = product => product.thumbnail_id;

const categoriesRecent = filters => {
  let categories = [];

  filters.forEach(({ id, values }) => {
    if (id === 'category') {
      values[0].path_from_root.forEach(({ name }) => categories.push(name));
    }
  });

  if (categories.length > 0) {
    return categories.join(' > ');
  } else {
    return null;
  }
};

const modifyDataProducts = (products, images, breadcrumb) => {
  let body = '';
  let items = [];
  let newImage = '';
  products.forEach(key => {
    const imageId = imageIdToProduct(key);

    images.forEach(({ id, variations }) => {
      if (id === imageId) {
        newImage = key['fullSizeImage'] = variations[0].url;
      }
    });

    items.push({
      id: key.id,
      title: key.title,
      price: {
        currency: key.currency_id,
        amount: key.price,
        decimals: 2
      },
      picture: newImage,
      condition: key.condition === 'new' ? 'Nuevo' : 'Usado',
      free_shipping: key.shipping.free_shipping,
      address: key.address.state_name
    });

    body = {
      author: {
        name: 'Adrian Camilo',
        lastname: 'Parra Caminos'
      },
      categories: breadcrumb,
      items
    };
  });

  return body;
};

class ProductsService {
  async getProducts({ search }) {
    const { data: results } = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?limit=4&q=${search}`
    );

    const pictures = imageIdProducts(results.results);
    const breadcrumb = categoriesRecent(results.filters);

    const { data } = await axios.get(
      `https://api.mercadolibre.com/pictures?ids=${pictures.join()}`
    );

    const dataProduct = modifyDataProducts(results.results, data, breadcrumb);

    return dataProduct;
  }

  async getProduct(productId) {
    const { data } = await axios.get(
      `https://api.mercadolibre.com/items/${productId}`
    );

    const categories = await axios.get(
      `https://api.mercadolibre.com/categories/${data.category_id}`
    );

    const descriptions = await axios.get(
      `https://api.mercadolibre.com/items/${productId}/description`
    );

    const breadcrumb = categories.data.path_from_root
      .map(({ name }) => name)
      .join(' > ');

    const { url } = data.pictures[0];

    const body = {
      author: {
        name: 'Adrian Camilo',
        lastname: 'Parra Caminos'
      },
      items: {
        id: data.id,
        title: data.title,
        price: {
          currency: data.currency_id,
          amount: data.price,
          decimals: 2
        },
        picture: url,
        condition: data.condition === 'new' ? 'Nuevo' : 'Usado',
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: descriptions.data.plain_text,
      },
      breadcrumb
    };

    return body;
  }
}

module.exports = ProductsService;
