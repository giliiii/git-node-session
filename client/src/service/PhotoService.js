export const PhotoService = {
        getData() {
            return [
                {
                    itemImageSrc: '/enter/enter1.jpg',
                    thumbnailImageSrc: '/enter/enter1.jpg',
                    alt: 'Description for Image 1',
                    title: 'enter1'
                },
                {
                    itemImageSrc: '/enter/enter2.jpg',
                    thumbnailImageSrc: '/enter/enter2.jpg',
                    alt: 'Description for Image 2',
                    title: 'enter2'
                },
                {
                    itemImageSrc: '/enter/enter3.jpg',
                    thumbnailImageSrc: '/enter/enter3.jpg',
                    alt: 'Description for Image 3',
                    title: 'enter3'
                },
                {
                    itemImageSrc: '/enter/enter4.jpg',
                    thumbnailImageSrc: '/enter/enter.jpg',
                    alt: 'Description for Image 4',
                    title: 'enter4'
                },
               
            ];
        },

        getImages() {
            return Promise.resolve(this.getData());
        }
    };

    