export class Beneficiaries {
    id: string;
    name: string;
    accountnumber: number;
    bank: string;
    

    constructor(id: string,
        name: string,
        accountnumber: number,
        bank: string,
    ) {
        this.id = id;
        this.name = name;
        this.accountnumber = accountnumber;
        this.bank = bank;
    }
}
