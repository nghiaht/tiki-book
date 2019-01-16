class Book {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    /**
     * Get books
     * @param limit
     * @param offset
     * @param order
     * @returns {Promise<any>}
     */
    getBooks({limit, offset, order}) {
        return new Promise((resolve, reject) => {
            this.apiClient.get('/api/Books', {
                params: {
                    filter: {
                        limit,
                        offset,
                        order
                    }
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(new Error(error.message));
            })
        })
    }

    /**
     * Get a book by id
     * @param id
     * @returns {Promise<any>}
     */
    getBook({id}) {
        return new Promise((resolve, reject) => {
            this.apiClient.get(`/api/Books/${id}`).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(new Error(error.message));
            })
        })
    }

    /**
     * Create book
     * @param title
     * @param description
     * @param categories
     * @param cover
     * @returns {Promise<any>}
     */
    createBook({title, description, categories, cover}) {
        return new Promise((resolve, reject) => {
            this.apiClient.post('/api/Books',
                {
                    title,
                    description,
                    categories,
                    cover
                }
            ).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(new Error(error.message));
            })
        })
    }

    /**
     * Update book
     * @param id
     * @param title
     * @param description
     * @param categories
     * @returns {Promise<any>}
     */
    updateBook({id, title, description, categories}) {
        return new Promise((resolve, reject) => {
            this.apiClient.put(`/api/Books/${id}`,
                {
                    title,
                    description,
                    categories
                }
            ).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(new Error(error.message));
            })
        })
    }

    /**
     * Delete book
     * @param id
     * @returns {Promise<any>}
     */
    deleteBook({id}) {
        return new Promise((resolve, reject) => {
            this.apiClient.delete(`/api/Books/${id}`).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(new Error(error.message));
            })
        })
    }
}

export default Book;