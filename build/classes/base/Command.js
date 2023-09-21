export default class Command {
    //todo dm
    constructor(data, perms) {
        this.data = data;
        this.perms = perms;
    }
    async execute(client, interaction) {
        throw new Error("not Implemented");
    }
}
