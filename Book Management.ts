import promptSync from "prompt-sync"
import { Book } from "./Book"
import { Aux } from "./Aux";
import { writeFileSync } from 'fs';
import { books } from './Main';

const prompt = promptSync();
let option: string = '';

export function bookManagement(): void {
    option = '';
    while (option !== '0') {
        console.log('1 - Cadastrar Livro')
        console.log('2 - Listar Livros')
        console.log('3 - Editar Livro')
        console.log('4 - Excluir Livro')
        console.log('0 - Sair')
        option = prompt('Escolha uma opção: ')
        switch (option) {
            case '1':
                let title: string = prompt('Título: ')
                let author: string = prompt('Autor: ')
                let ISBN: string = prompt('ISBN: ')
                let publicationDate: Date = new Date(prompt('Ano de publicação: '))
                let id: string = Book.calculateId(books) //função auxiliar que incrementa o ID
                let book = new Book(title, author, ISBN, publicationDate, false, id)
                books.push(book)
                writeFileSync('./data/books.json', JSON.stringify(books))
                break
            case '2':
                console.table(books.map(book => book.listBook()))
                break
            case '3':
                while (true) {
                    console.table(books.map(book => book.listBook()))
                    let bookId: string = prompt('ID do livro que deseja editar (0 para voltar): ');
                    let bookIndex = Aux.findBookIndex(books, bookId);
                    if (bookIndex === -2) {
                        break;
                    } else if (bookIndex === -1) {
                        continue;
                    }
                    console.table(books[bookIndex].listBook())
                    while (option !== '0') {
                        console.log('1 - Editar Título')
                        console.log('2 - Editar Autor')
                        console.log('3 - Editar ISBN')
                        console.log('4 - Editar Data de Publicação')
                        console.log('0 - Sair')
                        option = prompt('Escolha uma opção: ')
                        switch (option) {
                            case '1':
                                books[bookIndex].title = prompt('Título: ')
                                break
                            case '2':
                                books[bookIndex].author = prompt('Autor: ')
                                break
                            case '3':
                                books[bookIndex].ISBN = prompt('ISBN: ')
                                break
                            case '4':
                                books[bookIndex].publicationDate = new Date(prompt('Ano de publicação: '))
                                break
                            case '0':
                                console.log('Voltando ao menu anterior...')
                                break
                            default:
                                console.log('Opção inválida')
                                break
                        }
                    }
                }
                writeFileSync('./data/books.json', JSON.stringify(books))
                break
            case '4':
                while (true) {
                    console.table(books.map(book => book.listBook()))
                    let bookId: string = prompt('ID do livro que deseja excluir (0 para sair): ');
                    let bookIndex = Aux.findBookIndex(books, bookId);
                    if (bookIndex === -2) {
                        break;
                    } else if (bookIndex === -1) {
                        continue;
                    }
                    books.splice(bookIndex, 1);
                    console.log('Livro excluído com sucesso');
                }
                writeFileSync('./data/books.json', JSON.stringify(books))
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