import { ColorResolvable, EmbedBuilder } from "discord.js";
export enum Status {
  Error,
  Success,
  Info,
}

interface StatusMap {
  color: ColorResolvable;
}

const statusMap: Record<Status, StatusMap> = {
  [Status.Error]: {
    color: "#d41e0d",
  },
  [Status.Success]: {
    color: "#2fc53b",
  },
  [Status.Info]: {
    color: "#ea6894",
  },
};

export function colorsEmbed(status: Status) {
  return new EmbedBuilder().setColor(statusMap[status].color);
}
