import React, { useState, useEffect } from 'react';
import HomeMenu from './HomeMenu';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { Image } from 'primereact/image';
import { TabMenu } from 'primereact/tabmenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useGetProductByCategoryQuery } from '../../features/func/productApiSlice';
import { useGetAllProductsQuery } from '../../features/func/productApiSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../features/func/productSlice';
import { Dialog } from 'primereact/dialog';



const Product = () => {

    const items = [
        {
            label: 'כל המוצרים',
        },
        {
            label: 'טבלאות',
        },
        {
            label: 'מיוחדים',
        },
        {
            label: 'שוקולדים',
        },
        {
            label: 'מארזים',
        },
        {
            label: 'מקרונים',
        },
    ];
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch()
    const [show, setShow] = useState('none')
    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
            setShow('block')
        }
    }, [])


    const category = useSelector((state) => (state.product.category))


    const { data: allProducts = [] } = useGetAllProductsQuery();
    const { data: categoryProducts = [], isLoading, isError, error } = useGetProductByCategoryQuery(
        category === 'כל המוצרים' ? '' : category
    );

    const products = category === 'כל המוצרים' ? allProducts : categoryProducts;

    const send = (e) => {
        const selected = e.value.label;
        dispatch(setCategory(selected));
        const i = items.findIndex((item) => item.label === selected);
        setIndex(i);
    };

    if (isLoading) {
        console.log("isLoading");
    }
    if (isError) {
        console.log(error.error.message);
    }

    const navigate = useNavigate()

    //הוספה לסל
    const addBasket = async (product) => {
        try {
            const userToken = localStorage.getItem("userToken");
            const res = await axios.post("http://localhost:44444/api/basket/create",
                { _id: product },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                navigate("/all/mybasket");
        } catch (e) {
            alert(e.response.data);
        }
    }

    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null)

    const showDialog = (product) => {
        setSelectedProduct(product);
        setVisible(true);
    };



    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" style={{ background: "#fbf4ec" }} key={product.id}>
                <div className="p-4  " style={{ position: "relative", width: "450px", height: "500px", margin: "0 auto" }}>
                    <div style={{
                        position: "absolute", top: "35px", left: "35px", backgroundColor: "#B7C4CA", color: "white",
                        padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.9rem", zIndex: 10,
                    }}>
                        {product.category}
                    </div>

                    <img src={`/images/${product.name}.jpg`} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", display: "block", }} />

                    <Button icon="pi pi-shopping-cart" className="p-button-rounded"
                        style={{
                            position: "absolute", top: "35px", right: "35px", backgroundColor: "rgba(255, 255, 255, 0.8)",
                            border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex",
                            justifyContent: "center", alignItems: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.3)", zIndex: 20, display: show
                        }} onClick={() => addBasket(product)} />

                    <div style={{
                        position: "absolute", bottom: "70px", left: "40px", backgroundColor: "#B7C4CA", color: "white",
                        padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "1.1rem", zIndex: 10,
                    }}>
                        ₪{product.price}
                    </div>

                    <div style={{
                        position: "absolute", bottom: "35px", left: "35px", backgroundColor: "#B7C4CA", color: "white",
                        padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "1.1rem", zIndex: 10,
                    }}>
                        {product.name}
                    </div>
                    {/* <Button icon="pi pi-arrow-up-right-and-arrow-down-left-from-center" className='p-button-rounded' 
                    style={{position: "absolute", bottom: "50px", right: "40px", backgroundColor: "#B7C4CA", color: "white",
                        padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "1.1rem", zIndex: 10,}} onClick={()=>big(product)}></Button> */}

                    {/* <div className=""> */}
                    <Button
                        
                        icon="pi pi-external-link"
                        onClick={() => showDialog(product)}
                        style={{
                            position: "absolute",
                            bottom: "35px",
                            right: "35px",
                            backgroundColor: "#B7C4CA",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            zIndex: 10
                        }}
                    />
                    {/* </div> */}
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter" style={{ backgroundColor: "#fbf4ec" }}>{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };


    return (
        <>
            <Dialog  header={selectedProduct?.name || "פרטי מוצר"} visible={visible} style={{ width: '50vw', height: "70vh",backgroundColor:"#fbf4ec" }} contentStyle={{backgroundColor:"#fbf4ec"}} headerStyle={{backgroundColor:"#fbf4ec"}}
                onHide={() => setVisible(false)}>
                {selectedProduct && (
                    <>
                    <div style={{display:"flex",flexDirection:"row-reverse"}}>
                        <div style={{ width: "50%",direction:"rtl" }}>
                            <p><strong>קטגוריה:</strong> {selectedProduct.category}</p>
                            <p><strong>מחיר:</strong> ₪{selectedProduct.price}</p>
                            <p><strong>פירוט המוצר:</strong> {selectedProduct.description}</p>
                        </div>
                        <img src={`/images/${selectedProduct.name}.jpg`} alt={selectedProduct.name}
                            style={{ width: "50%", borderRadius: "10px", height: "100%" }}
                        /></div>
                    </>
                )}
            </Dialog>
            <div style={{ backgroundColor: "#fbf4ec" }}>
                <div className='categorieColor' >
                    <TabMenu model={items} style={{ backgroundColor: "#fbf4ec", color: "#fbf4ec", display: 'flex', justifyContent: 'center', direction: "rtl" }} activeIndex={index} onTabChange={send} />
                </div>
                <div style={{ height: "7vh", backgroundColor: "#fbf4ec" }}></div>

                <DataView value={products} style={{ backgroundColor: "#fbf4ec", color: "#fbf4ec" }} listTemplate={listTemplate} layout="grid" />
            </div>
        </>
    )
}
export default Product