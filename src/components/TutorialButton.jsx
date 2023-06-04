import {
    IconButton,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text
  } from '@chakra-ui/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

export const TutorialButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton icon={<AiOutlineQuestionCircle />}  onClick={onOpen}/>
            <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>AI ポモドーロ・タイマーとは</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>AI（ChatGPT）と、ポモドーロ・タイマー を組み合わせたアプリです。</Text>
                    <Text>目標を設定するだけで、AIが自動でポモドーロ・タイマーを作成します。</Text>
                    <Text>スケジューリングに悩まされることなく、作業を開始できます！</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    閉じる
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};