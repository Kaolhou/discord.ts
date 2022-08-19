import { SlashCommandBuilder } from "@discordjs/builders"
import { /*TextChannel, MessageReaction,*/ Interaction, Client, User, GuildMember } from "discord.js"
import { CommandI } from "../utils/types"

type ttcNum = 0 | -1 | 1
interface Tictactoe{
    board: [
        [ttcNum,ttcNum,ttcNum],
        [ttcNum,ttcNum,ttcNum],
        [ttcNum,ttcNum,ttcNum],
    ]
}
class Tictactoe implements Tictactoe{
    constructor(p1:User, p2:User|GuildMember, interaction:Interaction, client:Client){
        this.board = [[0,0,0],
                      [0,0,0],
                      [0,0,0]]
    }
    public render(){
        for(let i=0;i<3;i++){//row
            let row = ''
            for(let j=0;j<3;j++){//column
                if (this.board[i][j] == 0){
                    row.concat(' _ ')
                }else if(this.board[i][j]==1){
                    row.concat(' X ')
                }else if(this.board[i][j]==-1){
                    row.concat(' O ')
                }
                console.log(row)
            }
            //console.log(row)
        }
    }
    private win(){

    }
    public game(){

    }
}

const tictactoe:CommandI = {
    exe: async function(interaction, client){

        const ms = 1000 * 60 * 3 //tres minutos

        const player1 = interaction.user
        const player2 = interaction.options.getMentionable('user') // mentionated user

        //const Filter = (reaction,user)=>
        
        await interaction.channel?.send({content:`${player2}, por favor reaja a essa mensagem para poder jogar`,})
        .then(async(msg)=>{
            await msg?.react('✅')
            return msg?.awaitReactions(
                {
                    max: 1, 
                    time: 30000, 
                    errors: ["time"], 
                    filter:
                        (reaction, userR) => {
                            return userR.id == player2?.valueOf() && reaction.emoji.name =="✅"}
                }
            ).then((collected)=>{
                //local onde o jogo começa
                // console.log(collected)
                if(player2 instanceof GuildMember){
                    const game = new Tictactoe(player1,player2, interaction, client)
                    game.render()
                }
            })
        }).catch((e)=>{
            console.log(e)
        })
        



        await new Promise(r => setTimeout(r, ms))

    },
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('start a tictactoe game')
        .addMentionableOption(
            option => option
                .setName('user')
                .setDescription('User to play with')
                .setRequired(true)
        )
}
export default tictactoe