import { CommandInteraction, Message, User } from "discord.js";
import { unoEmbedPlayers, unoEmbedPrivate } from "../util/embeds";
import canvasDeck from "../util/canvasDeck";
import { Main } from "..";

interface UnoParams{
    players:User[]
    interaction:CommandInteraction
    client:Main
}
type cards ='0r'|'1r'|'2r'|'3r'|'4r'|'5r'|'6r'|'7r'|'8r'|'9r'|'plus2r'|'blockr'|'rever'|
            '0b'|'1b'|'2b'|'3b'|'4b'|'5b'|'6b'|'7b'|'8b'|'9b'|'plus2b'|'blockb'|'reveb'|
            '0y'|'1y'|'2y'|'3y'|'4y'|'5y'|'6y'|'7y'|'8y'|'9y'|'plus2y'|'blocky'|'revey'|
            '0g'|'1g'|'2g'|'3g'|'4g'|'5g'|'6g'|'7g'|'8g'|'9g'|'plus2g'|'blockg'|'reveg'|
            'color'|'color4'|'00'

export interface UserI extends User{
    deck:cards[]
    message:Message<false>|undefined
    reacted:boolean
}

export default class Uno{

    public step = 1
    public block = false
    public amountBuy = 0
    public monte:cards[] = []
    // public cards = {
        //     '00':'https://imgur.com/osBTa5O',
        //     '0b':'https://imgur.com/APG1icX',
        //     '0g':'https://imgur.com/dPKoWIY',
        //     '0r':'https://imgur.com/JJBSwjv',
        //     '0y':'https://imgur.com/NDvNcNm',
    //     '1b':'https://imgur.com/5epOU3Z',
    //     '1g':'https://imgur.com/n086BvF',
    //     '1r':'https://imgur.com/qHIEYE3',
    //     '1y':'https://imgur.com/3zSbudh',
    //     '2b':'https://imgur.com/JceA9JT',
    //     '2g':'https://imgur.com/R3QpQCX',
    //     '2r':'https://imgur.com/rjxbpoi',
    //     '2y':'https://imgur.com/8TsDmhX',
    //     '3b':'https://imgur.com/dRdiAAN',
    //     '3g':'https://imgur.com/Fuy4J86',
    //     '3r':'https://imgur.com/A2gSDYD',
    //     '3y':'https://imgur.com/DfydYb6',
    //     '4b':'https://imgur.com/UwkD5jX',
    //     '4g':'https://imgur.com/nWKdryJ',
    //     '4r':'https://imgur.com/Xgbunn6',
    //     '4y':'https://imgur.com/jdXfxbH',
    //     '5b':'https://imgur.com/EZ40y3j',
    //     '5g':'https://imgur.com/ZAZjN8w',
    //     '5r':'https://imgur.com/8ivSuu9',
    //     '5y':'https://imgur.com/kl63O2s',
    //     '6b':'https://imgur.com/vHgQcef',
    //     '6g':'https://imgur.com/KyOBOoY',
    //     '6r':'https://imgur.com/KJSRIms',
    //     '6y':'https://imgur.com/JClhGMt',
    //     '7b':'https://imgur.com/twPdX6U',
    //     '7g':'https://imgur.com/KUwGJY1',
    //     '7r':'https://imgur.com/4B1nhJk',
    //     '7y':'https://imgur.com/s9YXS4R',
    //     '8b':'https://imgur.com/jdjAT9a',
    //     '8g':'https://imgur.com/F899ywy',
    //     '8r':'https://imgur.com/guYIwpg',
    //     '8y':'https://imgur.com/zDD364G',
    //     '9b':'https://imgur.com/lXgY5w3',
    //     '9g':'https://imgur.com/iilkq15',
    //     '9r':'https://imgur.com/p5ugQMo',
    //     '9y':'https://imgur.com/UVkzbRs',
    //     'blockb':'https://imgur.com/EOOEVgx',
    //     'blockg':'https://imgur.com/LjDEqbI',
    //     'blockr':'https://imgur.com/sdTAHXy',
    //     'blocky':'https://imgur.com/JaAct4a',
    //     'color':'https://imgur.com/DwALbuc',
    //     'color4':'https://imgur.com/2aYrscO',
    //     'plus2b':'https://imgur.com/os1Vql4',
    //     'plus2g':'https://imgur.com/dupionl',
    //     'plus2r':'https://imgur.com/TkprdbY',
    //     'plus2y':'https://imgur.com/GSmiGsE'
    // }

    
    players:UserI[]
    interaction:CommandInteraction
    client:Main
    // currentCard:cards
    getFirst(){

    }
    removeRandom(array:any[]) {
        if(!array.length){
            this.setMonte()
        }
        const random = Math.floor(Math.random() * array.length);
        const el = array.splice(random, 1)[0];
        return el
    };

    constructor({players,interaction,client}:UnoParams){
        this.players = players.map(i=>Object.assign(i,{deck:[],message:undefined,reacted:false}))
        this.interaction = interaction
        this.client = client
        // this.currentCard = 
        this.awaitToPlay()//.then(()=>{
        //     if(this.players.map(i=>i.reacted).every(i=>i===true)){
        //         this.setMonte()
        //         this.distribui()
        //         this.render()
        //     }
        // })
    }

