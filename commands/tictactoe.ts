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
    vez:boolean;
    interaction:Interaction;
    client:Client;
    p1:any;//todo subsituir
    p2:any;
    
}
class Tictactoe implements Tictactoe{
    constructor(p1:User, p2:User|GuildMember, interaction:Interaction, client:Client){
        //declaração de variáveis da classe
        interaction;client;p1;p2;
        this.board = [[0,0,0],
                      [0,0,0],
                      [0,0,0]]
        /**
         * true  -> player 1
         * false -> player 2
         */
        this.vez = true
    }
    public render(rodada:number){
        //return a string to be send to discord
        const table = [`vez do jogador: ${rodada%2}`]
        for(let i=0;i<3;i++){//row
            let row = ''
            for(let j=0;j<3;j++){//column
                if (this.board[i][j] == 0){
                    row+=':blue_square:'
                }else if(this.board[i][j]==1){
                    row+=':x:'
                }else if(this.board[i][j]==-1){
                    row+=':o:'
                }
            }
            table.push(row)
        }
        return table.join('\n')
    }
    public keepPlaying(){
        //verificando linhas
        for(let i=0;i<3;i++){
            let soma = this.board[i][0]+this.board[i][1]+this.board[i][2]
            if(soma==3||soma==-3){
                return false
            }
        }
        //verificando colunas
        for(let i=0;i<3;i++){
            let soma = this.board[0][i]+this.board[1][i]+this.board[2][i]
            if(soma==3||soma==-3){
                return false
            }
        }
        //verificando diagonais
        let d1 = this.board[0][0]+ this.board[1][1]+ this.board[2][2]
        let d2 = this.board[0][2]+ this.board[1][1]+ this.board[2][0]
        if(d1==3||d1==-3||d2==3||d2==-3){
            return false
        }
        return true

    }
    public game(){
        
    }
}

const tictactoe:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            
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
                ).then(async(/*collected*/)=>{
                    await msg.delete()
                    //local onde o jogo começa
                    if(player2 instanceof GuildMember){
                        const game = new Tictactoe(player1,player2, interaction, client)
                        let rodada = 0
                        console.log(game.keepPlaying())
                        while(game.keepPlaying()){
                            //
                            let gameMsg = await interaction.channel?.send(game.render(rodada))
                            await gameMsg?.react('⬅️')
                            await gameMsg?.react('↖️')
                            await gameMsg?.react('⬆️')
                            await gameMsg?.react('↗️')
                            await gameMsg?.react('➡️')
                            await gameMsg?.react('↘️')
                            await gameMsg?.react('⬇️')
                            await gameMsg?.react('↙️')
                            await gameMsg?.react('⏺️')
                            let adsas = await gameMsg?.awaitReactions(
                                {
                                    max: 1, 
                                    time: 30000, 
                                    errors: ["time"], 
                                    filter:
                                        (reaction, userR) => {
                                            return userR.id == (rodada%2==0 ? player1.id : player2.id)}
                                }
                            )
                            console.log(adsas?.toJSON()[0].emoji.name)//* esse é o formato para achar o nome do emoji
                            // switch(){
                            //     case
                            // }
                            
                        }

                        
                    }
                })
            }).catch((e)=>{
                console.log(e)
            })
            await new Promise(r => setTimeout(r, ms))

        }
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