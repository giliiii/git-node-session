export const ProductService = {
        getProductsData() {
            return [
                 {
                    itemImageSrc: '/enter/טבלאות.jpg',
                    thumbnailImageSrc: '/enter/טבלאות.jpg',
                    alt: 'Description for Image 1',
                    title: 'טבלאות'
                },
                {
                    itemImageSrc: '/enter/מארזים.jpg',
                    thumbnailImageSrc: '/enter/מארזים.jpg',
                    alt: 'Description for Image 2',
                    title: 'מארזים'
                },
                {
                    itemImageSrc: '/enter/מיוחדים.jpg',
                    thumbnailImageSrc: '/enter/מיוחדים.jpg',
                    alt: 'Description for Image 3',
                    title: 'מיוחדים'
                },
                {
                    itemImageSrc: '/enter/שוקולדים.jpg',
                    thumbnailImageSrc: '/enter/שוקולדים.jpg',
                    alt: 'Description for Image 4',
                    title: 'שוקולדים'
                },
                {
                    itemImageSrc: '/enter/מקרונים.jpg',
                    thumbnailImageSrc: '/enter/מקרונים.jpg',
                    alt: 'Description for Image 5',
                    title: 'מקרונים'
                },
               
            ];
        },

        getProductsMini() {
            return Promise.resolve(this.getProductsData().slice(0, 5));
        },

        getProductsSmall() {
            return Promise.resolve(this.getProductsData().slice(0, 10));
        },

        getProducts() {
            return Promise.resolve(this.getProductsData());
        },

        getProductsWithOrdersSmall() {
            return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
        },

        getProductsWithOrders() {
            return Promise.resolve(this.getProductsWithOrdersData());
        }
    };

    