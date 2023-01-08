import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Main } from "..";
import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, VoiceConnection } from "@discordjs/voice";
import play, { SoundCloudTrack, YouTubeVideo } from 'play-dl'; 
import reply from "../util/reply";

interface SoundOptions{
    link:string
    title:string
    platform: false | "so_playlist" | "so_track" | "sp_track" | "sp_album" | "sp_playlist" | "dz_track" | "dz_playlist" | "dz_album" | "yt_video" | "yt_playlist" | "search"
    video_details: YouTubeVideo | SoundCloudTrack
}

export default class Music {

    private client:Main
    //private interaction
    private player:AudioPlayer = createAudioPlayer()
    public queue: SoundOptions[] = []
    public isPlaying = false
    private guild
    public connection:VoiceConnection|undefined
    
    constructor(client:Main,interaction:CommandInteraction){
        //async function top level not allowed
        //(async ()=>await interaction.deferReply())()
        this.client = client
        //this.interaction = interaction
        this.guild = this.client.guilds.cache.get(interaction.guildId!)
        this.connect(interaction)
        //this.connection?.subscribe(this.player)
    }
    private connect(interaction:CommandInteraction){
        
        let member = this.guild?.members.cache.get(interaction.user.id)
        if(this.isUserConnected(interaction)){
            if(member?.voice.channel?.joinable){
                this.connection = joinVoiceChannel({
                    guildId: this.guild!.id,
                    channelId: member.voice.channelId!,
                    adapterCreator: this.guild!.voiceAdapterCreator,
                })
            }else{
                reply(interaction,{message:'sem permissão para entrar, ou canal de voz lotado'})
            }
        }else{
            reply(interaction,{message:'usuário não conectado em canal de voz'})
        }
    }

    public isUserConnected(interaction:CommandInteraction){
        let guild = this.client.guilds.cache.get(interaction.guildId!)
        let member = guild?.members.cache.get(interaction.user.id)
        if(guild){
            this.guild = guild
        }
        
        return Boolean(member?.voice.channel)
    }

    public async addToQueue(interaction:CommandInteraction,link:string){
        const type = await play.validate(link)

        //todo respostas diferentes se for de outra plataforma
        if(type && (type =='yt_video'||type=='yt_playlist')){

            const { video_details } = await play.video_info(link)
            var embed = new EmbedBuilder()
                .setURL(video_details.url)
                .setAuthor({name:video_details.channel?.name!,iconURL:video_details.channel?.iconURL(),url:video_details.channel?.url})
                .setDescription(video_details.description==undefined?null:video_details.description.substring(0,250)+'...')
                .setTitle(video_details.title==undefined?null:video_details.title)
                .setThumbnail(video_details.thumbnails[0].url)

            let music = {
                link,
                video_details,
                platform: type,
                title: video_details.title
            } as SoundOptions

            this.queue.push(music)

            reply(interaction,{
                content:'video added to queue',
                embeds:[embed]
            })
            return true
        }else if(type && (type =='so_track'||type=='so_playlist')){
            //todo video for soundcloud
        }else{
            reply(interaction,{message:'invalid video'})
            return false
        }
    }

    //todo 
    // public removeFromQueue(index:number){

    // }

    public pause(){
        this.isPlaying = false
        this.player.pause()
    }
    public continue(){
        this.isPlaying = true
        this.player.unpause()
    }
    public next(){
        this.isPlaying = false
        this.player.stop()
        this.queue.shift()
        this.playMusic()
    }

    public async playMusic(){
        if(this.queue[0] && await play.validate(this.queue[0].link)){
            
            if(play.yt_validate(this.queue[0].link)){
                const video = await play.stream(this.queue[0].link)

                this.isPlaying = true

                this.player.play(createAudioResource(video.stream,{
                    inputType:video.type
                }))
            }

            this.connection?.subscribe(this.player)
            this.player.on(AudioPlayerStatus.Idle,()=>{
                this.queue.shift()
                this.playMusic()
            })
        }
        
    }
}