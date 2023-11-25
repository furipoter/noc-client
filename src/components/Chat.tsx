import {useEffect, useState} from 'react';

const Chat = ({video}: { video?: string }) => {
    const [message, setMessage] = useState('');
    const url = 'http://13.209.86.34:5002/api/chat/create';
    const [chatList, setChatList] = useState<{ chats: { content:string, created_at:string, video_name: string }[] } | undefined>(undefined);

    const fetchChatList = async () => {
        try {
            const response = await fetch(`http://13.209.86.34:5002/api/chat/list?video_name=${video}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const _sliced = data.chats.slice(0, 7).reverse()
            setChatList({
                chats: _sliced
            })
        } catch (error) {
            console.error('Error fetching chat list:', error);
        }
    };

    const sendMessage = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    video_name:video,
                    content: message
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // 여기에서 응답을 처리하거나 상태를 업데이트할 수 있습니다.
            console.log('Message sent successfully');
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        // Fetch chat list when the component mounts
        fetchChatList();

        // Set up an interval to fetch the chat list every 3 seconds
        const intervalId = setInterval(fetchChatList, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [video]);

    return (
        <div className="fixed bottom-0 left-0 w-full px-6">
            <div>
                {chatList?.chats?.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-row gap-4 w-full overflow-x-scroll mb-4">
                            <div>익명</div>
                            <div className="font-bold">{item.content}</div>
                            <div className="text-[12px]">{item.created_at}</div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row mb-4">
                <input
                    className="w-full px-4 py-2 input-style rounded-l"
                    type="text"
                    placeholder="내용을 입력하세요."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="bg-white px-4 py-2 text-black min-w-fit" onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
};

export default Chat;
