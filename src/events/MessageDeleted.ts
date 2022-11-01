import { TextChannel, EmbedBuilder } from "discord.js";
import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";
import { colorsEmbed, Status } from "../embedColors.js";
import { bot } from "../main.js";

@Discord()
export class MessageDeleted {
  @On()
  messageDelete([message]: ArgsOf<"messageDelete">, client: Client): void {
    console.log("Message Deleted", client.user?.tag, message.content);
    const auditLog = bot.channels.resolve("1036112551408308286") as TextChannel;
    const deletedMessageEmbed = colorsEmbed(Status.Info)
    .setTitle(`Message deleted by ${message.author?.tag}`)
    .setDescription(`${message.content}`|| `No content`)
    auditLog.send({ embeds: [deletedMessageEmbed] });
  }
}