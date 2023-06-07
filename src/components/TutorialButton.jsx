import { useEffect } from 'react';
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

export const TutorialButton = (props) => {
    const { visited } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    // ユーザーがサイトを初めて訪れた場合、モーダルを自動的に開く
    useEffect(() => {
    if (!visited) {
        onOpen();
    }
    }, [visited, onOpen]);
    
    return (
        <>
            <IconButton icon={<AiOutlineQuestionCircle />} backgroundColor={'red.100'} _hover={{ bg: 'red.200' }} onClick={onOpen}/>
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