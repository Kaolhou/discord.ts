import { Collection, CommandInteraction, Message, User } from "discord.js";
import {  unoEmbedPlayers, unoEmbedPrivate } from "../util/embeds";
import canvasDeck from "../util/canvasDeck";
import { Main } from "..";
import removeDuplicates from "../util/removeDuplicates";

interface UnoParams{
    players:User[]
    interaction:CommandInteraction
    client:Main
}
export interface infoCard{
    card:cards
    reverse:boolean
    block:boolean
    changeColor:boolean
    number:boolean
    buy: 2|4|false
    color:'green'|'red'|'yellow'|'blue'|'black'|false
    type:'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'0'|'reverse'|'block'|'plus2'|'color'|'color4'|false
}
export type cards ='0r'|'1r'|'2r'|'3r'|'4r'|'5r'|'6r'|'7r'|'8r'|'9r'|'plus2r'|'blockr'|'rever'|
            '0b'|'1b'|'2b'|'3b'|'4b'|'5b'|'6b'|'7b'|'8b'|'9b'|'plus2b'|'blockb'|'reveb'|
            '0y'|'1y'|'2y'|'3y'|'4y'|'5y'|'6y'|'7y'|'8y'|'9y'|'plus2y'|'blocky'|'revey'|
            '0g'|'1g'|'2g'|'3g'|'4g'|'5g'|'6g'|'7g'|'8g'|'9g'|'plus2g'|'blockg'|'reveg'|
            'color'|'color4'|'00'

export interface UserI extends User{
    deck:cards[]
    message:Message<false>|undefined
    reacted:boolean
    alreadyBought: boolean
}

export default class Uno{

    public turn = 0
    public block = false
    public amountBuy = 0
    public monte:cards[] = []
    public rodada:number = 1
    private message:Message|undefined

    
    players:UserI[]
    interaction:CommandInteraction
    client:Main
    currentCard:infoCard
    
    constructor({players,interaction,client}:UnoParams){
        client.verbose ? console.log('[Uno] New uno game started') : null
        this.players = players.map(i=>Object.assign(i,{deck:[],message:undefined,reacted:false,alreadyBought:false}))
        this.interaction = interaction
        this.client = client
        this.setMonte()
        this.currentCard = this.getFirst()

        this.awaitToPlay()
    }
    getFirst(){
        var chosen:infoCard = {} as infoCard
        while(true){
            if(!this.monte.length) break;
            let card = this.monte.sort( () => Math.random() - .5 )[0]
            let infoCard = this.getInfoCards(card)
            if(infoCard.number){
                this.monte.shift()
                chosen = infoCard
                break
            }
        }
        return chosen
    }
    removeRandom<T>(array:T[]):T {
        const random = Math.floor(Math.random() * array.length);
        const el = array.splice(random, 1)[0];
        return el
    };

