
export class ValidationError extends Error {
  constructor(message:string) {
    super(message)
    this.name = "ValidationError"
  }
}

export class NoEventsProvided extends Error{
  constructor(message:string){
    super(message)
    this.name = "NoEventsProvided"
  }
}