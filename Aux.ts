export class Aux {
    public static findBookIndex(books: Array<{bookId: string}>, bookId: string): number {
        if (bookId === '0') {
            return -2; 
        }
        let bookIndex: number = books.findIndex(book => book.bookId === bookId);
        if (bookIndex === -1) {
            console.log('Livro não encontrado');
            return -1;
        }
        return bookIndex;
    }

    public static findMemberIndex(members: Array<{registration: string}>, registration: string): number {
        if (registration === '0') {
            return -2; 
        }
        let memberIndex: number = members.findIndex(member => member.registration === registration);
        if (memberIndex === -1) {
            console.log('Membro não encontrado');
            return -1;
        }
        return memberIndex;
    }

    public static findLoanIndex(loans: Array<{id: string}>, id: string): number {
        if (id === '0') {
            return -2; 
        }
        let loanIndex: number = loans.findIndex(loan => loan.id === id);
        if (loanIndex === -1) {
            console.log('Empréstimo não encontrado');
            return -1;
        }
        return loanIndex;
    }
}