import { bookManagement } from "./Book Management";
import { memberManagement } from "./Member Management";
import { lendingManagement } from "./Lending Management";
import { readFileSync } from 'fs';
import { Book } from './Book';
import { Member } from './Member';
import { Loan } from './Lending';
import promptSync from 'prompt-sync';

export let books: Book[];
export let members: Member[];
export let loans: Loan[];

function readBooksFile(): void {
    let data: string = readFileSync('./data/books.json', {encoding: 'utf-8'});
    let booksData = JSON.parse(data);
    // Mapeia cada objeto JSON para uma instância da classe Book
    books = booksData.map((bookData: any) => new Book(
        bookData._title, 
        bookData._author, 
        bookData._ISBN, 
        bookData._publicationDate, 
        bookData._isLeased, 
        bookData._id
    ));
}
readBooksFile();

function readMembersFile(): void {
    let data: string = readFileSync('./data/members.json', {encoding: 'utf-8'});
    let membersData = JSON.parse(data);
    // Mapeia cada objeto JSON para uma instância da classe Member
    members = membersData.map((memberData: any) => new Member(
        memberData._name, 
        memberData._address, 
        memberData._phone, 
        memberData._registration
    ));
}
readMembersFile();

function readLoansFile(): void {
    let data: string = readFileSync('./data/loans.json', {encoding: 'utf-8'});
    let loansData = JSON.parse(data);
    // Mapeia cada objeto JSON para uma instância da classe Loan
    loans = loansData.map((loanData: any) => new Loan(
        loanData._book, 
        loanData._member, 
        loanData._lendingDate, 
        loanData._returnDate, 
        loanData._isReturned, 
        loanData._id
    ));
}
readLoansFile();

const prompt = promptSync();
let option: string = '';

while(option !== '0') {
    console.log('1 - Gerenciamento de Livros')
    console.log('2 - Gerenciamento de Membros')
    console.log('3 - Gerenciamento de Empréstimos')
    console.log('0 - Sair')
    option = prompt('Escolha uma opção: ')
    switch (option) {
        case '1':
            bookManagement();
            break;
        case '2':
            memberManagement();
            break;
        case '3':
            lendingManagement();
            break;
        case '0':
            console.log('Saindo...')
            break;
        default:
            console.log('Opção inválida')
            break;
    }
}