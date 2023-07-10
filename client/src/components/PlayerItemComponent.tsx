import { Typography } from '@mui/material';
import { Player } from '../interfaces/Player';
import { Colors } from '../enums/Colors';
import { Style } from '../interfaces/Style';

interface Props {
  player: Player;
}

export const PlayerItemComponent = ({ player }: Props) => {
  return player.isAdmin ? (
    <>
      <Typography sx={styles.adminUsername}>{player.name}</Typography>
    </>
  ) : (
    <>
      <Typography sx={styles.playerUsername}>{player.name}</Typography>
    </>
  );
};

const styles: Style = {
  playerUsername: {
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  adminUsername: {
    color: Colors.NICE_PURPLE,
    fontWeight: 'bold',
  },
};
