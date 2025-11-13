import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MyBasket = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const getData = async () => {
    try{
    const user = localStorage.getItem("userToken")
    if(user===null)
      setProducts({})
    const res = await axios.get("http://localhost:44444/api/basket/my",
      {
        headers: {
          Authorization: `Bearer ${user}`
        }
      })
    // const res2=await axios.get("http://localhost:1234/api/products",{params:{id:res.product}})
    // alert(res2.name)
    setProducts(res.data)}
    catch(e){
      alert(e.response.data)
    }
  }


  useEffect(() => {
    getData();
  }, []);

  const Productname = (product) => {
    return product.name;
  };
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const imageBodyTemplate = (product) => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={`/images/${product.name}.jpg`} alt={product.image} className="w-6rem shadow-2 border-round" />
        </div>
      </>)
  };

  const priceBodyTemplate = (product) => {
    return product && product.price ? formatCurrency(product.price) : "לא זמין";
  };

  const quantityProduct = (product) => {
    return product && product.quantity;
  }

  // const ratingBodyTemplate = (product) => {
  //     return <Rating value={product.name} readOnly cancel={false} />;
  // };

  // const statusBodyTemplate = (product) => {
  //     return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
  // };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const minus = async (product) => {
    try {
      const user = localStorage.getItem("userToken")
      const res = await axios.delete("http://localhost:44444/api/basket/delete", {
        headers: {
          'Authorization': `Bearer ${user}`
        }, data: { _id: product.product },
      });
      if (res.status === 200) {
        getData();
      }
    }
    catch (e) {
    }
  }

  const plus = async (product) => {
    try {
      console.log(product);
      const user = localStorage.getItem("userToken")
      const res = await axios.post("http://localhost:44444/api/basket/add", { _id: product.product },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      if (res.status === 200) {
        getData();
      }
    }
    catch (e) {
      alert(e)
      alert(e.response.data)
    }
  }

  const buyNow =  () => {
 alert("הקניה בוצעה בהצלחה, ניצור איתך קשר")
};

  const deleteAllThisProd = async (product) => {
    try {
      const user = localStorage.getItem("userToken")
      const res = await axios.delete("http://localhost:44444/api/basket/delproduct", {
        headers: {
          'Authorization': `Bearer ${user}`
        }, data: { _id: product.product },
      });
      if (res.status === 200) {
        getData()
      }
    }
    catch (e) {
      alert(e.response.data)
    }
  }


  const quantityTemplate = (product) => {
    return (
      <div className="flex align-items-center gap-2 ">
        <Button style={{ color: "#83c8e8ff" }} icon="pi pi-minus" rounded text onClick={() => minus(product)} />
        <div className="text-xl w-3rem text-center">{product.quantity}</div>
        <Button style={{ color: "#83c8e8ff" }} icon="pi pi-plus" rounded text onClick={() => plus(product)} />
      </div>
    );
  };

  const deleteAll = (product) => {
    return (
      <>
        <Button icon="pi pi-times" style={{ color: "#83c8e8ff" }} text onClick={() => deleteAllThisProd(product)}></Button>
      </>
    );
  };
  const moreshop=()=>{
    navigate('/all/product') 
  }

  // const footer = `In total there are ${products ? products.length : 0} products.`;
  return (
    <div >
      <div style={{ backgroundColor: '#fbf4ec', minHeight: '7vh', padding: '1rem' }} />
      <DataTable value={products} tableStyle={{ minWidth: '60rem' }} showHeaders={false} className="tableColor">
        <Column style={{ width: '20%' }} body={imageBodyTemplate}></Column>
        <Column style={{ width: '20%' }} field="name" body={Productname}></Column>
        <Column style={{ width: '20%' }} field="price" body={priceBodyTemplate}></Column>
        <Column style={{ width: '20%' }} body={quantityTemplate}>
        </Column>
        <Column style={{ width: '20%' }} body={deleteAll}></Column>
        {/* <Column field="category" header="Category"></Column>
                <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
                <Column header="Status" body={statusBodyTemplate}></Column> */}
      </DataTable>
      <div className="card flex justify-content-center" style={{backgroundColor:"#fbf4ec",display:"flex",gap:"5%"}}>
            <Button label="המשך קניות" style={{backgroundColor:"#b7c4ca",border:"none", color:"#fbf4ec"}}  onClick={()=>{{moreshop()}}}/>
             <Button label="קנה עכשיו" style={{backgroundColor:"#b7c4ca",border:"none", color:"#fbf4ec"}} onClick={()=>{buyNow()}} />
        </div>
    </div>
  )
}

export default MyBasket
