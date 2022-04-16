import { Theme } from '@material-ui/core/styles/createTheme';
import { SxProps } from '@material-ui/system';

export const planSxData = (check?: boolean): SxProps<Theme> => {
  return {
    bgcolor: check ? 'background.blue' : 'background.planIcon',
    borderRadius: 2,
    paddingX: 1.5,
    paddingY: 0.5,
    marginX: 1,
    color: check ? '#fff' : 'text.planIcon',
  };
};
