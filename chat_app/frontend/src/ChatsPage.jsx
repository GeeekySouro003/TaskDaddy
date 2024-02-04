import { PrettyChatWindow } from 'react-chat-engine-pretty';

const ChatsPage = (props) => {
    return (
        <div style={{ height: '100vh' }}>
            <PrettyChatWindow
                projectId='8612b373-2819-4177-af14-cc3b35ec209f'
                username={props.user.username}
                secret={props.user.username}
                style={{ height: '100%' }}
            />
        </div>
    );
};

export default ChatsPage;
