function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const useGetItemDetails = item => {
  // console.log('the descriotion', item.description.raw.children);

  let mainContent;
  if (item.description) {
    mainContent = item.description.raw.children;
  }

  const isNewProd = item.newproduct;
  const isPromoProd = item.promotion;
  const price = insertDecimal(item.price);
  const tempPrice = item.price;
  const discount = item.discount;
  const discountPrice = insertDecimal(tempPrice - tempPrice * (discount / 100));
  let imgsrc = isNewProd
    ? '/new.png'
    : isPromoProd
    ? '/promo.png'
    : '/transp.png';

  const mainImgSrc = item.images.url || item.images[0].url;

  const id = item.id;
  const title = item.title;
  const subtitle = item.subtitle;
  const stock = item.stock;
  const manufacturer = item.manufacturerLink;
  const warranty = item.warranty;

  return {
    isNewProd,
    isPromoProd,
    price,
    tempPrice,
    discount,
    discountPrice,
    imgsrc,
    mainImgSrc,
    id,
    title,
    subtitle,
    stock,
    mainContent,
    manufacturer,
    warranty,
  };
};

export default useGetItemDetails;
