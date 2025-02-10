export type NftPlatform = {
  "version": "0.1.0",
  "name": "nft_platform",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminSolAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxNfts",
          "type": "u64"
        },
        {
          "name": "purchaseStart",
          "type": "i64"
        },
        {
          "name": "purchaseEnd",
          "type": "i64"
        },
        {
          "name": "revealStart",
          "type": "i64"
        },
        {
          "name": "revealEnd",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeRandomState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPeriods",
      "accounts": [
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "purchaseStart",
          "type": "i64"
        },
        {
          "name": "purchaseEnd",
          "type": "i64"
        },
        {
          "name": "revealStart",
          "type": "i64"
        },
        {
          "name": "revealEnd",
          "type": "i64"
        }
      ]
    },
    {
      "name": "purchase",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userNfts",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "adminSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reveal",
      "accounts": [
        {
          "name": "userNfts",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GlobalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalNftsMinted",
            "type": "u64"
          },
          {
            "name": "maxNfts",
            "type": "u64"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "totalRevealed",
            "type": "i64"
          },
          {
            "name": "purchaseStart",
            "type": "i64"
          },
          {
            "name": "purchaseEnd",
            "type": "i64"
          },
          {
            "name": "revealStart",
            "type": "i64"
          },
          {
            "name": "revealEnd",
            "type": "i64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "adminSolAccount",
            "type": "publicKey"
          },
          {
            "name": "treasuryAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UsedRandomNumber",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "usedNumbers",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "start",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "UserNFTs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "mintKey",
            "type": "publicKey"
          },
          {
            "name": "revealedNumber",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "PriceUpdateV2",
      "docs": [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "writeAuthority",
            "type": "publicKey"
          },
          {
            "name": "verificationLevel",
            "type": {
              "defined": "VerificationLevel"
            }
          },
          {
            "name": "priceMessage",
            "type": {
              "defined": "PriceFeedMessage"
            }
          },
          {
            "name": "postedSlot",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "VerificationLevel",
      "docs": [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Partial",
            "fields": [
              {
                "name": "numSignatures",
                "type": "u8"
              }
            ]
          },
          {
            "name": "Full"
          }
        ]
      }
    },
    {
      "name": "PriceFeedMessage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feedId",
            "docs": [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "price",
            "type": "i64"
          },
          {
            "name": "conf",
            "type": "u64"
          },
          {
            "name": "exponent",
            "type": "i32"
          },
          {
            "name": "publishTime",
            "docs": [
              "The timestamp of this price update in seconds"
            ],
            "type": "i64"
          },
          {
            "name": "prevPublishTime",
            "docs": [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ],
            "type": "i64"
          },
          {
            "name": "emaPrice",
            "type": "i64"
          },
          {
            "name": "emaConf",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidOwner",
      "msg": "Invalid admin."
    },
    {
      "code": 6001,
      "name": "InvalidTimePeriods",
      "msg": "Invalid time periods provided."
    },
    {
      "code": 6002,
      "name": "NotInPurchasePeriod",
      "msg": "Purchase period has not started or has ended."
    },
    {
      "code": 6003,
      "name": "NftLimitReached",
      "msg": "NFT limit reached."
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds for purchase"
    },
    {
      "code": 6005,
      "name": "MintAmountExceed",
      "msg": "Mint amount exceeded"
    },
    {
      "code": 6006,
      "name": "BuyPeriodExceed",
      "msg": "Buy period exceeded"
    },
    {
      "code": 6007,
      "name": "NotInRevealPeriod",
      "msg": "Reveal period has not started or has ended."
    },
    {
      "code": 6008,
      "name": "NftNotFound",
      "msg": "NFT not found."
    },
    {
      "code": 6009,
      "name": "NftAlreadyRevealed",
      "msg": "NFT has already been revealed."
    },
    {
      "code": 6010,
      "name": "NoAvailableNumbers",
      "msg": "No available numbers to assign."
    },
    {
      "code": 6011,
      "name": "RevealPeriodExceed",
      "msg": "Reveal period exceeded"
    },
    {
      "code": 6012,
      "name": "InvalidAdminSolAccount",
      "msg": "The provided admin SOL account is invalid."
    },
    {
      "code": 6013,
      "name": "InvalidTreasuryAccount",
      "msg": "The provided treasury account is invalid."
    }
  ],
  "metadata": {
    "address": "99VSfoctL224wFQ8UpT39wBMuZpwoJ8zMzjTr1s7Nn3L"
  }
}
export const IDL = {
  "version": "0.1.0",
  "name": "nft_platform",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminSolAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxNfts",
          "type": "u64"
        },
        {
          "name": "purchaseStart",
          "type": "i64"
        },
        {
          "name": "purchaseEnd",
          "type": "i64"
        },
        {
          "name": "revealStart",
          "type": "i64"
        },
        {
          "name": "revealEnd",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeRandomState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setPeriods",
      "accounts": [
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "purchaseStart",
          "type": "i64"
        },
        {
          "name": "purchaseEnd",
          "type": "i64"
        },
        {
          "name": "revealStart",
          "type": "i64"
        },
        {
          "name": "revealEnd",
          "type": "i64"
        }
      ]
    },
    {
      "name": "purchase",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userNfts",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "adminSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceUpdate",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reveal",
      "accounts": [
        {
          "name": "userNfts",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "mint",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GlobalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalNftsMinted",
            "type": "u64"
          },
          {
            "name": "maxNfts",
            "type": "u64"
          },
          {
            "name": "totalRaised",
            "type": "u64"
          },
          {
            "name": "totalRevealed",
            "type": "i64"
          },
          {
            "name": "purchaseStart",
            "type": "i64"
          },
          {
            "name": "purchaseEnd",
            "type": "i64"
          },
          {
            "name": "revealStart",
            "type": "i64"
          },
          {
            "name": "revealEnd",
            "type": "i64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "adminSolAccount",
            "type": "publicKey"
          },
          {
            "name": "treasuryAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UsedRandomNumber",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "usedNumbers",
            "type": {
              "vec": "u16"
            }
          },
          {
            "name": "index",
            "type": "u16"
          },
          {
            "name": "start",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "UserNFTs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "mintKey",
            "type": "publicKey"
          },
          {
            "name": "revealedNumber",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "PriceUpdateV2",
      "docs": [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "writeAuthority",
            "type": "publicKey"
          },
          {
            "name": "verificationLevel",
            "type": {
              "defined": "VerificationLevel"
            }
          },
          {
            "name": "priceMessage",
            "type": {
              "defined": "PriceFeedMessage"
            }
          },
          {
            "name": "postedSlot",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "VerificationLevel",
      "docs": [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Partial",
            "fields": [
              {
                "name": "numSignatures",
                "type": "u8"
              }
            ]
          },
          {
            "name": "Full"
          }
        ]
      }
    },
    {
      "name": "PriceFeedMessage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feedId",
            "docs": [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "price",
            "type": "i64"
          },
          {
            "name": "conf",
            "type": "u64"
          },
          {
            "name": "exponent",
            "type": "i32"
          },
          {
            "name": "publishTime",
            "docs": [
              "The timestamp of this price update in seconds"
            ],
            "type": "i64"
          },
          {
            "name": "prevPublishTime",
            "docs": [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ],
            "type": "i64"
          },
          {
            "name": "emaPrice",
            "type": "i64"
          },
          {
            "name": "emaConf",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidOwner",
      "msg": "Invalid admin."
    },
    {
      "code": 6001,
      "name": "InvalidTimePeriods",
      "msg": "Invalid time periods provided."
    },
    {
      "code": 6002,
      "name": "NotInPurchasePeriod",
      "msg": "Purchase period has not started or has ended."
    },
    {
      "code": 6003,
      "name": "NftLimitReached",
      "msg": "NFT limit reached."
    },
    {
      "code": 6004,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds for purchase"
    },
    {
      "code": 6005,
      "name": "MintAmountExceed",
      "msg": "Mint amount exceeded"
    },
    {
      "code": 6006,
      "name": "BuyPeriodExceed",
      "msg": "Buy period exceeded"
    },
    {
      "code": 6007,
      "name": "NotInRevealPeriod",
      "msg": "Reveal period has not started or has ended."
    },
    {
      "code": 6008,
      "name": "NftNotFound",
      "msg": "NFT not found."
    },
    {
      "code": 6009,
      "name": "NftAlreadyRevealed",
      "msg": "NFT has already been revealed."
    },
    {
      "code": 6010,
      "name": "NoAvailableNumbers",
      "msg": "No available numbers to assign."
    },
    {
      "code": 6011,
      "name": "RevealPeriodExceed",
      "msg": "Reveal period exceeded"
    },
    {
      "code": 6012,
      "name": "InvalidAdminSolAccount",
      "msg": "The provided admin SOL account is invalid."
    },
    {
      "code": 6013,
      "name": "InvalidTreasuryAccount",
      "msg": "The provided treasury account is invalid."
    }
  ],
  "metadata": {
    "address": "99VSfoctL224wFQ8UpT39wBMuZpwoJ8zMzjTr1s7Nn3L"
  }
}