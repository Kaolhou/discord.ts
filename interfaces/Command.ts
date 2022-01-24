export default interface Command{
    name: string
    description: string,
    run:(channel:any, args:string)=>Promise<any>
}