    async awaitToPlay(){
        let str = ''
        this.players.forEach((i,index)=>{
            if(index+1===this.players.length){
                str+=(`<@${i.id}> `)
            }else{
                str+=(`<@${i.id}>, `)
            }
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
                        await message.reactions.removeAll()
                        await message.delete()
                        this.start()
                    }
                    return true
                }
                return false
            },
            time:1000*60*2,//2min
            errors:['time']
        })
        .then((a)=>{
            // message.edit(`foi`)
            // console.log(a)
        })
        .catch(()=>{
            message.reactions.removeAll()
            message.edit(`faltou gente reagir`)
        })
    }

    getInfoCards(card:cards):infoCard{
        if(card=="color4"){
            return {
                card,
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
                let color = (char === 'b') ? 'blue' : (char === 'g') ? 'green' : (char === 'y') ? 'yellow' :(char === 'r') ? 'red' : false;
                return check(color)?color:false
            }
            function check(char:string|boolean):char is infoCard['color']{
                return char==='green'||char==='red'||char==='yellow'||char==='blue'||char==='black'
            }

            function getCardType(card:Exclude<cards,'color4'>):infoCard['type']{
                if(card ==='color'){
                    return 'color'
                }else{ 
                    // console.log(card)
                    let typeCard = card.slice(0,card.length-1)
                    typeCard==='reve'?typeCard='reverse':typeCard
                    
                    return checkType(typeCard)?typeCard:false
                }
            }
            function checkType(char:string|boolean):char is infoCard['type']{
                return char === '1'|| char === '2'|| char === '3'|| char === '4'|| char === '5'|| char === '6'|| char === '7'|| char === '8'|| char === '9'|| char === '0'|| char === 'reverse'|| char === 'block'|| char === 'plus2'|| char === 'color'|| char === 'color4'
            }
            let carta = getCardType(card)

            function isNumberCard(card:infoCard['type']){
                return !Number.isNaN(Number(card))
            }
            return {
                card,
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
    private reverse(){
        this.turn = this.players.length - this.turn
        this.players.reverse()
    }
    
    private distribui(){
        this.players.forEach(i=>this.compra(i,9))
    }

    async render(){
        //edit the public channel

        if(this.message){
            await this.message.edit({
                embeds:[unoEmbedPlayers(this.players,this.currentCard.card)],
            })
        }else{
            let channel = this.client.channels.cache.get(this.interaction.channel?.id!)
            this.message = channel?.isTextBased() ? await channel.send({
                embeds:[unoEmbedPlayers(this.players,this.currentCard.card)],
            }) : undefined;
        }


        //private message
        this.players.forEach(async(player)=>{
            //if message not created
            let possibleCards = player.deck.filter(i=>this.can(this.currentCard,i))
            let embedPrivate = unoEmbedPrivate({
                player,
                users:this.players.filter(i=>i.id!==player.id),
                currentCard:this.currentCard.card,
                possiblePlays: player.alreadyBought?possibleCards:['buy',...possibleCards],
                yourTurn: player.id === this.players[this.turn].id,
            })
            
            if(player.message===undefined){
                player.message = await this.client.users.cache.get(this.players[0].id)?.send({
                    embeds:[embedPrivate],
                    files:[{
                        name:'deck.png',
                        attachment:canvasDeck(this.players[0])
                    }],
                })
            }else{
                player.message.edit({
                    embeds:[embedPrivate],
                    files:[{
                        name:'deck.png',
                        attachment:canvasDeck(this.players[0])
                    }],
                })
            }
        })

        
    }

    async start(){
        this.distribui()
        this.render()
        this.resolvePendencies(this.players[0])
        // console.log(this.players[0].deck.map((i=>this.getInfoCards(i))))
    }

    compra(player:UserI,amont?:number){
        let b = amont ? amont : this.amountBuy
        for ( let a=0; a<b; a++ ) {
            if(this.monte.length===0){
                this.setMonte()
            }
            player.deck.push(this.removeRandom(this.monte))
        }
    }

    async changeCardIfBlack(player:UserI){
        if(this.currentCard.color==='black'){
            let message = await player.message?.reply('which color?')
            let reactions = ['🟥','🟩','🟦','🟨']
            reactions.forEach((i)=>{
                message?.react(i)
            })
            let collector = message?.createReactionCollector({
                filter:(reaction,user)=>{
                    return Boolean(reactions.find(i=>i===reaction.emoji.name)) && user.id === player.id
                },
                max:1
            })

            collector?.on('collect',(reaction)=>{
                switch(reaction.emoji.name){
                    case '🟥':
                        this.currentCard.color='red'
                    break;
                    case '🟩':
                        this.currentCard.color='green'
                    break;
                    case '🟦':
                        this.currentCard.color='blue'
                    break;
                    case '🟨':
                        this.currentCard.color='yellow'
                    break;
                }
            })
            collector?.once('end',async ()=>{
                await message?.reactions.removeAll()
                await message?.delete()
            })
        }
    }
    

    can(target:cards|infoCard, played:cards){
        
        let targetInfo = typeof target==='string' ? this.getInfoCards(target) : target
        let playedInfo = this.getInfoCards(played)
        if((!targetInfo.type)||(!playedInfo.type)||(!targetInfo.color)||(!playedInfo.color)){
            throw new Error('false card type/color')
        }


        if(playedInfo.type==='color4'){
            return true
        }

        if(targetInfo.buy&&(playedInfo.number||playedInfo.block||playedInfo.reverse)){
            return false
        }
        
        //acumular compras
        if(targetInfo.buy&&playedInfo.buy){
            return true
        }

        // if(playedInfo.type==='color'&&targetInfo.){
        //     return false
        // }
        //mesma cor ou mesmo símbolo
        if((targetInfo.color===playedInfo.color)||(targetInfo.type===playedInfo.type)){
            console.log((targetInfo.color===playedInfo.color)&&targetInfo.color+'+'+ playedInfo.color+' => mesma cor')
            console.log((targetInfo.type===playedInfo.type)&&targetInfo.type+'+'+ playedInfo.type+' => mesmo tipo')

            // console.log('ablue blue')
            return true
        }


        if(this.amountBuy&&playedInfo.buy){
            return true
        }


        return false
        
    }
    skip(){
        this.turn = (this.turn+1)%this.players.length
    }

    async messageListener(player:UserI,cards:cards[],callback:((a:Collection<string,Message<boolean>>)=>void)){
        (player.dmChannel||await player.createDM()).awaitMessages({
            filter:(a)=>{
                return (!a.inGuild()) && (player.id === a.author.id) && ((!!cards.find(i=>a.content===i) || (!player.alreadyBought&&a.content==='buy')))
            },
            max:1
        }).then((a)=>callback(a))
    }

    async resolvePendencies(player:UserI){
        //se houver algo para comprar e não ter cartas de compra
        if(this.amountBuy&&player.deck.find(i=>!(this.getInfoCards(i).buy))){
            this.compra(player,this.amountBuy)
            this.amountBuy = 0
            return this.skip()
        }
        if(this.block){
            this.block = false
            return this.skip()
        }

        let cards = removeDuplicates(player.deck.filter(i=>this.can(this.currentCard,i)));
        this.messageListener(player,cards,async(collected)=>{
            let message = collected.first()!
            this.play(player,message.content==='buy'?'buy':cards.find(i=>message.content===i)!)
        })



    }

    async play(player:UserI,card:cards|'buy'){

        if(card==='buy'){
            if(this.amountBuy){
                this.compra(player,this.amountBuy)
                this.amountBuy = 0
            }else{
                player.alreadyBought = true
                this.compra(player,1)
                this.resolvePendencies(player)
                    .then(()=>{player.alreadyBought=false})
                
            }
        }else{
            let info = this.getInfoCards(card)

            player.deck.splice(player.deck.indexOf(card),1)
            this.currentCard = info

            if(info.color!=='black'){
                if(info.reverse) {
                    this.reverse()
                    this.skip()
                }
                if(info.block){
                    this.block = true
                    this.skip()
                }

            }else{
                this.changeCardIfBlack(player)
            }
        }
        await player.message?.delete()
        await this.render()
    }
}