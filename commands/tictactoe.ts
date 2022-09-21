import { SlashCommandBuilder } from "@discordjs/builders"
import { GuildMember } from "discord.js"
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
    constructor(){
        //declaração de variáveis da classe
        this.board = [[0,0,0],
                      [0,0,0],
                      [0,0,0]]
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
    isVelha():boolean{
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(this.board[i][j]==0) return false
            }
        }
        return true
    }
}

const tictactoe:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            
            const ms = 1000 * 60 * 3 //tres minutos

            const player1 = interaction.user
            const player2 = interaction.options.getMentionable('user') // mentionated user
            if(player2 instanceof GuildMember){
                await interaction.channel?.send({content:`${player2}, por favor reaja a essa mensagem para poder jogar`,})
                .then(async(msg)=>{
                    await msg?.react('✅')
                    return msg?.awaitReactions(
                        {
                            max: 1, 
                            time: ms, 
                            errors: ["time"], 
                            filter:
                                (reaction, userR) => {
                                    return userR.id == player2?.valueOf() && reaction.emoji.name =="✅"}
                        }
                    ).then(async(/*collected*/)=>{
                        await msg.delete()
                        //local onde o jogo começa
                        if(player2 instanceof GuildMember){
                            if(client.users.cache.get(player2.id)?.bot){
                                return await interaction.reply({
                                    content:'cannot play with bots',
                                    ephemeral: true
                                })
                            }
                            const game = new Tictactoe()
                            let rodada = 0
                            while(game.keepPlaying()){
                                while(!game.isVelha()){
                                    let vez = rodada%2==0 ? player1 : player2
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
                                            time: ms, 
                                            errors: ["time"], 
                                            filter:
                                                (reaction, userR) => 
                                                    userR.id == vez.id//(rodada%2==0 ? player1.id : player2.id)
                                                
                                        }
                                    )
                                    switch(adsas?.toJSON()[0].emoji.name){
                                        case '↖️':
                                            game.board[0][0]==0?
                                            game.board[0][0]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '⬆️':
                                            game.board[0][1]==0?
                                            game.board[0][1]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '↗️':
                                            game.board[0][2]==0?
                                            game.board[0][2]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '⬅️':
                                            game.board[1][0]==0?
                                            game.board[1][0]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '⏺️':
                                            game.board[1][1]==0?
                                            game.board[1][1]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '➡️':
                                            game.board[1][2]==0?
                                            game.board[1][2]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '↙️':
                                            game.board[2][0]==0?
                                            game.board[2][0]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '⬇️':
                                            game.board[2][1]==0?
                                            game.board[2][1]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        case '↘️':
                                            game.board[2][2]==0?
                                            game.board[2][2]=(rodada%2==0?1:-1):
                                            rodada-=1
                                            break;

                                        default: break;
                                                
                                        
                                    }
                                    await gameMsg?.delete()
                                    if(!game.keepPlaying()){
                                        interaction.channel?.send(`player ${rodada%2==0?player1.username:player2.nickname} win`)
                                        await interaction.channel?.send(game.render(rodada))
                                        console.log(`player ${rodada%2==0?1:-1} win`)
                                    }
                                    if(game.isVelha()){
                                        await interaction.channel?.send('velha!!')
                                        await interaction.channel?.send(game.render(rodada))

                                    }
                                    rodada++
                                }
                            }

                            
                        }
                    })
                    
                }).catch((e)=>{
                    console.log(e)
                })
            }else{
                interaction.reply('mencione apenas usuários')
            }         
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