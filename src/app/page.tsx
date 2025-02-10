"use client"
import Header from "@/components/common/Header";
import "./responsive/pageresponsive.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { fetchGlobalState } from "@/utils/web3";
import { GlobalStateData } from "@/utils/type";
import Timer from "@/components/common/Timer";
import { getCampaignStatus } from "@/utils/helper";
import Buy from "@/components/common/Buy";


export default function Home() {
  const [toggle, setToggle] = useState(false)
  const [globalState, setGlobalState] = useState<GlobalStateData>()
  const [status, setStatus] = useState(true)
  const [tab, setTab] = useState("")


  const anchorWallet = useAnchorWallet();
  const clickToggle = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    getGlobalState()
  }, [anchorWallet])

  const getGlobalState = async () => {
    // @ts-expect-error null wallet for public fn
    const result = await fetchGlobalState(anchorWallet)
    setGlobalState(result)
    if (result) {
      setTab(getCampaignStatus(result?.purchaseStart, result?.purchaseEnd))

    }
  }

  const campaignStatus = (tab: string) => {
    if (globalState) {
      const _status = getCampaignStatus(globalState?.purchaseStart, globalState?.purchaseEnd)
      if (_status != tab) {
        setTab("")
        setStatus(false)
      } else {
        setTab("")
        setStatus(true)
      }
    }
  }

  const currentTime = new Date().getTime();
  const raised = globalState?.treasury_raised ? globalState?.totalNftsMinted * 555 : 0
  const percentage = globalState?.totalNftsMinted ? Math.ceil(globalState?.totalNftsMinted / 8888) : 0
  return (
    <>
      <div id="main">
        <Header />
        <div className="part2container">
          <div className="three-option-container">
            <p>Scratch anytime, anywhere</p>
            <div>
              <a href="#" onClick={() => campaignStatus("Coming")} style={{ backgroundColor: tab == "Coming" ? '#20154A' : '' }}>Soon</a>
              <a href="#" onClick={() => campaignStatus("Ongoing")} style={{ backgroundColor: tab == "Ongoing" ? '#20154A' : '' }}>Buy</a>
              <a href="#" onClick={() => campaignStatus("End")} style={{ backgroundColor: tab == "End" ? '#20154A' : '' }}>End</a>
            </div>
          </div>
         <div className="all-inone-container">
         {status && <div className="veiw-more-maincontainer">
            <div className={toggle ? "borderClass" : ""} onClick={() => setToggle(true)}>
              <div className="view-more-container1">
                <div className="small-box1">
                  <div>
                    <h4>Airdrop Campaign</h4>
                    <span>Draw: 1 / 1</span>
                  </div>
                  <div>
                    <h4>555 (USDC)</h4>
                    <span>Ticket Price</span>
                  </div>
                  <div>
                    <h4>{globalState?.totalNftsMinted ? globalState?.totalNftsMinted : 0} / 8888</h4>
                    <span>Tickets Sold</span>
                  </div>
                  <div>
                    <h4>{raised ? raised * 0.25 : 0} / 1233210</h4>
                    <span>Jackpot (USDC)</span>
                  </div>
                </div>
                <div className="small-box2">
                  <Link href="/view-more">
                    <button>View More</button>
                  </Link>
                  <span className="updown-arrow" onClick={() => clickToggle()}>
                    {
                      toggle ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#fff"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#fff"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>
                    }
                  </span>
                </div>
              </div>

              {
                toggle && <div className="view-more-container2">
                  <div className="small-container">
                    <div className="small-box1">
                      <span>Draw 1/1</span>
                      {globalState?.purchaseStart && currentTime < globalState.purchaseEnd ?
                        <Timer start={globalState?.purchaseStart} end={globalState?.purchaseEnd} type={1} /> :
                        globalState?.revealStart && <Timer start={globalState?.revealStart} end={globalState?.revealEnd} type={1} />
                      }
                      <div className="last-box">
                        <div>
                          <p>Ticket Sold</p>
                          <span>{globalState?.totalNftsMinted ? globalState?.totalNftsMinted : 0} / 8888</span>
                          <button>
                            {/* progress bar */}
                            <span className="span1" style={{ width: `${percentage}%` }}></span>
                          </button>
                        </div>
                        <div>
                          <p>Prizes (USDC)</p>
                          <span>{raised * 0.25}/1.23M</span>
                        </div>
                      </div>
                    </div>

                    <div className="small-box2">
                      <div>
                        <span># Pool(USDC)-100%</span>
                        <span>NFT</span>
                      </div>
                      <ol>
                        <li>$500,683.232 <span>1</span></li>
                        <li>$209,645.70 <span>1</span></li>
                        <li>$98,665.80 <span>1</span></li>
                        <li>$61,660.50 <span>1</span></li>
                        <li>$36,996.30 <span>1</span></li>
                      </ol>

                    </div>
                  </div>
                  <div className="small-container2">
                    <div className="ticket-container1">
                      <div>
                        <p>Ticket Price</p>
                        <span>555</span>
                      </div>
                      <fieldset>
                        <legend>Ticket</legend>
                        <span>1</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="#F0E5FF"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                      </fieldset>
                    </div>

                    <div className="ticket-container2">
                      <div>
                        <p>NFT Token</p>
                        <span>USDC</span>
                      </div>
                      <Buy globalState={globalState} setGlobalState={setGlobalState} />
                    </div>
                  </div>
                </div>
              }
              <div id="small-box2">
                <Link href="/view-more">
                  <button>View More</button>
                </Link>
                <span className="updown-arrow" onClick={() => clickToggle()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#FFAB21"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg>
                </span>
              </div>
            </div>
          </div>}
         </div>
        </div>
      </div>
    </>
  );
}

