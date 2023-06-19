import { Typography } from '@mui/material';
import { Player } from '../interfaces/Player';
import { useTranslation } from 'react-i18next';
import { PlayerItemComponent } from './PlayerItemComponent';

interface Props {
  players: Player[];
}

export const PlayerListComponent = ({ players }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography>{t('current_players')}</Typography>
      {players.map(player => (
        <PlayerItemComponent key={player.name} player={player} />
      ))}
    </>
  );
};
