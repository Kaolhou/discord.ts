import { CommandInteraction, User } from "discord.js";
import Main from "./Main";



class Uno{


  public readonly guildId;
  public turn
  public way: 1 | -1;
  constructor(client:Main,interaction:CommandInteraction,players:User[]){
    this.guildId = client;
    this.turn = 0
    this.way = 1
  }
  skip(){
    
  }

  render(){

  }

  resolvePendencies(){

  }

  play(){

  }


}

export default Uno