import Book from './book';

export default function createRootApi(apiClient) {
    return {
        book: new Book(apiClient)
    }
}