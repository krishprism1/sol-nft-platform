"use client"
import React, { useEffect, useState } from 'react'
import "./page.css";
import Header from '@/components/common/Header';
import "../globals.css";
import "../responsive/pageresponsive.css"
import "./viewmoreresponsive.css";
import Timer from '@/components/common/Timer';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { GlobalStateData, ParsedNfts } from '@/utils/type';
import { compaignStatus, getCampaignStatus } from '@/utils/helper';
import { fetchGlobalState, fetchUserNfts } from '@/utils/web3';
import Buy from '@/components/common/Buy';
import { getUrl } from '@/utils/constant';

const ViewMore = () => {
  const anchorWallet = useAnchorWallet();
  const [globalState, setGlobalState] = useState<GlobalStateData>()
  const [userNfts, setUserNfts] = useState<ParsedNfts>()

  useEffect(() => {
    getGlobalState()
    fetchNfts()
  }, [anchorWallet])

  const getGlobalState = () => {
    // @ts-expect-error null wallet for public fn
    fetchGlobalState(anchorWallet).then(result => setGlobalState(result))
  }

  const fetchNfts = () => {
    if (anchorWallet) {
      fetchUserNfts(anchorWallet).then(result => setUserNfts(result))
    }
  }

  const currentTime = new Date().getTime()
  const raised = globalState?.treasury_raised ? globalState?.totalNftsMinted * 555 : 0
  const status = globalState ? getCampaignStatus(globalState?.purchaseStart, globalState?.purchaseEnd) : "Comming"
  const compaignTimeStatus = globalState && compaignStatus(globalState?.purchaseStart, globalState?.revealEnd)
console.log(compaignTimeStatus, "compaignTimeStatus")
  return (
    <>
      <Header />
      <section>
        <div className="viewmore-container1">

          <div className="viewmore-container1-left">
            <div className="view-small-box1">
              <h2>LTR: Lottery</h2>
              <button>{status}</button>
            </div>

            <div className="view-small-box2">
              <div>
                <img src="https://solana-nft-platform.vercel.app/_next/image?url=%2Fnft-image.png&w=640&q=75" alt="img" />
              </div>

              <div className='vw-sm-box'>
                <div>
                  <h3>{userNfts?.length}</h3>
                  <p>My Tickets</p>
                </div>
                <div>
                  <h3>8888</h3>
                  <p>Max Tickets</p>
                </div>

                <span></span>

                <div>
                  <h4>555 USDC</h4>
                  <h4>1.23M USDC</h4>
                </div>
                <div>
                  <h5>Tickets Price</h5>
                  <h5>Max Jackpot</h5>
                </div>
              </div>

            </div>

            <div className="view-small-box3">
              <h3>Draw 1/1</h3>
              <h3>Lottery Draw 1</h3>
            </div>

            <div className="view-small-box4">
              {globalState?.purchaseStart && currentTime < globalState.purchaseEnd ?
                <Timer start={globalState?.purchaseStart} end={globalState?.purchaseEnd} type={0} /> :
                globalState?.revealStart && <Timer start={globalState?.revealStart} end={globalState?.revealEnd} type={0} />
              }
              <div className="ticket-details-box">
                <div>
                  <div className='border-use-class1'>
                    <p>Ticket Revealed</p>
                    <span>{globalState?.totalRevealed ? globalState?.totalRevealed : 0}/8888</span>
                  </div>
                  <div>
                    <p>Revealed (USDC)</p>
                    <span>0.00/1.23M</span>
                  </div>
                </div>
                <span className='span'></span>
                <div>
                  <div className='border-use-class'>
                    <p>Ticket Sold</p>
                    <span>{globalState?.totalNftsMinted ? globalState?.totalNftsMinted : 0}/8888</span>
                  </div>
                  <div>
                    <p>Jackpot (USDC)</p>
                    <span>{raised* 0.25}/1.23M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="viewmore-container1-right">
            <h3>Prize Pool(if 100%)</h3>
            <div className='prizepool-containner'>
              <div className='top-box'>
                <span>#</span>
                <p>Pool(USDC)</p>
                <span>Tickets</span>
                <span>Won</span>
                <span>Left</span>
              </div>
              <div className='prize-list-container'>
                <div className="boxses1">
                  <div><span>1</span></div>
                  <div><p>500,683.232</p></div>
                  <div><span>1</span></div>
                  <div><span>0x</span></div>
                  <div><span>1x</span></div>
                </div>
                <div className="boxses1">
                  <div><span>2</span></div>
                  <div><p>209,645.70</p></div>
                  <div><span>1</span></div>
                  <div><span>0x</span></div>
                  <div><span>1x</span></div>
                </div>
                <div className="boxses1">
                  <div><span>3</span></div>
                  <div><p>98,665.80</p></div>
                  <div><span>1</span></div>
                  <div><span>0x</span></div>
                  <div><span>1x</span></div>
                </div>
                <div className="boxses1">
                  <div><span>4</span></div>
                  <div><p>61,660.50</p></div>
                  <div><span>1</span></div>
                  <div><span>0x</span></div>
                  <div><span>1x</span></div>
                </div>
                <div className="boxses1">
                  <div><span>5</span></div>
                  <div><p>36,996.30</p></div>
                  <div><span>1</span></div>
                  <div><span>0x</span></div>
                  <div><span>1x</span></div>
                </div>
                <div className="boxses1">
                  <div><span>6-856</span></div>
                  <div><p>246.64</p></div>
                  <div><span>1</span></div>
                  <div><span>0x</span></div>
                  <div><span>1x</span></div>
                </div>
                <div className="boxses1">
                  <div><span>857-1707</span></div>
                  <div><p>136.38</p></div>
                  <div><span>1</span></div>
                  <div><span>0x</span></div>
                  <div><span>1x</span></div>
                </div>
                <div className="boxses1">
                  <div><span>1708-3208</span></div>
                  <div><p>Second</p></div>
                  <div><span>Chance</span></div>
                  {/* <div><span>0x</span></div> */}
                  {/* <div><span>1x</span></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="buy-ticket-container">
          <div className="ticket-box">
            <div className="first-box1">
              <h3>Buy tickets</h3>
              <span>1</span>
            </div>
            <div className="first-box2">
              <fieldset>
                <legend>Tickets</legend>
                <span>1</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="#F0E5FF"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
              </fieldset>
              <Buy globalState={globalState} setGlobalState={setGlobalState} />
            </div>
          </div>

          <div className="lottery-draw-box">
            <h3>Lottery Draw</h3>
            <div className="draw-ticket-listbox">
              <div className="top-heading-box">
                <span>#</span>
                <span>Sold</span>
                <span>Jackpot</span>
                <span>Status</span>
                <p>{compaignTimeStatus?.state}</p>
              </div>

              <div className="top-heading-listbox">
                <span>1</span>
                <span>{globalState?.totalNftsMinted ? globalState?.totalNftsMinted : 0}</span>
                <span>1.23M</span>
                <button>{status}</button>
                <p>{compaignTimeStatus?.time} UTC</p>
              </div>
            </div>
          </div>
        </div>

        <div className="last-container-of-viewmore">
          <h3>My NFTs</h3>
          <div className="connect-wallet-bottom-box">
            {
              userNfts ? userNfts.map((item) => (
                <div className='active_div' key={item.mintKey}>
                  <a href={getUrl(item.mintKey)} target='blank'>
                  <img src="/imgone.png" alt="lottery-image" />
                  </a>
                </div>
              )) : ""
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default ViewMore
