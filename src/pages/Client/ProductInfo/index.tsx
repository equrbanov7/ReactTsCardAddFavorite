interface ProductInfoProps  {
    id:number
}


const ProductInfo = ({id}:ProductInfoProps) => {
    console.log(id)
  return <div className="ProductInfo">
    ProductInfo
  </div>;
};

export default ProductInfo;