    async awaitToPlay(){
        let str = ''
        this.players.forEach((i,index)=>{
            if(index+1===this.players.length){
                str+=(`<@${i.id}> `)
            }else{
                str+=(`<@${i.id}>, `)
            }
            // if(index==0){//for test
            //     str+=`<@${i.id}> `
            // }
        })
        str+='please react to this message'
        let message = await this.interaction.editReply(str)
        await message.react('✅')


        await message.awaitReactions({
            filter: async(reaction, user)=>{
                const findUser = this.players.find(i=>i.id==user.id)
                if(findUser&&reaction.emoji.name==="✅"){
                    findUser.reacted = true
                    if(this.players.map(i=>i.reacted).every(i=>i===true)){
                        this.start()
                        await message.delete()
                    }
                    return true
                }
                return false
            },
            time:1000*60*2,//2min
            errors:['time']
        }).catch((/*collected*/)=>{
            message.reactions.removeAll()
            message.edit(`faltou gente reagir`)
        })
    }

    setMonte(){
        this.monte.push(
            // 8 Cartas Comprar Duas Cartas - 2 de cada cor;
            // 19 Cartas Azuis - 0 a 9
            '0b',"1b","2b","3b","4b","5b","6b","7b","8b","9b","1b","2b","3b","4b","5b","6b","7b","8b","9b",'plus2b',"plus2b",
            // 19 Cartas Verdes - 0 a 9
            '0g',"1g","2g","3g","4g","5g","6g","7g","8g","9g","1g","2g","3g","4g","5g","6g","7g","8g","9g","plus2g",'plus2g',
            // 19 Cartas Amarelas - 0 a 9 
            '0y',"1y","2y","3y","4y","5y","6y","7y","8y","9y","1y","2y","3y","4y","5y","6y","7y","8y","9y",'plus2y',"plus2y",
            // 19 Cartas Vermelhas - 0 a 9
            '0r',"1r","2r","3r","4r","5r","6r","7r","8r","9r","1r","2r","3r","4r","5r","6r","7r","8r","9r",'plus2r','plus2r',
            // 8 Cartas Inverter - 2 de cada cor
            'reveb','reveb',"reveg","reveg","rever","rever",'revey',"revey",
            // 8 Cartas Pular - 2 de cada cor
            'blockb',"blockb",'blockg',"blockg",'blockr',"blockr","blocky","blockr",
            // 4 Cartas Curinga, 4 Cartas Curinga Comprar Quatro Cartas
            'color',"color",'color',"color","color4","color4","color4","color4",

        )
    }
    
    private distribui(){
        for(let a=0;a<9;a++){
            this.players.forEach(i=>i.deck.push(this.removeRandom(this.monte)))
        }
    }

    async render(){
        //edit the public channel
        await this.interaction.editReply({
            embeds:[unoEmbedPlayers(this.players)],
        })

        //private message
        this.players.forEach(async(player,index)=>{
            if(index ===0){//just for test
                if(player.message===undefined){
                    player.message = await this.client.users.cache.get(this.players[0].id)?.send({
                        embeds:[unoEmbedPrivate({player:this.players[0]})],
                        files:[{
                            name:'deck.png',
                            attachment:canvasDeck(this.players[0])
                        }]
                    })
                }else{
                    player.message.edit({
                        embeds:[unoEmbedPrivate({player:this.players[0]})],
                        files:[{
                            name:'deck.png',
                            attachment:canvasDeck(this.players[0])
                        }]
                    })
                }
            }
        })

        
    }

    async start(){
        this.setMonte()
        this.distribui()
        this.render()
    }

    compra(){

    }
    

    can(target:cards, played:cards){
        interface infoCard{
            reverse:boolean
            block:boolean
            changeColor:boolean
            number:boolean
            buy: 2|4|false
            color:'g'|'r'|'y'|'b'|'black'|false
            type:'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'0'|'reverse'|'block'|'plus2'|'color'|'color4'|false
        }
        function getInfoCards(card:cards):infoCard{
            if(card=="color4"){
                return {
                    number:false,
                    reverse:false,
                    block:false,
                    buy:4,
                    changeColor:true,
                    color:'black',
                    type: 'color4',
                }
            }else{
                function getColor(card:string):infoCard['color']{
                    let char = card.charAt(card.length-1)
                    return check(char)?char:false
                }
                function check(char:string|boolean):char is infoCard['color']{
                    return char==='g'||char==='r'||char==='y'||char==='b'||char==='black'
                }

                function getCardType(card:Exclude<cards,'color4'>):infoCard['type']{
                    if(card ==='color'){
                        return 'color'
                    }else{ 
                        let typeCard = card.slice(0,card.length-1)
                        return checkType(typeCard)?typeCard:false
                    }
                }
                function checkType(char:string|boolean):char is infoCard['type']{
                    return char === '1'|| char === '2'|| char === '3'|| char === '4'|| char === '5'|| char === '6'|| char === '7'|| char === '8'|| char === '9'|| char === '0'|| char === 'reverse'|| char === 'block'|| char === 'plus2'|| char === 'color'|| char === 'color4'
                }
                let carta = getCardType(card)

                function isNumberCard(card:infoCard['type']){
                    return !Number.isNaN(card)
                }
                return {
                    reverse: card.startsWith('reve'),
                    block: card.startsWith('block'),
                    buy: card.charAt(4)==='2'?2:false,
                    changeColor: card === 'color',
                    color:card==='color' ? 'black' : getColor(card),
                    type: carta,
                    number: isNumberCard(carta)
                }
            }
        }
        let targetInfo = getInfoCards(target)
        let playedInfo = getInfoCards(played)
        console.log(targetInfo,playedInfo)

    }

    play(){

    }
}