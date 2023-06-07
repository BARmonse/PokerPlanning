import { Typography } from '@mui/material';
import { adminStyle, playerStyle } from '../styles/PlayerItem';
import { Player } from '../interfaces/Player';

interface Props {
  player: Player;
}

export const PlayerItemComponent = ({ player }: Props) => {
  return player.isAdmin ? (
    <>
      <Typography sx={adminStyle}>{player.name}</Typography>
    </>
  ) : (
    <>
      <Typography sx={playerStyle}>{player.name}</Typography>
    </>
  );
};
