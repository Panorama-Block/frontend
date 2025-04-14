'use client'

import type { NextPage } from "next"
import { ChakraProvider, defineStyleConfig, extendTheme } from "@chakra-ui/react"
import { Box, Flex } from "@chakra-ui/react"
import { LeftSidebar } from "@/components/LeftSidebar"
import { Chat } from "@/components/Chat"
import {
  writeMessage,
  getMessagesHistory,
  sendSwapStatus,
  uploadFile,
  deleteConversation,
} from "@/lib/api/services/apiHooks"
import { getHttpClient, SWAP_STATUS } from "@/lib/api/services/constants"
import { ChatMessage } from "@/lib/api/services/types"
import { useEffect, useState } from "react"
import { useAccount, useChainId } from "wagmi"
import { HeaderBar } from "@/components/HeaderBar"

const ButtonStyles = defineStyleConfig({
  variants: {
    greenCustom: {
      fontFamily: 'Inter',
      fontSize: '16px',
      background: '#59F886',
      borderRadius: '24px',
      color: 'var(--background-secondary)',
      '&:hover': {
        background: '#59F886',
        color: 'var(--background-secondary)',
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        border: '1px solid #59F886'
      }
    }
  }
})

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    'header': 'var(--background-secondary)',
    'pop-up-bg': '#1C201D',
  },
  components: {
    Button: ButtonStyles,
  },
  Text: {
    baseStyle: {
      fontFamily: 'Inter',
      fontSize: '16px',
      color: 'var(--dark-text-90, rgba(255, 255, 255, 0.90))'
    }
  },
})

const Home: NextPage = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("default")
  const chainId = useChainId()
  const { address } = useAccount()
  const [showBackendError, setShowBackendError] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    getMessagesHistory(getHttpClient(), currentConversationId)
      .then((messages: ChatMessage[]) => {
        setChatHistory([...messages])
      })
      .catch((e) => {
        console.error(`Failed to get initial messages history. Error: ${e}`)
        setShowBackendError(true)
      })
  }, [currentConversationId])

  const handleSubmitMessage = async (message: string, file: File | null) => {
    setChatHistory([
      ...chatHistory,
      {
        role: "user",
        content: message,
      } as ChatMessage,
    ])

    try {
      if (!file) {
        const newHistory = await writeMessage(
          chatHistory,
          message,
          getHttpClient(),
          chainId,
          address || "",
          currentConversationId
        )
        setChatHistory([...newHistory])
      } else {
        // File upload
        await uploadFile(getHttpClient(), file)
        const updatedHistory = await getMessagesHistory(
          getHttpClient(),
          currentConversationId
        )
        setChatHistory([...updatedHistory])
      }
    } catch (e) {
      console.error(`Failed to send message. Error: ${e}`)
      setShowBackendError(true)
    }

    return true
  }

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      await deleteConversation(getHttpClient(), conversationId)
      if (conversationId === currentConversationId) {
        setCurrentConversationId("default")
      }
    } catch (e) {
      console.error(`Failed to delete conversation. Error: ${e}`)
      setShowBackendError(true)
    }
  }

  const handleCancelSwap = async (fromAction: number) => {
    if (!address) return

    try {
      await sendSwapStatus(
        getHttpClient(),
        chainId,
        address,
        SWAP_STATUS.CANCELLED,
        "",
        fromAction
      )
      const updatedMessages = await getMessagesHistory(getHttpClient())
      setChatHistory([...updatedMessages])
    } catch (e) {
      console.error(`Failed to cancel swap or update messages. Error: ${e}`)
      setShowBackendError(true)
    }
  }

  const handleBackendError = () => {
    return
    setShowBackendError(true)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "var(--background-secondary)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeaderBar />
        <Flex flex="1" overflow="hidden">
          {/* 
          Pass isSidebarOpen and a toggle method 
          so the sidebar can update state in the parent
        */}
          <LeftSidebar
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={setIsSidebarOpen}
            currentConversationId={currentConversationId}
            setCurrentConversationId={setCurrentConversationId}
            onConversationSelect={setCurrentConversationId}
            onDeleteConversation={handleDeleteConversation}
          />

          <Box flex="1" overflow="hidden">
            <Chat
              messages={chatHistory}
              onCancelSwap={handleCancelSwap}
              onSubmitMessage={handleSubmitMessage}
              onBackendError={handleBackendError}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </Box>
        </Flex>

        {/* <ErrorBackendModal show={showBackendError} /> */}
      </Box>
    </ChakraProvider>
  )
}

export default Home
