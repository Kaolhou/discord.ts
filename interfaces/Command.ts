export default interface Command{
    name: string
    description: string,
    run:(message:any, args:string)=>Promise<any>
}