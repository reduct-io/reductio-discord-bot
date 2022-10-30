import { TextChannel, EmbedBuilder } from "discord.js";
import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { colorsEmbed, Status } from "../embedColors.js";
import { bot } from "../main.js";

@Discord()
export class MessageEdited {
  @On()
    messageUpdate([oldMessage, newMessage]: ArgsOf<"messageUpdate">, client: Client): void {
    console.log("Message Edited", client.user?.tag, newMessage.content);
    const auditLog = bot.channels.resolve("1036112551408308286") as TextChannel;
    const editedMessageEmbed = colorsEmbed(Status.Info)
    .setTitle(`Message edited by ${newMessage.author?.tag}`)
    .addFields(
        { name: "Old Message", value: `${oldMessage.content}`|| `No content` },
        { name: "New Message", value: `${newMessage.content}`|| `No content` }
    )
    auditLog.send({ embeds: [editedMessageEmbed] });
  }
}