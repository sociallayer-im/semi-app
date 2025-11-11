import {
    createReadContract,
    createWriteContract,
    createSimulateContract,
    createWatchContractEvent,
  } from '@wagmi/core/codegen'
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // BadgeBounded
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  export const badgeBoundedAbi = [
    {
      type: 'constructor',
      inputs: [
        {
          name: '_registry',
          internalType: 'contract ProfileRegistry',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'account', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
      name: 'exists',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'owner', internalType: 'address', type: 'address' },
        { name: 'operator', internalType: 'address', type: 'address' },
      ],
      name: 'isApprovedForAll',
      outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'isFungible',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'pure',
    },
    {
      type: 'function',
      inputs: [],
      name: 'isRevocable',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'pure',
    },
    {
      type: 'function',
      inputs: [],
      name: 'isTransferable',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'pure',
    },
    {
      type: 'function',
      inputs: [
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'addrs', internalType: 'address[]', type: 'address[]' },
        { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'mintBatch',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'name',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'addrs', internalType: 'address[]', type: 'address[]' },
        { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
        { name: 'profileId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'registerClassAndMintBatch',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'registry',
      outputs: [
        { name: '', internalType: 'contract ProfileRegistry', type: 'address' },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
        { name: 'data', internalType: 'bytes', type: 'bytes' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'operator', internalType: 'address', type: 'address' },
        { name: 'isApproved', internalType: 'bool', type: 'bool' },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'owner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'account',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      ],
      name: 'Approval',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'owner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'operator',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'isApproved',
          internalType: 'bool',
          type: 'bool',
          indexed: false,
        },
      ],
      name: 'ApprovalForAll',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        { name: 'from', internalType: 'address', type: 'address', indexed: true },
        { name: 'to', internalType: 'address', type: 'address', indexed: true },
        { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      ],
      name: 'Transfer',
    },
    { type: 'error', inputs: [], name: 'AccountBalanceOverflow' },
    { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
    { type: 'error', inputs: [], name: 'InvalidClassId' },
    { type: 'error', inputs: [], name: 'LengthMismatch' },
    { type: 'error', inputs: [], name: 'NotOwnerNorApproved' },
    { type: 'error', inputs: [], name: 'NotTransferable' },
    { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
    { type: 'error', inputs: [], name: 'TokenDoesNotExist' },
    { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
    { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
    { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  ] as const
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // BadgeUnbounded
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  export const badgeUnboundedAbi = [
    {
      type: 'constructor',
      inputs: [
        {
          name: '_registry',
          internalType: 'contract ProfileRegistry',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'account', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
      name: 'exists',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'owner', internalType: 'address', type: 'address' },
        { name: 'operator', internalType: 'address', type: 'address' },
      ],
      name: 'isApprovedForAll',
      outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'isFungible',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'pure',
    },
    {
      type: 'function',
      inputs: [],
      name: 'isRevocable',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'pure',
    },
    {
      type: 'function',
      inputs: [],
      name: 'isTransferable',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'pure',
    },
    {
      type: 'function',
      inputs: [
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'addrs', internalType: 'address[]', type: 'address[]' },
        { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'mintBatch',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'name',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'addrs', internalType: 'address[]', type: 'address[]' },
        { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
        { name: 'profileId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'registerClassAndMintBatch',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'registry',
      outputs: [
        { name: '', internalType: 'contract ProfileRegistry', type: 'address' },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
        { name: 'data', internalType: 'bytes', type: 'bytes' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'operator', internalType: 'address', type: 'address' },
        { name: 'isApproved', internalType: 'bool', type: 'bool' },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'owner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'account',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      ],
      name: 'Approval',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'owner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'operator',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'isApproved',
          internalType: 'bool',
          type: 'bool',
          indexed: false,
        },
      ],
      name: 'ApprovalForAll',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        { name: 'from', internalType: 'address', type: 'address', indexed: true },
        { name: 'to', internalType: 'address', type: 'address', indexed: true },
        { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      ],
      name: 'Transfer',
    },
    { type: 'error', inputs: [], name: 'AccountBalanceOverflow' },
    { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
    { type: 'error', inputs: [], name: 'InvalidClassId' },
    { type: 'error', inputs: [], name: 'LengthMismatch' },
    { type: 'error', inputs: [], name: 'NotOwnerNorApproved' },
    { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
    { type: 'error', inputs: [], name: 'TokenDoesNotExist' },
    { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
    { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
    { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  ] as const
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ProfileRegistry
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  export const profileRegistryAbi = [
    {
      type: 'constructor',
      inputs: [
        { name: 'chain', internalType: 'uint256', type: 'uint256' },
        { name: 'uri', internalType: 'string', type: 'string' },
      ],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'account', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'baseURI',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'profileId', internalType: 'uint256', type: 'uint256' }],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'cancelOwnershipHandover',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'chainId',
      outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'pendingOwner', internalType: 'address', type: 'address' },
      ],
      name: 'completeOwnershipHandover',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'addr', internalType: 'address', type: 'address' },
        { name: 'profileId', internalType: 'uint256', type: 'uint256' },
        { name: 'isDefault', internalType: 'bool', type: 'bool' },
      ],
      name: 'createProfile',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'contractAddr', internalType: 'address', type: 'address' },
        { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'getClassId',
      outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'contractAddr', internalType: 'address', type: 'address' },
      ],
      name: 'getContractSchema',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
      name: 'getDefaultProfile',
      outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'classId', internalType: 'uint256', type: 'uint256' }],
      name: 'getTokenClassContract',
      outputs: [{ name: '', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'classId', internalType: 'uint256', type: 'uint256' }],
      name: 'getTokenClassFungible',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'classId', internalType: 'uint256', type: 'uint256' }],
      name: 'getTokenClassOwnerProfileId',
      outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'classId', internalType: 'uint256', type: 'uint256' }],
      name: 'getTokenClassRevocable',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'classId', internalType: 'uint256', type: 'uint256' }],
      name: 'getTokenClassSchema',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'classId', internalType: 'uint256', type: 'uint256' }],
      name: 'getTokenClassTransferable',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'contractAddr', internalType: 'address', type: 'address' },
        { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'getTokenSchema',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
      name: 'isAdmin',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'profileId', internalType: 'uint256', type: 'uint256' },
        { name: 'addr', internalType: 'address', type: 'address' },
      ],
      name: 'isAdminOrOwner',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'owner', internalType: 'address', type: 'address' },
        { name: 'operator', internalType: 'address', type: 'address' },
      ],
      name: 'isApprovedForAll',
      outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
        { name: 'addr', internalType: 'address', type: 'address' },
      ],
      name: 'isClassController',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
      name: 'isContractAllowed',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'name',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'owner',
      outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'pendingOwner', internalType: 'address', type: 'address' },
      ],
      name: 'ownershipHandoverExpiresAt',
      outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'pause',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'paused',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'profileId', internalType: 'uint256', type: 'uint256' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
        { name: 'classContract', internalType: 'address', type: 'address' },
      ],
      name: 'registerClass',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'profileId', internalType: 'uint256', type: 'uint256' },
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
        { name: 'classContract', internalType: 'address', type: 'address' },
        { name: 'schema', internalType: 'string', type: 'string' },
      ],
      name: 'registerClassWithSchema',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
        { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'registerToken',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'requestOwnershipHandover',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
        { name: 'data', internalType: 'bytes', type: 'bytes' },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'addr', internalType: 'address', type: 'address' },
        { name: 'status', internalType: 'bool', type: 'bool' },
      ],
      name: 'setAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'operator', internalType: 'address', type: 'address' },
        { name: 'isApproved', internalType: 'bool', type: 'bool' },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
      name: 'setBaseURI',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'addr', internalType: 'address', type: 'address' },
        { name: 'status', internalType: 'bool', type: 'bool' },
      ],
      name: 'setContractAllowed',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'contractAddr', internalType: 'address', type: 'address' },
        { name: 'schema', internalType: 'string', type: 'string' },
      ],
      name: 'setContractSchema',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [
        { name: 'classId', internalType: 'uint256', type: 'uint256' },
        { name: 'schema', internalType: 'string', type: 'string' },
      ],
      name: 'setTokenClassSchema',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [{ name: 'profileId', internalType: 'uint256', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ name: '', internalType: 'string', type: 'string' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      inputs: [
        { name: 'from', internalType: 'address', type: 'address' },
        { name: 'to', internalType: 'address', type: 'address' },
        { name: 'id', internalType: 'uint256', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      inputs: [],
      name: 'unpause',
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        { name: 'addr', internalType: 'address', type: 'address', indexed: true },
        { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
        { name: 'fungible', internalType: 'bool', type: 'bool', indexed: false },
        {
          name: 'transferable',
          internalType: 'bool',
          type: 'bool',
          indexed: false,
        },
        { name: 'revocable', internalType: 'bool', type: 'bool', indexed: false },
      ],
      name: 'AllowedContractUpdated',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'owner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'account',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      ],
      name: 'Approval',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'owner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'operator',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'isApproved',
          internalType: 'bool',
          type: 'bool',
          indexed: false,
        },
      ],
      name: 'ApprovalForAll',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'newBaseURI',
          internalType: 'string',
          type: 'string',
          indexed: false,
        },
      ],
      name: 'BaseURIUpdated',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'contractAddr',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'schema',
          internalType: 'string',
          type: 'string',
          indexed: false,
        },
      ],
      name: 'ContractSchemaUpdated',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        { name: 'addr', internalType: 'address', type: 'address', indexed: true },
        { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
      ],
      name: 'ControllerUpdated',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        { name: 'addr', internalType: 'address', type: 'address', indexed: true },
        {
          name: 'profileId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: false,
        },
      ],
      name: 'DefaultProfileUpdated',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'pendingOwner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
      ],
      name: 'OwnershipHandoverCanceled',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'pendingOwner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
      ],
      name: 'OwnershipHandoverRequested',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'oldOwner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'newOwner',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
      ],
      name: 'OwnershipTransferred',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address',
          indexed: false,
        },
      ],
      name: 'Paused',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        { name: 'addr', internalType: 'address', type: 'address', indexed: true },
        {
          name: 'profileId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: false,
        },
        {
          name: 'classId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: true,
        },
        {
          name: 'contractAddr',
          internalType: 'address',
          type: 'address',
          indexed: false,
        },
      ],
      name: 'TokenClassRegistered',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'profileId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: false,
        },
        {
          name: 'classId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: true,
        },
        {
          name: 'schema',
          internalType: 'string',
          type: 'string',
          indexed: false,
        },
      ],
      name: 'TokenClassSchemaUpdated',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'contractAddr',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'tokenId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: true,
        },
        {
          name: 'classId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: false,
        },
      ],
      name: 'TokenRegistered',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        { name: 'from', internalType: 'address', type: 'address', indexed: true },
        { name: 'to', internalType: 'address', type: 'address', indexed: true },
        { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      ],
      name: 'Transfer',
    },
    {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'account',
          internalType: 'address',
          type: 'address',
          indexed: false,
        },
      ],
      name: 'Unpaused',
    },
    { type: 'error', inputs: [], name: 'AccountBalanceOverflow' },
    { type: 'error', inputs: [], name: 'AlreadyInitialized' },
    { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
    { type: 'error', inputs: [], name: 'ClassAlreadyExists' },
    { type: 'error', inputs: [], name: 'ContractDoesNotImplementITokenClass' },
    { type: 'error', inputs: [], name: 'ContractNotAllowed' },
    { type: 'error', inputs: [], name: 'EnforcedPause' },
    { type: 'error', inputs: [], name: 'ExpectedPause' },
    { type: 'error', inputs: [], name: 'InvalidAddress' },
    { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
    { type: 'error', inputs: [], name: 'NoHandoverRequest' },
    { type: 'error', inputs: [], name: 'NotAuthorized' },
    { type: 'error', inputs: [], name: 'NotOwnerNorApproved' },
    { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
    { type: 'error', inputs: [], name: 'TokenDoesNotExist' },
    { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
    { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
    { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
    { type: 'error', inputs: [], name: 'Unauthorized' },
  ] as const
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Action
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__
   */
  export const readBadgeBounded = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"balanceOf"`
   */
  export const readBadgeBoundedBalanceOf = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'balanceOf',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"exists"`
   */
  export const readBadgeBoundedExists = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'exists',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"getApproved"`
   */
  export const readBadgeBoundedGetApproved = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'getApproved',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"isApprovedForAll"`
   */
  export const readBadgeBoundedIsApprovedForAll =
    /*#__PURE__*/ createReadContract({
      abi: badgeBoundedAbi,
      functionName: 'isApprovedForAll',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"isFungible"`
   */
  export const readBadgeBoundedIsFungible = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'isFungible',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"isRevocable"`
   */
  export const readBadgeBoundedIsRevocable = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'isRevocable',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"isTransferable"`
   */
  export const readBadgeBoundedIsTransferable = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'isTransferable',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"name"`
   */
  export const readBadgeBoundedName = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'name',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"ownerOf"`
   */
  export const readBadgeBoundedOwnerOf = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'ownerOf',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"registry"`
   */
  export const readBadgeBoundedRegistry = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'registry',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"supportsInterface"`
   */
  export const readBadgeBoundedSupportsInterface =
    /*#__PURE__*/ createReadContract({
      abi: badgeBoundedAbi,
      functionName: 'supportsInterface',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"symbol"`
   */
  export const readBadgeBoundedSymbol = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'symbol',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"tokenURI"`
   */
  export const readBadgeBoundedTokenUri = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'tokenURI',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"totalSupply"`
   */
  export const readBadgeBoundedTotalSupply = /*#__PURE__*/ createReadContract({
    abi: badgeBoundedAbi,
    functionName: 'totalSupply',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__
   */
  export const writeBadgeBounded = /*#__PURE__*/ createWriteContract({
    abi: badgeBoundedAbi,
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"approve"`
   */
  export const writeBadgeBoundedApprove = /*#__PURE__*/ createWriteContract({
    abi: badgeBoundedAbi,
    functionName: 'approve',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"burn"`
   */
  export const writeBadgeBoundedBurn = /*#__PURE__*/ createWriteContract({
    abi: badgeBoundedAbi,
    functionName: 'burn',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"mint"`
   */
  export const writeBadgeBoundedMint = /*#__PURE__*/ createWriteContract({
    abi: badgeBoundedAbi,
    functionName: 'mint',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"mintBatch"`
   */
  export const writeBadgeBoundedMintBatch = /*#__PURE__*/ createWriteContract({
    abi: badgeBoundedAbi,
    functionName: 'mintBatch',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"registerClassAndMintBatch"`
   */
  export const writeBadgeBoundedRegisterClassAndMintBatch =
    /*#__PURE__*/ createWriteContract({
      abi: badgeBoundedAbi,
      functionName: 'registerClassAndMintBatch',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"safeTransferFrom"`
   */
  export const writeBadgeBoundedSafeTransferFrom =
    /*#__PURE__*/ createWriteContract({
      abi: badgeBoundedAbi,
      functionName: 'safeTransferFrom',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"setApprovalForAll"`
   */
  export const writeBadgeBoundedSetApprovalForAll =
    /*#__PURE__*/ createWriteContract({
      abi: badgeBoundedAbi,
      functionName: 'setApprovalForAll',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"transferFrom"`
   */
  export const writeBadgeBoundedTransferFrom = /*#__PURE__*/ createWriteContract({
    abi: badgeBoundedAbi,
    functionName: 'transferFrom',
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__
   */
  export const simulateBadgeBounded = /*#__PURE__*/ createSimulateContract({
    abi: badgeBoundedAbi,
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"approve"`
   */
  export const simulateBadgeBoundedApprove = /*#__PURE__*/ createSimulateContract(
    { abi: badgeBoundedAbi, functionName: 'approve' },
  )
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"burn"`
   */
  export const simulateBadgeBoundedBurn = /*#__PURE__*/ createSimulateContract({
    abi: badgeBoundedAbi,
    functionName: 'burn',
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"mint"`
   */
  export const simulateBadgeBoundedMint = /*#__PURE__*/ createSimulateContract({
    abi: badgeBoundedAbi,
    functionName: 'mint',
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"mintBatch"`
   */
  export const simulateBadgeBoundedMintBatch =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeBoundedAbi,
      functionName: 'mintBatch',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"registerClassAndMintBatch"`
   */
  export const simulateBadgeBoundedRegisterClassAndMintBatch =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeBoundedAbi,
      functionName: 'registerClassAndMintBatch',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"safeTransferFrom"`
   */
  export const simulateBadgeBoundedSafeTransferFrom =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeBoundedAbi,
      functionName: 'safeTransferFrom',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"setApprovalForAll"`
   */
  export const simulateBadgeBoundedSetApprovalForAll =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeBoundedAbi,
      functionName: 'setApprovalForAll',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeBoundedAbi}__ and `functionName` set to `"transferFrom"`
   */
  export const simulateBadgeBoundedTransferFrom =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeBoundedAbi,
      functionName: 'transferFrom',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeBoundedAbi}__
   */
  export const watchBadgeBoundedEvent = /*#__PURE__*/ createWatchContractEvent({
    abi: badgeBoundedAbi,
  })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeBoundedAbi}__ and `eventName` set to `"Approval"`
   */
  export const watchBadgeBoundedApprovalEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: badgeBoundedAbi,
      eventName: 'Approval',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeBoundedAbi}__ and `eventName` set to `"ApprovalForAll"`
   */
  export const watchBadgeBoundedApprovalForAllEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: badgeBoundedAbi,
      eventName: 'ApprovalForAll',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeBoundedAbi}__ and `eventName` set to `"Transfer"`
   */
  export const watchBadgeBoundedTransferEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: badgeBoundedAbi,
      eventName: 'Transfer',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__
   */
  export const readBadgeUnbounded = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"balanceOf"`
   */
  export const readBadgeUnboundedBalanceOf = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'balanceOf',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"exists"`
   */
  export const readBadgeUnboundedExists = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'exists',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"getApproved"`
   */
  export const readBadgeUnboundedGetApproved = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'getApproved',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"isApprovedForAll"`
   */
  export const readBadgeUnboundedIsApprovedForAll =
    /*#__PURE__*/ createReadContract({
      abi: badgeUnboundedAbi,
      functionName: 'isApprovedForAll',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"isFungible"`
   */
  export const readBadgeUnboundedIsFungible = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'isFungible',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"isRevocable"`
   */
  export const readBadgeUnboundedIsRevocable = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'isRevocable',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"isTransferable"`
   */
  export const readBadgeUnboundedIsTransferable =
    /*#__PURE__*/ createReadContract({
      abi: badgeUnboundedAbi,
      functionName: 'isTransferable',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"name"`
   */
  export const readBadgeUnboundedName = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'name',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"ownerOf"`
   */
  export const readBadgeUnboundedOwnerOf = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'ownerOf',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"registry"`
   */
  export const readBadgeUnboundedRegistry = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'registry',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"supportsInterface"`
   */
  export const readBadgeUnboundedSupportsInterface =
    /*#__PURE__*/ createReadContract({
      abi: badgeUnboundedAbi,
      functionName: 'supportsInterface',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"symbol"`
   */
  export const readBadgeUnboundedSymbol = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'symbol',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"tokenURI"`
   */
  export const readBadgeUnboundedTokenUri = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'tokenURI',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"totalSupply"`
   */
  export const readBadgeUnboundedTotalSupply = /*#__PURE__*/ createReadContract({
    abi: badgeUnboundedAbi,
    functionName: 'totalSupply',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__
   */
  export const writeBadgeUnbounded = /*#__PURE__*/ createWriteContract({
    abi: badgeUnboundedAbi,
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"approve"`
   */
  export const writeBadgeUnboundedApprove = /*#__PURE__*/ createWriteContract({
    abi: badgeUnboundedAbi,
    functionName: 'approve',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"burn"`
   */
  export const writeBadgeUnboundedBurn = /*#__PURE__*/ createWriteContract({
    abi: badgeUnboundedAbi,
    functionName: 'burn',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"mint"`
   */
  export const writeBadgeUnboundedMint = /*#__PURE__*/ createWriteContract({
    abi: badgeUnboundedAbi,
    functionName: 'mint',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"mintBatch"`
   */
  export const writeBadgeUnboundedMintBatch = /*#__PURE__*/ createWriteContract({
    abi: badgeUnboundedAbi,
    functionName: 'mintBatch',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"registerClassAndMintBatch"`
   */
  export const writeBadgeUnboundedRegisterClassAndMintBatch =
    /*#__PURE__*/ createWriteContract({
      abi: badgeUnboundedAbi,
      functionName: 'registerClassAndMintBatch',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"safeTransferFrom"`
   */
  export const writeBadgeUnboundedSafeTransferFrom =
    /*#__PURE__*/ createWriteContract({
      abi: badgeUnboundedAbi,
      functionName: 'safeTransferFrom',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"setApprovalForAll"`
   */
  export const writeBadgeUnboundedSetApprovalForAll =
    /*#__PURE__*/ createWriteContract({
      abi: badgeUnboundedAbi,
      functionName: 'setApprovalForAll',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"transferFrom"`
   */
  export const writeBadgeUnboundedTransferFrom =
    /*#__PURE__*/ createWriteContract({
      abi: badgeUnboundedAbi,
      functionName: 'transferFrom',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__
   */
  export const simulateBadgeUnbounded = /*#__PURE__*/ createSimulateContract({
    abi: badgeUnboundedAbi,
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"approve"`
   */
  export const simulateBadgeUnboundedApprove =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeUnboundedAbi,
      functionName: 'approve',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"burn"`
   */
  export const simulateBadgeUnboundedBurn = /*#__PURE__*/ createSimulateContract({
    abi: badgeUnboundedAbi,
    functionName: 'burn',
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"mint"`
   */
  export const simulateBadgeUnboundedMint = /*#__PURE__*/ createSimulateContract({
    abi: badgeUnboundedAbi,
    functionName: 'mint',
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"mintBatch"`
   */
  export const simulateBadgeUnboundedMintBatch =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeUnboundedAbi,
      functionName: 'mintBatch',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"registerClassAndMintBatch"`
   */
  export const simulateBadgeUnboundedRegisterClassAndMintBatch =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeUnboundedAbi,
      functionName: 'registerClassAndMintBatch',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"safeTransferFrom"`
   */
  export const simulateBadgeUnboundedSafeTransferFrom =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeUnboundedAbi,
      functionName: 'safeTransferFrom',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"setApprovalForAll"`
   */
  export const simulateBadgeUnboundedSetApprovalForAll =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeUnboundedAbi,
      functionName: 'setApprovalForAll',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `functionName` set to `"transferFrom"`
   */
  export const simulateBadgeUnboundedTransferFrom =
    /*#__PURE__*/ createSimulateContract({
      abi: badgeUnboundedAbi,
      functionName: 'transferFrom',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeUnboundedAbi}__
   */
  export const watchBadgeUnboundedEvent = /*#__PURE__*/ createWatchContractEvent({
    abi: badgeUnboundedAbi,
  })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `eventName` set to `"Approval"`
   */
  export const watchBadgeUnboundedApprovalEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: badgeUnboundedAbi,
      eventName: 'Approval',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `eventName` set to `"ApprovalForAll"`
   */
  export const watchBadgeUnboundedApprovalForAllEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: badgeUnboundedAbi,
      eventName: 'ApprovalForAll',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeUnboundedAbi}__ and `eventName` set to `"Transfer"`
   */
  export const watchBadgeUnboundedTransferEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: badgeUnboundedAbi,
      eventName: 'Transfer',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__
   */
  export const readProfileRegistry = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"balanceOf"`
   */
  export const readProfileRegistryBalanceOf = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'balanceOf',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"baseURI"`
   */
  export const readProfileRegistryBaseUri = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'baseURI',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"chainId"`
   */
  export const readProfileRegistryChainId = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'chainId',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getApproved"`
   */
  export const readProfileRegistryGetApproved = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'getApproved',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getClassId"`
   */
  export const readProfileRegistryGetClassId = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'getClassId',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getContractSchema"`
   */
  export const readProfileRegistryGetContractSchema =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getContractSchema',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getDefaultProfile"`
   */
  export const readProfileRegistryGetDefaultProfile =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getDefaultProfile',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getTokenClassContract"`
   */
  export const readProfileRegistryGetTokenClassContract =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getTokenClassContract',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getTokenClassFungible"`
   */
  export const readProfileRegistryGetTokenClassFungible =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getTokenClassFungible',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getTokenClassOwnerProfileId"`
   */
  export const readProfileRegistryGetTokenClassOwnerProfileId =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getTokenClassOwnerProfileId',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getTokenClassRevocable"`
   */
  export const readProfileRegistryGetTokenClassRevocable =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getTokenClassRevocable',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getTokenClassSchema"`
   */
  export const readProfileRegistryGetTokenClassSchema =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getTokenClassSchema',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getTokenClassTransferable"`
   */
  export const readProfileRegistryGetTokenClassTransferable =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getTokenClassTransferable',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"getTokenSchema"`
   */
  export const readProfileRegistryGetTokenSchema =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'getTokenSchema',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"isAdmin"`
   */
  export const readProfileRegistryIsAdmin = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'isAdmin',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"isAdminOrOwner"`
   */
  export const readProfileRegistryIsAdminOrOwner =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'isAdminOrOwner',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"isApprovedForAll"`
   */
  export const readProfileRegistryIsApprovedForAll =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'isApprovedForAll',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"isClassController"`
   */
  export const readProfileRegistryIsClassController =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'isClassController',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"isContractAllowed"`
   */
  export const readProfileRegistryIsContractAllowed =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'isContractAllowed',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"name"`
   */
  export const readProfileRegistryName = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'name',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"owner"`
   */
  export const readProfileRegistryOwner = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'owner',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"ownerOf"`
   */
  export const readProfileRegistryOwnerOf = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'ownerOf',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
   */
  export const readProfileRegistryOwnershipHandoverExpiresAt =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'ownershipHandoverExpiresAt',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"paused"`
   */
  export const readProfileRegistryPaused = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'paused',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"supportsInterface"`
   */
  export const readProfileRegistrySupportsInterface =
    /*#__PURE__*/ createReadContract({
      abi: profileRegistryAbi,
      functionName: 'supportsInterface',
    })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"symbol"`
   */
  export const readProfileRegistrySymbol = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'symbol',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"tokenURI"`
   */
  export const readProfileRegistryTokenUri = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'tokenURI',
  })
  
  /**
   * Wraps __{@link readContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"totalSupply"`
   */
  export const readProfileRegistryTotalSupply = /*#__PURE__*/ createReadContract({
    abi: profileRegistryAbi,
    functionName: 'totalSupply',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__
   */
  export const writeProfileRegistry = /*#__PURE__*/ createWriteContract({
    abi: profileRegistryAbi,
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"approve"`
   */
  export const writeProfileRegistryApprove = /*#__PURE__*/ createWriteContract({
    abi: profileRegistryAbi,
    functionName: 'approve',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"burn"`
   */
  export const writeProfileRegistryBurn = /*#__PURE__*/ createWriteContract({
    abi: profileRegistryAbi,
    functionName: 'burn',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
   */
  export const writeProfileRegistryCancelOwnershipHandover =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'cancelOwnershipHandover',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"completeOwnershipHandover"`
   */
  export const writeProfileRegistryCompleteOwnershipHandover =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'completeOwnershipHandover',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"createProfile"`
   */
  export const writeProfileRegistryCreateProfile =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'createProfile',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"pause"`
   */
  export const writeProfileRegistryPause = /*#__PURE__*/ createWriteContract({
    abi: profileRegistryAbi,
    functionName: 'pause',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"registerClass"`
   */
  export const writeProfileRegistryRegisterClass =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'registerClass',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"registerClassWithSchema"`
   */
  export const writeProfileRegistryRegisterClassWithSchema =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'registerClassWithSchema',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"registerToken"`
   */
  export const writeProfileRegistryRegisterToken =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'registerToken',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
   */
  export const writeProfileRegistryRenounceOwnership =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'renounceOwnership',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"requestOwnershipHandover"`
   */
  export const writeProfileRegistryRequestOwnershipHandover =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'requestOwnershipHandover',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
   */
  export const writeProfileRegistrySafeTransferFrom =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'safeTransferFrom',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setAdmin"`
   */
  export const writeProfileRegistrySetAdmin = /*#__PURE__*/ createWriteContract({
    abi: profileRegistryAbi,
    functionName: 'setAdmin',
  })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
   */
  export const writeProfileRegistrySetApprovalForAll =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'setApprovalForAll',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setBaseURI"`
   */
  export const writeProfileRegistrySetBaseUri = /*#__PURE__*/ createWriteContract(
    { abi: profileRegistryAbi, functionName: 'setBaseURI' },
  )
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setContractAllowed"`
   */
  export const writeProfileRegistrySetContractAllowed =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'setContractAllowed',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setContractSchema"`
   */
  export const writeProfileRegistrySetContractSchema =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'setContractSchema',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setTokenClassSchema"`
   */
  export const writeProfileRegistrySetTokenClassSchema =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'setTokenClassSchema',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"transferFrom"`
   */
  export const writeProfileRegistryTransferFrom =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'transferFrom',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"transferOwnership"`
   */
  export const writeProfileRegistryTransferOwnership =
    /*#__PURE__*/ createWriteContract({
      abi: profileRegistryAbi,
      functionName: 'transferOwnership',
    })
  
  /**
   * Wraps __{@link writeContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"unpause"`
   */
  export const writeProfileRegistryUnpause = /*#__PURE__*/ createWriteContract({
    abi: profileRegistryAbi,
    functionName: 'unpause',
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__
   */
  export const simulateProfileRegistry = /*#__PURE__*/ createSimulateContract({
    abi: profileRegistryAbi,
  })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"approve"`
   */
  export const simulateProfileRegistryApprove =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'approve',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"burn"`
   */
  export const simulateProfileRegistryBurn = /*#__PURE__*/ createSimulateContract(
    { abi: profileRegistryAbi, functionName: 'burn' },
  )
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
   */
  export const simulateProfileRegistryCancelOwnershipHandover =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'cancelOwnershipHandover',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"completeOwnershipHandover"`
   */
  export const simulateProfileRegistryCompleteOwnershipHandover =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'completeOwnershipHandover',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"createProfile"`
   */
  export const simulateProfileRegistryCreateProfile =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'createProfile',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"pause"`
   */
  export const simulateProfileRegistryPause =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'pause',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"registerClass"`
   */
  export const simulateProfileRegistryRegisterClass =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'registerClass',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"registerClassWithSchema"`
   */
  export const simulateProfileRegistryRegisterClassWithSchema =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'registerClassWithSchema',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"registerToken"`
   */
  export const simulateProfileRegistryRegisterToken =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'registerToken',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
   */
  export const simulateProfileRegistryRenounceOwnership =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'renounceOwnership',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"requestOwnershipHandover"`
   */
  export const simulateProfileRegistryRequestOwnershipHandover =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'requestOwnershipHandover',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
   */
  export const simulateProfileRegistrySafeTransferFrom =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'safeTransferFrom',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setAdmin"`
   */
  export const simulateProfileRegistrySetAdmin =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'setAdmin',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
   */
  export const simulateProfileRegistrySetApprovalForAll =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'setApprovalForAll',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setBaseURI"`
   */
  export const simulateProfileRegistrySetBaseUri =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'setBaseURI',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setContractAllowed"`
   */
  export const simulateProfileRegistrySetContractAllowed =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'setContractAllowed',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setContractSchema"`
   */
  export const simulateProfileRegistrySetContractSchema =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'setContractSchema',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"setTokenClassSchema"`
   */
  export const simulateProfileRegistrySetTokenClassSchema =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'setTokenClassSchema',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"transferFrom"`
   */
  export const simulateProfileRegistryTransferFrom =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'transferFrom',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"transferOwnership"`
   */
  export const simulateProfileRegistryTransferOwnership =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'transferOwnership',
    })
  
  /**
   * Wraps __{@link simulateContract}__ with `abi` set to __{@link profileRegistryAbi}__ and `functionName` set to `"unpause"`
   */
  export const simulateProfileRegistryUnpause =
    /*#__PURE__*/ createSimulateContract({
      abi: profileRegistryAbi,
      functionName: 'unpause',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__
   */
  export const watchProfileRegistryEvent = /*#__PURE__*/ createWatchContractEvent(
    { abi: profileRegistryAbi },
  )
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"AllowedContractUpdated"`
   */
  export const watchProfileRegistryAllowedContractUpdatedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'AllowedContractUpdated',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"Approval"`
   */
  export const watchProfileRegistryApprovalEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'Approval',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"ApprovalForAll"`
   */
  export const watchProfileRegistryApprovalForAllEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'ApprovalForAll',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"BaseURIUpdated"`
   */
  export const watchProfileRegistryBaseUriUpdatedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'BaseURIUpdated',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"ContractSchemaUpdated"`
   */
  export const watchProfileRegistryContractSchemaUpdatedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'ContractSchemaUpdated',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"ControllerUpdated"`
   */
  export const watchProfileRegistryControllerUpdatedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'ControllerUpdated',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"DefaultProfileUpdated"`
   */
  export const watchProfileRegistryDefaultProfileUpdatedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'DefaultProfileUpdated',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
   */
  export const watchProfileRegistryOwnershipHandoverCanceledEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'OwnershipHandoverCanceled',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
   */
  export const watchProfileRegistryOwnershipHandoverRequestedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'OwnershipHandoverRequested',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
   */
  export const watchProfileRegistryOwnershipTransferredEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'OwnershipTransferred',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"Paused"`
   */
  export const watchProfileRegistryPausedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'Paused',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"TokenClassRegistered"`
   */
  export const watchProfileRegistryTokenClassRegisteredEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'TokenClassRegistered',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"TokenClassSchemaUpdated"`
   */
  export const watchProfileRegistryTokenClassSchemaUpdatedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'TokenClassSchemaUpdated',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"TokenRegistered"`
   */
  export const watchProfileRegistryTokenRegisteredEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'TokenRegistered',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"Transfer"`
   */
  export const watchProfileRegistryTransferEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'Transfer',
    })
  
  /**
   * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link profileRegistryAbi}__ and `eventName` set to `"Unpaused"`
   */
  export const watchProfileRegistryUnpausedEvent =
    /*#__PURE__*/ createWatchContractEvent({
      abi: profileRegistryAbi,
      eventName: 'Unpaused',
    })
  