import { Loan } from './Lending';
import { Aux } from './Aux';
import promptSync from 'prompt-sync';
import { Book } from './Book';
import { members } from './Main';
import { loans } from './Main';
import { Member } from './Member';
import { writeFileSync } from 'fs';
import { books } from './Main';

const prompt = promptSync();
let option: string = '';

export function lendingManagement(): void {
    option = '';
    while (option !== '0') {
        console.log('1 - Emprestar Livro')
        console.log('2 - Devolver Livro')
        console.log('3 - Listar Empréstimos')
        console.log('0 - Sair')
        option = prompt('Escolha uma opção: ')
        switch (option) {
            case '1':
                let bookId: string;
                let bookLoaned: Book | undefined = undefined; // Initialize with undefined
                while(true) {
                    bookId = prompt('ID do livro (0 para sair): ');
                    let bookIndex = Aux.findBookIndex(books, bookId);
                    if (bookIndex === -2) {
                        break;
                    } else if (bookIndex === -1) {
                        console.log('Livro não encontrado');
                        continue;
                    }
                    if (books[bookIndex].isLeased) {
                        console.log('Livro já emprestado');
                        continue;
                    }
                    bookLoaned = books[bookIndex];
                    break;
                }
                let memberId: string;
                let memberLoaning: Member | undefined = undefined; // Initialize with undefined
                while(true) {
                    memberId = prompt('ID do membro (0 para sair): ');
                    let memberIndex = Aux.findMemberIndex(members, memberId);
                    if (memberIndex === -2) {                        
                        break;
                    } else if (memberIndex === -1) {
                        console.log('Membro não encontrado');
                        continue;
                    }
                    memberLoaning = members[memberIndex];
                    break;
                }
                if (bookLoaned === undefined || memberLoaning === undefined) {
                    break;
                }
                let lendingDate: Date = new Date();
                let returnDate: Date = Loan.returnDate(); //função estática que retorna a data de devolução
                let id: string = Loan.calculateId(loans) //função auxiliar que incrementa o ID
                let loan = new Loan(bookLoaned!, memberLoaning!, lendingDate, returnDate, false, id) // Uso do operador de asserção de não nulo
                bookLoaned!.isLeased = true;
                loans.push(loan)
                writeFileSync('./data/books.json', JSON.stringify(books))
                writeFileSync('./data/loans.json', JSON.stringify(loans))
                break
            case '2':
                while (true) {
                    console.table(loans.map(loan => loan.listLoan()))
                    let loanId: string = prompt('ID do empréstimo que deseja devolver (0 para voltar): ');
                    let loanIndex = Aux.findLoanIndex(loans, loanId);
                    if (loanIndex === -2) {
                        break;
                    } else if (loanIndex === -1) {
                        continue;
                    }
                    loans[loanIndex].isReturned = true; //marcar book como devolvido no empréstimo
                    console.log('loans[loanIndex].bookId: ', loans[loanIndex].bookId);
                    let bookIndex = Aux.findBookIndex(books, loans[loanIndex].bookId);
                    books[3].isLeased = false; //marcar book como disponível no books
                    console.log('Livro devolvido com sucesso!');
                    break;
                }
                writeFileSync('./data/books.json', JSON.stringify(books))
                writeFileSync('./data/loans.json', JSON.stringify(loans))
                break
            case '3':
                console.table(loans.map(loan => loan.listLoan()))    
                break
            case '0':
                console.log('Saindo...')
                break
            default:
                console.log('Opção inválida')
                break
        }
    }
}