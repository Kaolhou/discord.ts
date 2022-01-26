export default interface DB{
    sequelize:any,
    increment: (message:any)=>Promise<void>
}