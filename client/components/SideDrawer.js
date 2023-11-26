"use Client"
import { useState } from "react"
import { MdSearch } from 'react-icons/md';
import { Button } from "@chakra-ui/button";
import axios from "axios";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useChatState } from "../context/ChatProvider"
import ProfileModel from "./ProfileModel"
import { Box, ChakraProvider, CSSReset, Input } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/toast";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
  } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { Spinner } from "@chakra-ui/spinner";

export default function SideDrawer() {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const {
        setSelectedChat,
        user,
        chats,
        setChats,
      } = useChatState();
    const{isOpen, onOpen, onClose} = useDisclosure();

    const toast = useToast();

    const logoutHandler = () =>{
        localStorage.removeItem('userInfo')
        window.location.reload("/")
    }

    const handleSearch = async () => {
        if (!search) {
          toast({
            title: "Please Enter something in search",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
          return;
        }
    
        try {
          setLoading(true);
    
          const config = {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
            },
          };
          const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);

          setLoading(false);
          setSearchResult(data);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      };

      const accessChat = async (userId) => {
        console.log(userId);
    
        try {
          setLoadingChat(true);
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.data.token}`,
            },
          };
          const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);
    
          if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
          setSelectedChat(data);
          setLoadingChat(false);
          onClose();
        } catch (error) {
          toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      };
      

    return (
        <>
        <ChakraProvider>
        <CSSReset />
           <div className='flex flex-row w-full top-full justify-between align-center border-[5px] bg-white p-[5px] border-slate-200 text-center'>
                <button className="flex flex-row w-[150px] hover:opacity-100 hover:bg-slate-100 hover:rounded-md text-center" onClick={onOpen}>
                    <MdSearch  size={30} className="m-auto" />
                    <p className="m-auto">Search User</p>
                </button>
                <p className="text-sm m-auto">Connect with Others</p>
                <div>
                    <Menu>
                        <MenuButton as={Button} bg="whites" rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.data.name}
                                src={user.data.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem>My Profile</MenuItem>{" "}
                            </ProfileModel>
                            <MenuDivider></MenuDivider>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
                            <DrawerBody>
                                <Box d="flex" pb={2}>
                                    <Input placeholder="Search by name or email" mr={2} value={search} onChange={(e) => setSearch(e.target.value)}/>
                                    <Button onClick={handleSearch} >Go</Button>
                                </Box>
                                {loading ? (
                                    <ChatLoading />
                                    ) : (
                                    searchResult?.map((user) => (
                                        <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                        />
                                    ))
                                    )}
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </div>
            </ChakraProvider>
        </>
    )
}
