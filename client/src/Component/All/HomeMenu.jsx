import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { ProductService } from '../../service/ProductService';
import { useNavigate } from 'react-router-dom'
import { useGetAllProductsQuery } from '../../features/func/productApiSlice';
import { useGetProductByCategoryQuery } from '../../features/func/productApiSlice';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../features/func/productSlice';

const HomeMenu = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    
    const onImageClick=(title)=>{
        dispatch(setCategory(title))
        navigate("/all/product")
        
    }

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
    }, []);

    const productTemplate = (product) => {
        return (
            <>
                <div className="mb-3" style={{ height: "65vh", width: "28vw", display: "flex", gap: "2%", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <img className='hoverImg' src={`${product.itemImageSrc}`} alt={product.name} style={{ height: "98%" }} onClick={()=>{onImageClick(product.title)}}/>
                    <div style={{ height: "100%", width: "100%", fontSize: "20px", textAlign: "center" }}>{product.title}</div>
                </div>
            </>
        );
    };

    return (
        <>
        <div style={{height:"5vh"}}></div>
            <Carousel value={products} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} autoplayInterval={2500} circular />

        </>
    )
}

export default HomeMenu