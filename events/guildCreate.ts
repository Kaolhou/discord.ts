import { ChannelType, TextChannel } from "discord.js";
import { EventI } from "../util/types";


const guildCreate:EventI<'guildCreate'> ={
    //todo modificar
    eventName:'guildCreate',
    once:false,
    async exe(client, guild) {
        let channelID: string|undefined;
        let channels = guild.channels.cache;
    
        channelLoop:
        for (let key in channels) {
            let c = channels.get(key);
            if (c?.type === ChannelType.GuildText && (await client.channels.fetch(guild.systemChannelId || channelID!) as TextChannel).permissionsFor(guild.members.me!).has('SendMessages')) {
                channelID = c.id;
                break channelLoop;
            }
        }
    
        let channel = await client.channels.fetch(guild.systemChannelId || channelID!) as TextChannel
        channel?.send('thanks for invite me')
    },
}
export default guildCreate