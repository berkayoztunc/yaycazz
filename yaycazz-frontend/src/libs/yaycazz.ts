export type Yaycazz = {
  "version": "0.1.0",
  "name": "yaycazz",
  "constants": [
    {
      "name": "SEED",
      "type": "string",
      "value": "\"anchor\""
    }
  ],
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wizzard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "mintX",
            "type": "publicKey"
          },
          {
            "name": "mintY",
            "type": "publicKey"
          },
          {
            "name": "fee",
            "type": "u16"
          },
          {
            "name": "locked",
            "type": "bool"
          },
          {
            "name": "authBump",
            "type": "u8"
          },
          {
            "name": "configBump",
            "type": "u8"
          },
          {
            "name": "lpBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "events",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "types",
            "type": {
              "defined": "EventsType"
            }
          },
          {
            "name": "eventBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "register",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "tryCount",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "wizzard",
            "type": "publicKey"
          },
          {
            "name": "event",
            "type": "publicKey"
          },
          {
            "name": "authBump",
            "type": "u8"
          },
          {
            "name": "registerBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "wizzard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "mintX",
            "type": "publicKey"
          },
          {
            "name": "mintY",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "mintSupply",
            "type": "u64"
          },
          {
            "name": "mintType",
            "type": "u8"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "provider",
            "type": "u8"
          },
          {
            "name": "startBlock",
            "type": "u64"
          },
          {
            "name": "endBlock",
            "type": "u64"
          },
          {
            "name": "isRequestApprovement",
            "type": "bool"
          },
          {
            "name": "isApproved",
            "type": "bool"
          },
          {
            "name": "isDistribution",
            "type": "bool"
          },
          {
            "name": "isMint",
            "type": "bool"
          },
          {
            "name": "isCancel",
            "type": "bool"
          },
          {
            "name": "event",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "tokenomics",
            "type": {
              "option": {
                "vec": {
                  "defined": "OnChainTokenomics"
                }
              }
            }
          },
          {
            "name": "authBump",
            "type": "u8"
          },
          {
            "name": "wizzardBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BlockBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "remainSupply",
            "type": "u64"
          },
          {
            "name": "totalTry",
            "type": "u64"
          },
          {
            "name": "distributionAmount",
            "type": "u64"
          },
          {
            "name": "blockHeight",
            "type": "u64"
          },
          {
            "name": "mintPerBlock",
            "type": "u8"
          },
          {
            "name": "blockRemainingMint",
            "type": "u8"
          },
          {
            "name": "isPenalty",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "BlockBaseWithPanyalty",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "remainSupply",
            "type": "u64"
          },
          {
            "name": "totalTry",
            "type": "u64"
          },
          {
            "name": "distributionAmount",
            "type": "u64"
          },
          {
            "name": "blockRemainingMint",
            "type": "u8"
          },
          {
            "name": "blockHeight",
            "type": "u64"
          },
          {
            "name": "mintPerBlock",
            "type": "u8"
          },
          {
            "name": "isPenalty",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "WhitelistBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tree",
            "type": "publicKey"
          },
          {
            "name": "distributionAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OnChainTokenomics",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reciver",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "provider",
            "type": "u8"
          },
          {
            "name": "status",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "EventsType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "BlockBasePenalty",
            "fields": [
              {
                "defined": "BlockBaseWithPanyalty"
              }
            ]
          },
          {
            "name": "BlockBase",
            "fields": [
              {
                "defined": "BlockBase"
              }
            ]
          },
          {
            "name": "WhitelistBase",
            "fields": [
              {
                "defined": "WhitelistBase"
              }
            ]
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6001,
      "name": "OfferExpired",
      "msg": "Offer expired."
    },
    {
      "code": 6002,
      "name": "PoolLocked",
      "msg": "This pool is locked."
    },
    {
      "code": 6003,
      "name": "SlippageExceeded",
      "msg": "Slippage exceeded."
    },
    {
      "code": 6004,
      "name": "Overflow",
      "msg": "Overflow detected."
    },
    {
      "code": 6005,
      "name": "Underflow",
      "msg": "Underflow detected."
    },
    {
      "code": 6006,
      "name": "InvalidToken",
      "msg": "Invalid token."
    },
    {
      "code": 6007,
      "name": "LiquidityLessThanMinimum",
      "msg": "Actual liquidity is less than minimum."
    },
    {
      "code": 6008,
      "name": "NoLiquidityInPool",
      "msg": "No liquidity in pool."
    },
    {
      "code": 6009,
      "name": "BumpError",
      "msg": "Bump error."
    },
    {
      "code": 6010,
      "name": "CurveError",
      "msg": "Curve error."
    },
    {
      "code": 6011,
      "name": "InvalidFee",
      "msg": "Fee is greater than 100%. This is not a very good deal."
    },
    {
      "code": 6012,
      "name": "InvalidAuthority",
      "msg": "Invalid update authority."
    },
    {
      "code": 6013,
      "name": "NoAuthoritySet",
      "msg": "No update authority set."
    },
    {
      "code": 6014,
      "name": "InvalidAmount",
      "msg": "Invalid amount."
    },
    {
      "code": 6015,
      "name": "InvalidPrecision",
      "msg": "Invalid precision."
    },
    {
      "code": 6016,
      "name": "InsufficientBalance",
      "msg": "Insufficient balance."
    },
    {
      "code": 6017,
      "name": "ZeroBalance",
      "msg": "Zero balance."
    }
  ]
};

