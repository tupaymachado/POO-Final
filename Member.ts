import { Person } from "./Person";

export class Member extends Person {
    private _registration: string;

    constructor(name: string, address: string, phone: string, registration: string) {
        super(name, address, phone); // Replace the arguments with appropriate values for name, address, and phone
        this._registration = registration;
    }

    public get registration(): string {
        return this._registration;
    }

    public set name(name: string) {
        if (name.length < 3) {
            throw new Error('Name must have at least 3 characters');
        }
        this._name = name;
    }

    public set address(address: string) {
        this._address = address;
    }

    public set phone(phone: string) {
        this._phone = phone;
    }

    public listMember(): object {
        const {
            _name: name,
            _address: address,
            _phone: phone,
            _registration: registration,
        } = this;
        return { name, address, phone, registration };
    }

    public static calculateId(members: Member[]): string {
        //verificar todos os IDs e incrementar o maior
        let id = '0';
        for (let member of members) {
            if (parseInt(member.registration) > parseInt(id)) {
                id = member.registration;
            }
        }
        return (parseInt(id) + 1).toString();
    }
}