import { Book } from './Book';
import { Member } from './Member';
import { loans } from './Main';

export class Loan {
    constructor(
        private _book: Book,
        private _member: Member,
        private _lendingDate: Date,
        private _returnDate: Date,
        private _isReturned: boolean,
        private _id: string,
    ) { }

    public get id(): string {
        return this._id;
    }

    public get isReturned(): boolean {
        return this._isReturned;
    }

    public set isReturned(isReturned: boolean) {
        this._isReturned = isReturned
    }

    public static returnDate(): Date {
        let returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 7);
        return returnDate;
    }

    public get bookId(): string {
        return this._book.bookId;
    }

    public listLoan(): object { //Limpa o nome dos atributos para o retorno
        const {
            _book: book,
            _member: member,
            _lendingDate: lendingDate,
            _returnDate: returnDate,
            _isReturned: isReturned,
            _id: id
        } = this;
        return { book, member, lendingDate, returnDate, isReturned, id };
    }

    public static calculateId(loans: Loan[]): string {
        //verificar todos os IDs e incrementar o maior
        let id = '0';
        for (let loan of loans) {
            if (parseInt(loan.id) > parseInt(id)) {
                id = loan.id;
            }
        }
        return (parseInt(id) + 1).toString();
    }

}