export const IDL: Yaycazz = {
  "version": "0.1.0",
  "name": "yaycazz",
  "constants": [
    {
      "name": "SEED",
      "type": "string",
      "value": "\"anchor\""
    }
  ],
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintX",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintY",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultX",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultY",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "auth",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wizzard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "mintX",
            "type": "publicKey"
          },
          {
            "name": "mintY",
            "type": "publicKey"
          },
          {
            "name": "fee",
            "type": "u16"
          },
          {
            "name": "locked",
            "type": "bool"
          },
          {
            "name": "authBump",
            "type": "u8"
          },
          {
            "name": "configBump",
            "type": "u8"
          },
          {
            "name": "lpBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "events",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "types",
            "type": {
              "defined": "EventsType"
            }
          },
          {
            "name": "eventBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "register",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "tryCount",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "wizzard",
            "type": "publicKey"
          },
          {
            "name": "event",
            "type": "publicKey"
          },
          {
            "name": "authBump",
            "type": "u8"
          },
          {
            "name": "registerBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "wizzard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "mintX",
            "type": "publicKey"
          },
          {
            "name": "mintY",
            "type": "publicKey"
          },
          {
            "name": "totalSupply",
            "type": "u64"
          },
          {
            "name": "mintSupply",
            "type": "u64"
          },
          {
            "name": "mintType",
            "type": "u8"
          },
          {
            "name": "mintPrice",
            "type": "u64"
          },
          {
            "name": "provider",
            "type": "u8"
          },
          {
            "name": "startBlock",
            "type": "u64"
          },
          {
            "name": "endBlock",
            "type": "u64"
          },
          {
            "name": "isRequestApprovement",
            "type": "bool"
          },
          {
            "name": "isApproved",
            "type": "bool"
          },
          {
            "name": "isDistribution",
            "type": "bool"
          },
          {
            "name": "isMint",
            "type": "bool"
          },
          {
            "name": "isCancel",
            "type": "bool"
          },
          {
            "name": "event",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "tokenomics",
            "type": {
              "option": {
                "vec": {
                  "defined": "OnChainTokenomics"
                }
              }
            }
          },
          {
            "name": "authBump",
            "type": "u8"
          },
          {
            "name": "wizzardBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BlockBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "remainSupply",
            "type": "u64"
          },
          {
            "name": "totalTry",
            "type": "u64"
          },
          {
            "name": "distributionAmount",
            "type": "u64"
          },
          {
            "name": "blockHeight",
            "type": "u64"
          },
          {
            "name": "mintPerBlock",
            "type": "u8"
          },
          {
            "name": "blockRemainingMint",
            "type": "u8"
          },
          {
            "name": "isPenalty",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "BlockBaseWithPanyalty",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "remainSupply",
            "type": "u64"
          },
          {
            "name": "totalTry",
            "type": "u64"
          },
          {
            "name": "distributionAmount",
            "type": "u64"
          },
          {
            "name": "blockRemainingMint",
            "type": "u8"
          },
          {
            "name": "blockHeight",
            "type": "u64"
          },
          {
            "name": "mintPerBlock",
            "type": "u8"
          },
          {
            "name": "isPenalty",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "WhitelistBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tree",
            "type": "publicKey"
          },
          {
            "name": "distributionAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OnChainTokenomics",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reciver",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "provider",
            "type": "u8"
          },
          {
            "name": "status",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "EventsType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "BlockBasePenalty",
            "fields": [
              {
                "defined": "BlockBaseWithPanyalty"
              }
            ]
          },
          {
            "name": "BlockBase",
            "fields": [
              {
                "defined": "BlockBase"
              }
            ]
          },
          {
            "name": "WhitelistBase",
            "fields": [
              {
                "defined": "WhitelistBase"
              }
            ]
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DefaultError",
      "msg": "DefaultError"
    },
    {
      "code": 6001,
      "name": "OfferExpired",
      "msg": "Offer expired."
    },
    {
      "code": 6002,
      "name": "PoolLocked",
      "msg": "This pool is locked."
    },
    {
      "code": 6003,
      "name": "SlippageExceeded",
      "msg": "Slippage exceeded."
    },
    {
      "code": 6004,
      "name": "Overflow",
      "msg": "Overflow detected."
    },
    {
      "code": 6005,
      "name": "Underflow",
      "msg": "Underflow detected."
    },
    {
      "code": 6006,
      "name": "InvalidToken",
      "msg": "Invalid token."
    },
    {
      "code": 6007,
      "name": "LiquidityLessThanMinimum",
      "msg": "Actual liquidity is less than minimum."
    },
    {
      "code": 6008,
      "name": "NoLiquidityInPool",
      "msg": "No liquidity in pool."
    },
    {
      "code": 6009,
      "name": "BumpError",
      "msg": "Bump error."
    },
    {
      "code": 6010,
      "name": "CurveError",
      "msg": "Curve error."
    },
    {
      "code": 6011,
      "name": "InvalidFee",
      "msg": "Fee is greater than 100%. This is not a very good deal."
    },
    {
      "code": 6012,
      "name": "InvalidAuthority",
      "msg": "Invalid update authority."
    },
    {
      "code": 6013,
      "name": "NoAuthoritySet",
      "msg": "No update authority set."
    },
    {
      "code": 6014,
      "name": "InvalidAmount",
      "msg": "Invalid amount."
    },
    {
      "code": 6015,
      "name": "InvalidPrecision",
      "msg": "Invalid precision."
    },
    {
      "code": 6016,
      "name": "InsufficientBalance",
      "msg": "Insufficient balance."
    },
    {
      "code": 6017,
      "name": "ZeroBalance",
      "msg": "Zero balance."
    }
  ]
};
