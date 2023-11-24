"use client"
import { Button } from "@chakra-ui/button";
import { Work_Sans } from 'next/font/google'
import { useDisclosure } from "@chakra-ui/hooks";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Text,
    Image,
  } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ProfileModel = ({user, children}) => {
    const{isOpen, onOpen, onClose} = useDisclosure();
    
    

    return  (
        <>
        {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton
                d={{base: "flex"}}
                icon={<ViewIcon/>}
                onClick={onOpen}
                />
            )}

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                    <ModalContent h="410px">
                        <ModalHeader
                            fontSize="40px"
                            d="flex"
                            textAlign={"center"}
                        >{ user.data.name}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                            d="flex"
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                                <Image
                                d="flex"
                                borderRadius="full"
                                boxSize="150px"
                                margin={"auto"}
                                src={user.data.pic}
                                alt={user.data.name}
                                />
                                
                                <Text
                                fontSize={{ base: "28px", md: "30px" }}
                                textAlign={"center"}
                                padding={"20px"}
                                >
                                Email: {user.data.email}
                                </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModel