import styled from 'styled-components';
import useGetItemDetails from '../utils/useGetItemDetails';

const CardStyle = styled.div`
  background-color: lightblue;
`;

const ProductCard = ({ item }) => {
  const {
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
    stock,
  } = useGetItemDetails(item);
  console.log('discountPrice is', discountPrice);
  return (
    <CardStyle>
      <h3>ProductCard</h3>
    </CardStyle>
  );
};

export default ProductCard;
