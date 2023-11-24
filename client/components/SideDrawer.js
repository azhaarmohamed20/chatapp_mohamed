"use Client"
import { useState } from "react"
import { MdSearch } from 'react-icons/md';
import { Button } from "@chakra-ui/button";
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
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

export default function SideDrawer() {
    const [search, setUser] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const { user } = useChatState();

    return (
        <>
        <ChakraProvider>
        <CSSReset />
           <div className='flex flex-row w-full top-full justify-between align-center border-[5px] bg-white p-[5px] border-slate-200 text-center'>
                <button className="flex flex-row w-[150px] hover:opacity-100 hover:bg-slate-100 hover:rounded-md text-center">
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
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>

                </div>
            </ChakraProvider>
        </>
    )
}
