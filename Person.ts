export class Person {
    constructor(
        protected _name: string,
        protected _address: string,
        protected _phone: string,
    ) {}

    public get name(): string {
        return this._name
    }

    public get address(): string {
        return this._address
    }

    public get phone(): string {
        return this.phone
    }

    public set name(name: string) {
        if (name.length < 3) {
            throw new Error('O nome deve ter no mínimo 3 caracteres')
        }
        this._name = name
    }

    public set address(address: string) {
        this._address = address
    }

    public set phone(phone: string) {
        this._phone = phone
    }
}
