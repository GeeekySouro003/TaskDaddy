import { Modal, useMantineTheme } from '@mantine/core';
import SharePost from '../SharePost/SharePost.jsx';

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  // Define overlay styles
  const overlayStyles = {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
    opacity: 0.55,
    blur: 3,
    backdropFilter: 'blur(3px)'
  };

  // Define modal styles
  const modalStyles = {
    width: '60%', // Set width to 60% of viewport
    margin: 'auto', // Center the modal horizontally
    padding: '20px', // Add padding for spacing
    borderRadius: '8px', // Add border radius for rounded corners
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white, // Set background color
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black // Set text color
  };

  // Define form styles
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      styles={{ modal: modalStyles }} // Apply modal styles
    >
      <SharePost/>
    </Modal>

  );
}

export default ShareModal;