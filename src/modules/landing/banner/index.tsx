'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useState, useCallback } from "react"

interface Agent {
  [key: string]: {
    title: string;
    prompts: string[];
  };
}

const data: Agent[] = [
  {
    chainWatcherAgent: {
      title: "Chain Watcher Agent",
      prompts: [
        "Identify newly minted tokens on Solana with daily volume above $10K",
        "Compare the borrow APY of USDC between Aave and Morpho on Ethereum"
      ]
    }
  },
  {
    stakeAgent: {
      title: "Stake Agent",
      prompts: [
        "Stake all idle SOL on Marinade every friday at 2pm UTC",
        "Convert 50% of LST portfolio (stETH, ETHx, rsETH) into ezETH and restake on Renzo"
      ]
    }
  },
  {
    swapAgent: {
      title: "Swap Agent",
      prompts: [
        "Swap half my USDC holdings on Base to BERA tokens on BeraChain",
        "Execute a cross-chain swap of 200 USDC from Ethereum to SONIC"
      ]
    }
  },
  {
    dcaAgent: {
      title: "DCA Agent",
      prompts: [
        "DCA $1000 into SOL and ETH, split 70/30, every two weeks",
        "Double DCA allocation during market dips greater than 7% in a 24h"
      ]
    }
  },
  {
    crossTraderAgent: {
      title: "Cross Trader Agent",
      prompts: [
        "Mirror the trades of wallet 0xABCD across Solana and Base, but cap each trade at $500",
        "Set limit orders to buy ETH on Base at $2500 and sell at $2800 with a stop loss at $2400"
      ]
    }
  },
  {
    portfolioScannerAgent: {
      title: "Portfolio Scanner Agent",
      prompts: [
        "Calculate my total staking yield in the last 30 days across LIDO and JITO",
        "Summarize all fees collected from my LP positions on Uniswap across all chains, deducting estimated IL for each pool"
      ]
    }
  },
  {
    reportAgent: {
      title: "Report Agent",
      prompts: [
        "Chart weekly LP APY changes on WBTC/USDC pool on Uniswap-Ethereum",
        "Compile daily wallet inflows from cross-chain bridges between Ethereum and Solana"
      ]
    }
  }
]

const useTypewriter = () => {
  const [text, setText] = useState('')
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0)
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaitingForNextAgent, setIsWaitingForNextAgent] = useState(false)
  const [isPausingBeforeDelete, setIsPausingBeforeDelete] = useState(false)

  const getCurrentPrompt = useCallback(() => {
    const agent = Object.values(data[currentAgentIndex])[0]
    return agent.prompts[currentPromptIndex]
  }, [currentAgentIndex, currentPromptIndex])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const batchSize = 1;
    const typeSpeed = 25;
    const deleteSpeed = 20;
    const pauseBeforeDelete = 2000;
    const agentChangeDelay = 1000;

    const animate = () => {
      if (isWaitingForNextAgent) {
        timeout = setTimeout(() => {
          setCurrentAgentIndex((currentAgentIndex + 1) % data.length);
          setCurrentPromptIndex(0);
          setIsWaitingForNextAgent(false);
        }, agentChangeDelay);
        return
      }

      const currentText = getCurrentPrompt();

      if (!isDeleting) {
        if (text.length < currentText.length) {
          const charsToAdd = Math.min(batchSize, currentText.length - text.length);
          setText(currentText.slice(0, text.length + charsToAdd));
          setIsPausingBeforeDelete(false);
          timeout = setTimeout(animate, typeSpeed);
        } else {
          setIsPausingBeforeDelete(true);
          timeout = setTimeout(() => {
            setIsPausingBeforeDelete(false);
            setIsDeleting(true);
            animate();
          }, pauseBeforeDelete);
        }
      } else {
        if (text.length > 0) {
          const charsToRemove = Math.min(batchSize, text.length);
          const newText = text.slice(0, text.length - charsToRemove);
          setText(newText);
          setIsPausingBeforeDelete(false);
          timeout = setTimeout(animate, deleteSpeed);
        } else {
          setIsDeleting(false);
          const agent = Object.values(data[currentAgentIndex])[0];

          if (currentPromptIndex < agent.prompts.length - 1) {
            timeout = setTimeout(() => {
              setCurrentPromptIndex(currentPromptIndex + 1);
            }, 0);
          } else {
            setIsWaitingForNextAgent(true);
          }
        }
      }
    };

    timeout = setTimeout(animate, 20);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, isWaitingForNextAgent, currentAgentIndex, currentPromptIndex, getCurrentPrompt]);

  return { text, isPausingBeforeDelete };
}

const Banner = () => {
  const { text, isPausingBeforeDelete } = useTypewriter()

  return (
    <div className="flex flex-col items-center justify-center h-full mt-32">
      <div className={`relative w-[80%] ${!isPausingBeforeDelete ? 'typewriter' : ''}`}>
        <Input
          value={text}
          readOnly
          className="bg-landing-tertiary border-landing-tertiary h-12 rounded-xl w-full text-white cursor-default px-6 transition-all duration-75 shadow-[0px_16px_57.7px_0px_rgba(0,0,0,0.42)]"
        />
        {isPausingBeforeDelete && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <img src="logo-horse.png" alt="" className="mt-8" />
    </div>
  )
}

export default Banner
