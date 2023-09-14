import { Message } from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";

class MessageCreate extends Event<'messageCreate'>{
  public async exe(client: Main, message: Message<boolean>): Promise<void> {
    if (message.author.bot) return;
    if (message.inGuild()) {
      client.logger.debug(`[${message.author.id}] - ${message.content}`)
      
      const userExists = (await client.prisma.guildUserMember.findUnique({
        where:{
          guildId_userId:{
            userId:message.author.id,
            guildId:message.guildId
          }
        },
      })) 


      client.logger.debug(userExists)
      if (!userExists) {
        const user = await client.prisma.user.findUnique({
          where:{
            userId: message.author.id
          }
        })
        if(!user){
          const {userId} =await client.prisma.user.create({
            data:{
              userId:message.author.id,
            },
            select:{ userId:true }
          })
          await client.prisma.guildUserMember.create({
            data:{
              guildId:message.guildId,
              userId
            }
          })

        }else{
          await client.prisma.guildUserMember.create({
            data:{
              guildId:message.guild.id,
              userId:user.userId
            }
          })
        }

        // await client.prisma.user.create({
        //   data:{
        //     userId:message.author.id,
        //     GuildUserMember:{
        //       create:[
        //         {
        //           guild: {
        //             connectOrCreate:{
        //               where:{
        //                 guildId:message.guildId,
        //               },
        //               create:{
        //                 guildId:message.guildId
        //               }
        //             }
        //           }
        //         }
        //       ]
        //     }
        //   }
        // })
      }

      const {messages} = await client.prisma.user.update({
        where:{
          userId:message.author.id
        },
        data:{
          messages:{
            increment:1
          }
        },
        select:{
          messages:true
        }
      })
      console.debug(messages)
      if(messages == 15n){
        const channel = client.channels.cache.get(message.channelId)
        channel?.isTextBased() ? await channel.send(`beleza ${message.author.toString()}, mandou 15 mensagem, chatão em menó\nsó fala, eu hein`) : null
      }

    }
  }
}

export default new MessageCreate('messageCreate')