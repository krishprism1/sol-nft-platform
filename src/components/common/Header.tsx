"use client"
import React from 'react'
import WalletConnectButton from "@/components/wallet/WallectConnectButton";
import Link from 'next/link';

export default function Header() {

  return (
    <header>
      <div className="header-box1">
        <Link href="/">
          <img src="/logo.png" alt="img" />
        </Link>
        <span style={{ fontFamily: "MyCustomFont, sans-serif" }}>
          MR.Gain
        </span>
      </div>
      <div className="header-box2">
        <ul>
          <li><Link href="/">Campaigns</Link></li>
          <li><Link href="/tickets">Tickets</Link></li>
          <li><Link href="/create">Create</Link></li>
          <li><Link href="/sponsor">Sponsor</Link></li>
          <li><Link href="/prizes">Prizes</Link></li>
        </ul>
      </div>
      <div className="header-box3">
        <button className="header-btn1">
          <img src="https://logos-world.net/wp-content/uploads/2024/01/Solana-Symbol-500x281.png"
            alt="img"
            width={20}
            height={13}
          />
          Solana
        </button>
        <WalletConnectButton />
      </div>
    </header>
  )
};
