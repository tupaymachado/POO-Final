import promptSync from "prompt-sync"
import { Member } from "./Member"
import { members } from './Main';
import { Aux } from "./Aux";
import { writeFileSync } from 'fs';

const prompt = promptSync();
let option: string = '';

export function memberManagement(): void {
    option = '';
    while (option !== '0') {
        console.log('1 - Cadastrar Membro')
        console.log('2 - Listar Membros')
        console.log('3 - Editar Membro')
        console.log('4 - Excluir Membro')
        console.log('0 - Sair')
        option = prompt('Escolha uma opção: ')
        switch (option) {
            case '1':
                let name: string = prompt('Nome: ')
                let address: string = prompt('Endereço: ')
                let phone: string = prompt('Telefone: ')
                let registration: string = Member.calculateId(members) //função auxiliar que incrementa o ID
                let member = new Member(name, address, phone, registration)
                members.push(member)
                writeFileSync('./data/members.json', JSON.stringify(members))
                break
            case '2':
                console.table(members.map(member => member.listMember()))
                break
            case '3':
                while (true) {
                    console.table(members.map(member => member.listMember()))
                    let registration: string = prompt('ID do membro que deseja editar (0 para voltar): ');
                    let memberIndex = Aux.findMemberIndex(members, registration);
                    if (memberIndex === -2) {
                        break;
                    } else if (memberIndex === -1) {
                        continue;
                    }
                    console.table(members[memberIndex].listMember())
                    while (option !== '0') {
                        console.log('1 - Editar Nome')
                        console.log('2 - Editar Endereço')
                        console.log('3 - Editar Telefone')
                        console.log('0 - Sair')
                        option = prompt('Escolha uma opção: ')
                        switch (option) {
                            case '1':
                                members[memberIndex].name = prompt('Nome: ')
                                break
                            case '2':
                                members[memberIndex].address = prompt('Endereço: ')
                                break
                            case '3':
                                members[memberIndex].phone = prompt('Telefone: ')
                                break
                        }
                    }
                }
                writeFileSync('./data/members.json', JSON.stringify(members))
                break
            case '4':
                while (true) {
                    console.table(members.map(member => member.listMember()))
                    let registration: string = prompt('ID do membro que deseja excluir (0 para sair): ');
                    let memberIndex = Aux.findMemberIndex(members, registration);
                    if (memberIndex === -2) {
                        break;
                    } else if (memberIndex === -1) {
                        continue;
                    }
                    members.splice(memberIndex, 1)
                }
                writeFileSync('./data/members.json', JSON.stringify(members))
                break
        }
    }
}