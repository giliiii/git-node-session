
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService2 } from '../../service/ProductService2';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axios from 'axios';


const Manager = () => {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const toastTopCenter = useRef(null);

    useEffect(() => {
        fanc()
    }, []);

    const fanc = async () => {
        try {
            const res = await axios.get("http://localhost:44444/api/product")
            if (res.status === 200) {
                setProducts(res.data)
            }
        }
        catch (e) {
            alert(e.response.data)
        }
    }

    const showMessage = (event, ref, severity) => {
        const label = event;
        ref.current.show({ severity: severity, detail: label, life: 3000 });
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);
                _products[index] = _product;
                try {
                    const user = localStorage.getItem("userToken")
                    const res = await axios.put("http://localhost:44444/api/product/update", { _id: _product.id, name: _product.name, price: _product.price, category: _product.category, quantity: _product.quantity, picture: _product.picture, describe: _product.description },
                        {
                            headers: {
                                Authorization: `Bearer ${user}`
                            }
                        }
                    )
                    if (res.status === 200) {
                        _products[index] = res.data;
                        fanc()
                        setProducts(_products);
                        setProductDialog(false);
                        setProduct(emptyProduct);
                        toast.current.show({ severity: 'info', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    }
                }
                catch (e) {
                    showMessage(e.response.data, toastTopCenter, 'info')
                }

            } else {
                try {
                    // _product.image = 'product-placeholder.svg';

                    const user = localStorage.getItem("userToken")
                    // const res = await axios.post("http://localhost:1234/api/products", { name: _product.name, price: _product.price, kategory: _product.category, describe: _product.description, quentity: _product.quantity },
                    const res = await axios.post("http://localhost:44444/api/product/create", { _id: _product.id, name: _product.name, price: _product.price, category: _product.category || product.category, quantity: _product.quantity, describe: _product.description },

                        {
                            headers: {
                                Authorization: `Bearer ${user}`
                            }
                        }
                    )
                    if (res.status === 200 || res.status === 266) {
                        const newProduct = { ...res.data, id: res.data._id };
                        _products.push(newProduct);
                        fanc()
                        setProducts(_products);
                        setProductDialog(false);
                        setProduct(emptyProduct);
                        toast.current.show({ severity: 'info', summary: 'Successful', detail: 'Product Created', life: 3000 });
                    }
                }

                catch (e) {
                    showMessage(e.response.data, toastTopCenter, 'info')
                }
                setProductDialog(false);

            }
        }
    };

    const editProduct = (product) => {
        const normalized = { ...product, id: product._id || product.id };
        setProduct(normalized);
        setProductDialog(true);
    };

    const confirmDeleteProduct = async (product) => {
        setProduct(product);
        try {
            const user = localStorage.getItem("userToken")
            // const res = await axios.delete(`http://localhost:1234/api/products/${product._id}`,
            const res = await axios.delete(`http://localhost:44444/api/product/${product._id}`,

                {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                }
            )
            if (res.status === 200) {
                fanc()
            }
        }
        catch (e) {
            showMessage(e.response.data, toastTopCenter, 'info')
        }
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'info', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button style={{ backgroundColor: "#b7c4ca", border: 'none' }} label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const imageBodyTemplate = (product) => {
        return <img src={`/images/${product.name}.jpg`} alt={product.name} className="shadow-2 border-round" style={{ width: '14vh' }} />;
    };

    const categoryBodyTemplate = (rowData) => {

        return (rowData.kategory);
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded text onClick={() => editProduct(rowData)}></Button>
                <Button icon="pi pi-times" rounded text onClick={() => confirmDeleteProduct(rowData)}></Button>
            </React.Fragment>
        );
    };


    const search = () => {
        return (
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText style={{ backgroundColor: "#b7c4ca" }} type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        )
    };
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );
    return (
        <div style={{ backgroundColor: '#fbf4ec', minHeight: '100vh', padding: '1rem' }}>
            <Toast ref={toast} />
            <Toast ref={toastTopCenter} position="top-center" />
                <Toolbar style={{ backgroundColor: "#fbf4ec" }} left={leftToolbarTemplate} right={search}></Toolbar>
                <DataTable style={{ backgroundColor: "red" }} ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} >
                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    {/* <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="image" body={imageBodyTemplate} style={{ backgroundColor: '#fbf4ec' }}></Column>
                    <Column field="name" sortable style={{ minWidth: '16rem', backgroundColor: '#fbf4ec' }}></Column>
                    <Column field="price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem', backgroundColor: '#fbf4ec' }}></Column>
                    <Column field="category" body={categoryBodyTemplate} sortable style={{ minWidth: '10rem', backgroundColor: '#fbf4ec' }}></Column>
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column style={{ backgroundColor: '#fbf4ec' }} body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
         

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`/images/${product.name}.jpg`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="טבלאות" onChange={onCategoryChange} checked={product.category === 'טבלאות'} />
                            <label htmlFor="category1">טבלאות</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="מיוחדים" onChange={onCategoryChange} checked={product.category === 'מיוחדים'} />
                            <label htmlFor="category2">מיוחדים</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="שוקולדים" onChange={onCategoryChange} checked={product.category === 'שוקולדים'} />
                            <label htmlFor="category3">שוקולדים</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="מארזים" onChange={onCategoryChange} checked={product.category === 'מארזים'} />
                            <label htmlFor="category4">מארזים</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category5" name="category" value="מקרונים" onChange={onCategoryChange} checked={product.category === 'מקרונים'} />
                            <label htmlFor="category5">מקרונים</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    )
}

export default Manager

