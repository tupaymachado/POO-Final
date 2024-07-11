export class Book {
    constructor(
        private _title: string,
        private _author: string,
        private _ISBN: string,
        private _publicationDate: Date,
        private _isLeased: boolean,
        private _id: string,
    ) {}

    public get bookId(): string {
        return this._id
    }

    public get title(): string {
        return this._title
    }

    public get isLeased(): boolean {
        return this._isLeased
    }

    public set title(title: string) {
        if (title.length < 3) {
            throw new Error('Author name must have at least 3 characters')
        }
        this._title = title
    }

    public set author(author: string) {
        if (author.length < 3) {
            throw new Error('Author name must have at least 3 characters')
        }
        this._author = author
    }

    public set ISBN(ISBN: string) {
        this._ISBN = ISBN
    }

    public set publicationDate(publicationDate: Date) {
        this._publicationDate = publicationDate
    }

    public set isLeased(isLeased: boolean) {
        this._isLeased = isLeased
    }

    public set id(id: string) {
        this._id = id
    }

    public listBook() {
        return this;
    }

    public static calculateId(books: Book[]): string {
        //verificar todos os IDs e incrementar o maior
        let id = '0';
        for (let book of books) {
            if (parseInt(book.bookId) > parseInt(id)) {
                id = book.bookId;
            }
        }
        return (parseInt(id) + 1).toString();
    }
}