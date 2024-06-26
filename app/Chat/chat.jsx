"use client";

import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { auth } from '../firebase';
import { updateLikesInFirebase, listenForMessages, addMessageToChannel, addCommentToMessage, getAllMessagesFromChannel } from '../firebase';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FlutterDashOutlinedIcon from '@mui/icons-material/FlutterDashOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import ImageIcon from '@mui/icons-material/Image';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';
import { toast } from 'react-toastify';
import ReplySection from '../components/Reply';
import Resume from '../components/Resume';
import Texts from '../components/Texts';

const Chat = () => {
    const searchParams = useSearchParams();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState('');
    const [type, setType] = useState('');
    const messagesEndRef = useRef(null);
    const [showReplySection, setShowReplySection] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [likedMessages, setLikedMessages] = useState(new Set());
    const [imageLoading, setImageLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMenuOption, setSelectedMenuOption] = useState('');
    const [isVisible, setIsVisible] = useState(true);


    const handleMenuClick = () => {
        setShowMenu(!showMenu);
        if(!isVisible){
            setIsVisible(true);
        }   
    };

    const iconMapping = {
        prompt: <AutoFixHighIcon color="primary" className='cursor-pointer items-center mt-1' onClick={handleMenuClick}/>,
        chat: <ChatBubbleOutlineIcon color="primary" className='cursor-pointer items-center mt-1' onClick={handleMenuClick}/>,
        memes: <FlutterDashOutlinedIcon color="primary" className='cursor-pointer items-center mt-1' onClick={handleMenuClick}/>,
        logos: <BusinessOutlinedIcon color="primary" className='cursor-pointer items-center mt-1' onClick={handleMenuClick}/>,
        images: <ImageIcon color="primary" className='cursor-pointer items-center mt-1' onClick={handleMenuClick}/>,
        resumes: <AssignmentOutlinedIcon color="primary" className='cursor-pointer items-center mt-1' onClick={handleMenuClick}/>,
        texts: <FormatListBulletedOutlinedIcon color="primary" className='cursor-pointer items-center mt-1' onClick={handleMenuClick}/>,
    };

    const handleImageLoad = () => { };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (showReplySection) {
            setShowReplySection(false);
            setSelectedMessage(null);
        }
    }, [type]);

    useEffect(() => {
        const search = searchParams.get('type');
        setType(search || '');
        setUser(auth.currentUser);

        const loadMessages = async () => {
            const fetchedMessages = await getAllMessagesFromChannel(search || '');
            setMessages(fetchedMessages);
        };

        loadMessages();
        console.log('Messages loaded successfully.');

        const unsubscribeMessages = listenForMessages(search || '', (realtimeMessages) => {
            setMessages(realtimeMessages);
        });

        return () => unsubscribeMessages();
    }, [searchParams]);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            if (selectedMessage !== null) {
                await addCommentToMessage(type, selectedMessage.id, { text: inputValue, user: 'user' });
                setShowReplySection(false);
                setSelectedMessage(null);
            } else if (selectedMenuOption === 'prompt') {
                const userName = auth.currentUser.displayName;
                const userPhoto = auth.currentUser.photoURL;
                const newMessage = {
                    text: inputValue,
                    userName: userName,
                    userPhoto: userPhoto,
                    imageUrl: './load-32_128.gif',
                    replies: 0,
                    likes: 0,
                    timestamp: Date.now(),
                };

                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setInputValue('');
                toast.success('Transaction in progress', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                const response = await addMessageToChannel(type, { text: inputValue }, true);
                if (response.type === 'success') {
                    toast.success('1.10 USDC deducted from wallet', {
                        position: 'top-right',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    toast.info('1 For Model Fee & 0.10 for Platform Fee', {
                        position: 'top-right',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else if(response.type== 'trail')
                {
                    toast.success(response.message, {
                        position: 'top-right',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } 
                else if (response.type === 'error') {
                    toast.error(response.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.warning('Insufficient Funds', {
                        position: 'top-right',
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                const unsubscribeMessages = listenForMessages(type || '', (realtimeMessages) => {
                    setMessages(realtimeMessages);
                });
            } else {
                const userName = auth.currentUser.displayName;
                const userPhoto = auth.currentUser.photoURL;
                const newMessage = {
                    text: inputValue,
                    userName: userName,
                    userPhoto: userPhoto,
                    replies: 0,
                    likes: 0,
                    timestamp: Date.now(),
                };

                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setInputValue('');
                const response = await addMessageToChannel(type, { text: inputValue }, false);
                console.log(response);
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMenuOptionClick = (option) => {
        setSelectedMenuOption(option);
        setShowMenu(false);
        setIsVisible(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleLike = async (message) => {
        if (!likedMessages.has(message.id)) {
            setLikedMessages((prevLikedMessages) => new Set([...prevLikedMessages, message.id]));
            const likes = await updateLikesInFirebase(type, message.id);
            message.likes = likes;
            setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === message.id ? { ...msg, likes } : msg)));
            setLikedMessages((prevLikedMessages) => {
                const newLikedMessages = new Set(prevLikedMessages);
                newLikedMessages.delete(message.id);
                return newLikedMessages;
            });
        }
    };

    const handleReply = (message) => {
        console.log('Replying to message:', message);
        setShowReplySection(true);
        setSelectedMessage(message);
    };

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDate = (date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className=" flex flex-row h-full w-full">
            <div className={`flex flex-col h-full w-1/2 border-r-2`}>
                {user ? (
                    <React.Fragment>
                        <div className={`flex space-x-4 p-4 bg-white border-b mt-2`}>
                            <h2 className="text-lg font-semibold text-gray-800"># {type}</h2>
                            <h1 className='items-center mt-1 text-sm text-gray-600'>-</h1>
                            <h1 className='items-center mt-1 text-sm text-gray-600'>This is a {type} channel , users can generate images</h1>
                        </div>

                        <div className="flex-grow overflow-y-auto max-w-auto">
                            {messages.map((message, index) => (
                                <div key={message.id} className="flex flex-col border-slate-300 border-b">
                                    <div className={`flex items-start space-x-4`}>
                                        <div className={'flex bg-white rounded-lg p-6 w-full'}>
                                            <img src={message.userPhoto} alt="Profile" className="w-10 h-10 rounded-full" />
                                            <div className="ml-2 bg-white rounded-lg w-full">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold text-gray-800">
                                                        {message.userName.charAt(0).toUpperCase() + message.userName.slice(1)}
                                                    </span>
                                                    <span className="text-sm text-gray-500">{formatTime(new Date(message.timestamp))}</span>
                                                </div>
                                                <p className="text-gray-800 ">{message.text}</p>
                                                {message.imageUrl && !['Resumes', 'Texts'].includes(type) && (
                                                    <img className="rounded-lg mt-2" src={message.imageUrl} alt="Message Image" width={450} height={350} onLoad={handleImageLoad} />
                                                )}
                                                {message.imageUrl && type === 'Resumes' && (
                                                    <Resume />
                                                )}
                                                {message.imageUrl && type === 'Texts' && (
                                                    <Texts />
                                                )}
                                                {type !== 'Private' && (


                                                    <div className="flex items-center space-x-4 mt-2 post__footer">
                                                        <IconButton aria-label="Replay message" title="Replay" size="small">
                                                            <div>
                                                                <ChatBubbleOutlineIcon
                                                                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                                                                    size={18}
                                                                    onClick={() => handleReply(message)}
                                                                />
                                                                <span className="text-sm text-gray-500 ml-0.5">{message.replies}</span>
                                                            </div>
                                                        </IconButton>

                                                       
                                                        <IconButton aria-label="Favorite" title="Favorite" size="small">
                                                            <div>
                                                                <FavoriteBorderIcon
                                                                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                                                                    size={18}
                                                                    onClick={() => handleLike(message)}
                                                                />
                                                                <span className="text-sm text-gray-500 ml-0.5">{message.likes}</span>
                                                            </div>
                                                        </IconButton>
                                                        
                                                        <IconButton aria-label="Share" title="Share" size="small">
                                                            <ShareIcon fontSize="small" className="chatBubble" />
                                                        </IconButton>

                                                        {message.imageUrl ? (
                                                            <IconButton aria-label="Download" title="Download" size="small">
                                                            <GetAppIcon fontSize="small" />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton aria-label="Copy" title="Copy" size="small">
                                                            <FileCopyIcon fontSize="small" />
                                                            </IconButton>
                                                        )}  

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className=" items-center p-4 bg-white">


                            <div className="mr flex-grow relative">
                                <div className="flex items-center border border-gray-300 rounded-lg p-2 space-x-2">
                                    <div className='mr-2 relative' style={{ display: isVisible ? 'block' : 'none' }}>
                                        {showMenu && (
                                            <div className="absolute bottom-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {type === 'Memes' && (
                                                    <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('prompt')}>
                                                        <FlutterDashOutlinedIcon color="primary" /> <span className="ml-2">/memes</span>
                                                    </button>
                                                )}
                                                 {type === 'Logos' && (
                                                    <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('prompt')}>
                                                        <BusinessOutlinedIcon color="primary" /> <span className="ml-2">/logos</span>
                                                    </button>
                                                )}
                                                 {type === 'Images' && (
                                                    <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('prompt')}>
                                                        <ImageIcon color="primary" /> <span className="ml-2">/images</span>
                                                    </button>
                                                )}
                                                 {type === 'Resumes' && (
                                                    <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('prompt')}>
                                                        <AssignmentOutlinedIcon color="primary" /> <span className="ml-2">/resumes</span>
                                                    </button>
                                                )}
                                                 {type === 'Texts' && (
                                                    <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('prompt')}>
                                                        <FormatListBulletedOutlinedIcon color="primary" /> <span className="ml-2">/texts</span>
                                                    </button>
                                                )}

                                                {['Private', 'Home'].includes(type) && (
                                                    <>
                                                        <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('memes')}>
                                                            <FlutterDashOutlinedIcon color="primary" /> <span className="ml-2">/memes</span>
                                                        </button>
                                                        <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('logos')}>
                                                            <BusinessOutlinedIcon color="primary" /> <span className="ml-2">/logos</span>
                                                        </button>
                                                        <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('images')}>
                                                            <ImageIcon color="primary" /> <span className="ml-2">/images</span>
                                                        </button>
                                                        <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('resumes')}>
                                                            <AssignmentOutlinedIcon color="primary" /> <span className="ml-2">/resumes</span>
                                                        </button>
                                                        <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('texts')}>
                                                            <FormatListBulletedOutlinedIcon color="primary" /> <span className="ml-2">/texts</span>
                                                        </button>
                                                        <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('prompt')}>
                                                            <AutoFixHighIcon color="primary" /> <span className="ml-2">/prompt</span>
                                                        </button>
                                                    </>
                                                )}


                                                <button className="flex block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleMenuOptionClick('chat')}>
                                                    <ChatBubbleOutlineIcon color="primary" /> <span className="ml-2">/chat</span>
                                                </button>
                                            </div>
                                        )}
                                        {!selectedMenuOption && (
                                        <AddCircleOutlineIcon 

                                            color="primary"
                                            className="cursor-pointer text-gray-500 hover:text-gray-700"
                                            size={24}
                                            onClick={handleMenuClick}
                                        />
                                    )}
                                    </div>
                                    {selectedMenuOption && (
                                        <div className="flex items-center space-x-2">
                                            {iconMapping[selectedMenuOption]}
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        {...(selectedMenuOption === 'prompt' && { placeholder: 'Type your prompt...' })}
                                        {...(selectedMenuOption === 'prompt' && type === 'Resumes' && { placeholder: 'Build your Resume...' })}
                                        {...(selectedMenuOption === 'chat' && { placeholder: 'Type your message...' })}
                                        className="flex-grow bg-transparent outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSendMessage(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-lg text-gray-600">
                            Please <span className="font-semibold cursor-pointer text-blue-600">log in</span> to access the chat.
                        </p>
                    </div>
                )}
            </div>
            {showReplySection && (
                <div className={`flex flex-col h-full w-1/2 mt-0 border-r-2 `}>
                    <ReplySection
                        message={selectedMessage}
                        type={type}
                        setShowReplySection={setShowReplySection}
                        setSelectedMessage={setSelectedMessage}
                    />
                </div>
            )}
        </div>
    );
};

export default Chat;
