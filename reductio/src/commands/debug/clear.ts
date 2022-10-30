import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
  GuildSystemChannelFlags,
  TextChannel,
} from "discord.js";
import { embedColors, Status } from "../../embedColors";

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
    if (ammount > 100) {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Message limit exceeded")
        .setDescription(
          `You can only delete up to 100 messages at a time \n (attempted to delete ${ammount} messages)`
        )
        .setColor("#d41e0d");

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    } else {
      const messagesToDelete = await channel.messages.fetch({
        limit: ammount,
      });
      await channel.bulkDelete(messagesToDelete);
      const successEmbed = new EmbedBuilder()
        .setTitle("Messages deleted")
        .setDescription(
          `Successfully deleted ${ammount} messages from ${channel.name}`
        )
        .setColor("#2fc53b");

      await interaction.reply({ embeds: [successEmbed], ephemeral: true });
    }
  }
}
