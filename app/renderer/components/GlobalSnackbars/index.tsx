import { Alert, AlertColor, AlertTitle, Snackbar } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import GlobalMessage from '../../utils/message';
import { TimeFormatEnum } from '../../utils/time';
import { IGlobalSnackbarsInterface } from './index.type';

const { ipcRenderer } = window.electronAPI;

const GlobalSnackbars: React.FC<IGlobalSnackbarsInterface> = () => {
  const [isOpen, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [content, setContent] = useState('');

  useEffect(() => {
    const setMessageContent = (_severity: AlertColor, msg: string) => {
      ipcRenderer.writeLog(
        `${msg}-${moment().format(TimeFormatEnum.dateFormatTime)}`
      );
      setOpen(true);
      setSeverity(_severity);
      setContent(msg);
    };
    GlobalMessage.info = (msg) => setMessageContent('info', msg);
    GlobalMessage.warning = (msg) => setMessageContent('warning', msg);
    GlobalMessage.success = (msg) => setMessageContent('success', msg);
    GlobalMessage.error = (msg) => setMessageContent('error', msg);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={severity}
          onClose={handleClose}
        >
          <AlertTitle>{severity.toLocaleUpperCase()}</AlertTitle>
          {content}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GlobalSnackbars;
