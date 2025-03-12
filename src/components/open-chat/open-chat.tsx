'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './open-chat-styles.module.scss'
import { initialise } from '@open-ic/openchat-xframe'
import { OpenChatXFrame } from '@open-ic/openchat-xframe/lib/types'
import { Close } from '@mui/icons-material'
import Image from "next/image"

const teal = '#2cc3ce'
// const tealDark = '#23a1ab'
const tealHover = '#31ccd8'
const txt = '#f5f5f5'
const txtSecondary = '#A0AEC0'
const background = '#060722'
const entryBg = '#2cc3ce10'
const inputBg = '#0F123B'

const initialiseOpenChatFrame = (
  path: string,
  iframe: HTMLIFrameElement
): Promise<OpenChatXFrame> => {
  return initialise(iframe, {
    targetOrigin: 'https://oc.app',
    initialPath: path,
    settings: {
      disableLeftNav: true,
    },
    theme: {
      name: 'Panorama Block',
      base: 'dark',
      overrides: {
        burst: false,
        primary: teal,
        bd: teal,
        bg: background,
        txt: txt,
        placeholder: txtSecondary,
        'txt-light': txtSecondary,
        timeline: {
          txt: txt,
        },
        time: {
          txt: txt,
          icon: txt,
        },
        menu: {
          bd: teal,
          separator: teal,
        },
        scrollbar: {
          bg: teal,
        },
        button: {
          bg: teal,
          hv: tealHover,
        },
        icon: {
          txt: txtSecondary,
        },
        currentChat: {
          date: {
            bd: `solid 1px ${teal}`,
            bg: 'rgba(0,0,0,0.8)',
            txt: txtSecondary,
          },
          msg: {
            bd: `solid 1px ${teal}`,
            me: {
              bg: teal,
              txt: '#fff',
            },
            txt: txt,
          },
        },
        entry: {
          bg: entryBg,
          input: {
            bg: inputBg,
          },
        },
      },
    },
  })
}

const OpenChat = () => {
  const [chatOpened, setChatOpened] = useState(false)
  const iframe = useRef<HTMLIFrameElement>(null)
  const path = "/group/lejtn-6aaaa-aaaar-bijya-cai/?ref=kv2af-gaaaa-aaaaf-bl4cq-cai"
  const [client, setClient] = useState<Promise<OpenChatXFrame> | undefined>(undefined)

  useEffect(() => {
    if (chatOpened && iframe.current && !client) {
      setClient(initialiseOpenChatFrame(path, iframe.current))
    }
  }, [chatOpened, client])

  const handleClose = () => {
    setChatOpened(false)
    setClient(undefined)
  }

  useEffect(() => {
    return () => {
      setClient(undefined)
    }
  }, [])

  return (
    <>
      {
        chatOpened ? (
          <div className={styles.openChat}>
            <iframe ref={iframe} title="OpenChat" frameBorder="0" />
            <div className={styles.close} onClick={handleClose}>
              <Close />
            </div>
          </div>
        ) : (
          <div className={styles.chat} onClick={() => setChatOpened(true)}>
            <div className="flex items-center gap-2">
              <span>Community</span>
              <Image
                src="/openchat.svg"
                alt="Open Chat"
                width={20}
                height={20}
              />
            </div>
          </div>
        )}
    </>
  )
}

export default OpenChat
