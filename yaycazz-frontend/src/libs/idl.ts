export type RegistrationProgram = {
  "version": "0.1.0",
  "name": "registration_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
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
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxRegister",
          "type": "u64"
        },
        {
          "name": "lamport",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "perBlock",
          "type": "u8"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "link",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeDistrubute",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": "bool"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stop",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": "bool"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "collect",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "close",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "emergency",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claimViaAdmin",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "registerer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAddress",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "changeTime",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "start",
          "type": "i64"
        },
        {
          "name": "end",
          "type": "i64"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "register",
      "accounts": [
        {
          "name": "registerer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The authority signing the transaction. these time its different from the authority of the vault."
          ]
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registerer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
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
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "registration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "maxRegister",
            "type": "u64"
          },
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
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "distrubuteIsStart",
            "type": "bool"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
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
            "name": "indexArray",
            "type": "bytes"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "isCanceled",
            "type": "bool"
          },
          {
            "name": "link",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "registerers",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "tryCount",
            "type": "u64"
          },
          {
            "name": "pool",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "RegistrationFull",
      "msg": "The registration is full"
    },
    {
      "code": 6001,
      "name": "AllreadyRegistered",
      "msg": "Allready registered"
    },
    {
      "code": 6002,
      "name": "WrogVault",
      "msg": "Wrong vault"
    },
    {
      "code": 6003,
      "name": "WrongOwner",
      "msg": "Wrong owner"
    },
    {
      "code": 6004,
      "name": "PoolNotComplate",
      "msg": "Pool not complate"
    },
    {
      "code": 6005,
      "name": "NoMoreSupply",
      "msg": "No more supply"
    },
    {
      "code": 6006,
      "name": "PdaNotMatched",
      "msg": "PDA account not matched"
    },
    {
      "code": 6007,
      "name": "DistributionNotStarted",
      "msg": "Distribution not started"
    },
    {
      "code": 6008,
      "name": "NotStarted",
      "msg": "Not Started"
    },
    {
      "code": 6009,
      "name": "PoolNotStarted",
      "msg": "Pool is not started yet"
    },
    {
      "code": 6010,
      "name": "PoolCanceled",
      "msg": "Pool canceled"
    },
    {
      "code": 6011,
      "name": "PoolNotCanceled",
      "msg": "Pool not canceled"
    },
    {
      "code": 6012,
      "name": "PoolEnded",
      "msg": "Pool ended"
    },
    {
      "code": 6013,
      "name": "PoolStillRunning",
      "msg": "Pool still running"
    },
    {
      "code": 6014,
      "name": "PoolWait24H",
      "msg": "Please wait 24H, user need to claim their tokens"
    }
  ]
};

export const IDL: RegistrationProgram = {
  "version": "0.1.0",
  "name": "registration_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
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
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "maxRegister",
          "type": "u64"
        },
        {
          "name": "lamport",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "perBlock",
          "type": "u8"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "link",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeDistrubute",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": "bool"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stop",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "status",
          "type": "bool"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "collect",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "close",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "emergency",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claimViaAdmin",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "registerer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAddress",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "changeTime",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "start",
          "type": "i64"
        },
        {
          "name": "end",
          "type": "i64"
        },
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "register",
      "accounts": [
        {
          "name": "registerer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The authority signing the transaction. these time its different from the authority of the vault."
          ]
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "registerer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "registration",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowWalletState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletToDepositTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
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
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "registration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "maxRegister",
            "type": "u64"
          },
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
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "distrubuteIsStart",
            "type": "bool"
          },
          {
            "name": "updateAuthority",
            "type": "publicKey"
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
            "name": "indexArray",
            "type": "bytes"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "isCanceled",
            "type": "bool"
          },
          {
            "name": "link",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "registerers",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u64"
          },
          {
            "name": "tryCount",
            "type": "u64"
          },
          {
            "name": "pool",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "RegistrationFull",
      "msg": "The registration is full"
    },
    {
      "code": 6001,
      "name": "AllreadyRegistered",
      "msg": "Allready registered"
    },
    {
      "code": 6002,
      "name": "WrogVault",
      "msg": "Wrong vault"
    },
    {
      "code": 6003,
      "name": "WrongOwner",
      "msg": "Wrong owner"
    },
    {
      "code": 6004,
      "name": "PoolNotComplate",
      "msg": "Pool not complate"
    },
    {
      "code": 6005,
      "name": "NoMoreSupply",
      "msg": "No more supply"
    },
    {
      "code": 6006,
      "name": "PdaNotMatched",
      "msg": "PDA account not matched"
    },
    {
      "code": 6007,
      "name": "DistributionNotStarted",
      "msg": "Distribution not started"
    },
    {
      "code": 6008,
      "name": "NotStarted",
      "msg": "Not Started"
    },
    {
      "code": 6009,
      "name": "PoolNotStarted",
      "msg": "Pool is not started yet"
    },
    {
      "code": 6010,
      "name": "PoolCanceled",
      "msg": "Pool canceled"
    },
    {
      "code": 6011,
      "name": "PoolNotCanceled",
      "msg": "Pool not canceled"
    },
    {
      "code": 6012,
      "name": "PoolEnded",
      "msg": "Pool ended"
    },
    {
      "code": 6013,
      "name": "PoolStillRunning",
      "msg": "Pool still running"
    },
    {
      "code": 6014,
      "name": "PoolWait24H",
      "msg": "Please wait 24H, user need to claim their tokens"
    }
  ]
};
