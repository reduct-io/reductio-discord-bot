import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
  GuildSystemChannelFlags,
  TextChannel,
} from "discord.js";
import { colorsEmbed, Status } from "../../embedColors.js";
import { bot } from "../../main.js";

@Discord()
// @SlashGroup({ description: "Debug commands for server upkeep", name: "debug" })
// @SlashGroup("debug")
export class Clear {
  @Slash({ name: "clear", description: "clear" })
  async clear(
    @SlashOption({
      description: "number of messages to clear",
      name: "ammount",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    ammount: number,
    interaction: CommandInteraction
  ) {
    const channel = interaction.channel as TextChannel;
    const auditLog = bot.channels.resolve("1036112551408308286") as TextChannel;
    if (ammount > 100) {
      const errorEmbed = colorsEmbed(Status.Error)
        .setTitle("Message limit exceeded")
        .setDescription(
          `You can only delete up to 100 messages at a time \n (attempted to delete ${ammount} messages)`
        );

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    } else {
      const messagesToDelete = await channel.messages.fetch({
        limit: ammount,
      });
      await channel.bulkDelete(messagesToDelete);
      const successEmbed = colorsEmbed(Status.Success)
        .setTitle("Messages deleted")
        .setFooter({
          text: `Command executed by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(
          `Successfully deleted ${ammount} messages from ${channel.name}`
        );
      await interaction.reply({ embeds: [successEmbed], ephemeral: true });
      await auditLog.send({ embeds: [successEmbed] });
    }
  }
}
