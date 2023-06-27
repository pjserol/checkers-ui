import Long from "long";
import { CheckersStargateClient } from "src/checkers_stargateclient";
import { IGameInfo } from "src/sharedTypes";
import { storedToGameInfo } from "./board";
import { StoredGame } from "../generated/checkers/stored_game";

declare module "../../checkers_stargateclient" {
  interface CheckersStargateClient {
    getGuiGames(): Promise<IGameInfo[]>;
    getGuiGame(index: string): Promise<IGameInfo | undefined>;
  }
}

CheckersStargateClient.prototype.getGuiGame = async function (
  index: string
): Promise<IGameInfo | undefined> {
  const storedGame: StoredGame | undefined =
    await this.checkersQueryClient!.checkers.getStoredGame(index);
  if (!storedGame) return undefined;
  return storedToGameInfo(storedGame);
};

CheckersStargateClient.prototype.getGuiGames = async function (): Promise<
  IGameInfo[]
> {
  return (
    await this.checkersQueryClient!.checkers.getAllStoredGames(
      Uint8Array.from([]),
      Long.ZERO,
      Long.fromNumber(20),
      true
    )
  ).storedGames.map(storedToGameInfo);
};
