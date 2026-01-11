const contractAddress = "0xD18266E75Cc920f0Ba0003091B627d8E381C83aC";
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "characterId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "CharacterPurchased",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "buyCharacter",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "characters",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "lastOwner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "purchaseCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllCharacters",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "lastOwner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "purchaseCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CharacterShop.Character[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider = null;
let signer = null;
let contract = null;
let userAddress = null;

const connectBtn = document.getElementById('connect-btn');
const walletStatus = document.getElementById('wallet-status');
const charactersGrid = document.getElementById('characters-grid');
const logsBody = document.getElementById('logs-body');

document.addEventListener('DOMContentLoaded', async () => {
    connectBtn.addEventListener('click', connectWallet);

    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectWallet();
        }
    }
});

async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert('MetaMask is not installed! Please install MetaMask to use this DApp.');
            return;
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        userAddress = accounts[0];

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        contract = new ethers.Contract(contractAddress, contractABI, signer);

        updateWalletStatus(true);

        await loadCharacters();

        await loadPastEvents();

        setupEventListeners();

        window.ethereum.on('accountsChanged', handleAccountChange);
        window.ethereum.on('chainChanged', () => window.location.reload());

    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet: ' + error.message);
    }
}

async function loadPastEvents() {
    try {
        const filter = contract.filters.CharacterPurchased();
        const events = await contract.queryFilter(filter, 0, 'latest');

        console.log('Past events found:', events.length);

        events.sort((a, b) => b.blockNumber - a.blockNumber);

        for (const event of events) {
            const buyer = event.args[0];
            const characterId = event.args[1];
            const name = event.args[2];
            const timestamp = event.args[3];

            addLogEntry(buyer, characterId, name, timestamp, false);
        }
    } catch (error) {
        console.error('Error loading past events:', error);
    }
}

function updateWalletStatus(connected) {
    if (connected) {
        const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        walletStatus.textContent = shortAddress;
        walletStatus.classList.add('connected');
        connectBtn.textContent = 'Connected';
        connectBtn.disabled = true;
    } else {
        walletStatus.textContent = 'Not Connected';
        walletStatus.classList.remove('connected');
        connectBtn.textContent = 'Connect Wallet';
        connectBtn.disabled = false;
    }
}

function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        updateWalletStatus(false);
        userAddress = null;
    } else {
        userAddress = accounts[0];
        updateWalletStatus(true);
        loadCharacters();
    }
}

async function loadCharacters() {
    try {
        charactersGrid.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading characters...</p>
            </div>
        `;

        const characters = await contract.getAllCharacters();

        renderCharacters(characters);

    } catch (error) {
        console.error('Error loading characters:', error);
        charactersGrid.innerHTML = `
            <div class="error-message">
                Failed to load characters. Make sure you're connected to the correct network and the contract address is correct.
            </div>
        `;
    }
}

function renderCharacters(characters) {
    charactersGrid.innerHTML = '';

    characters.forEach((char) => {
        const id = Number(char.id);
        const name = char.name;
        const price = char.price;
        const lastOwner = char.lastOwner;
        const purchaseCount = Number(char.purchaseCount);
        const hasBeenPurchased = lastOwner !== "0x0000000000000000000000000000000000000000";

        const priceInEth = ethers.formatEther(price);

        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <div class="character-image-container">
                <img src="assets/${name}.png" alt="${name}" class="character-image" 
                     onerror="this.src='https://via.placeholder.com/300x300?text=${name}'">
                ${purchaseCount > 0 ? `<div class="purchase-badge">${purchaseCount} sold</div>` : ''}
            </div>
            <div class="character-info">
                <div class="character-id">#${id}</div>
                <h3 class="character-name">${name}</h3>
                <div class="character-price">${priceInEth} ETH</div>
                ${hasBeenPurchased ? `
                    <div class="character-owner">
                        Last Owner: <span>${lastOwner.slice(0, 6)}...${lastOwner.slice(-4)}</span>
                    </div>
                ` : ''}
                <button class="btn btn-buy" onclick="buyCharacter(${id}, '${price}')">
                    Buy Now
                </button>
            </div>
        `;

        charactersGrid.appendChild(card);
    });
}

async function buyCharacter(characterId, priceInWei) {
    try {
        if (!contract) {
            alert('Please connect your wallet first!');
            return;
        }

        const btn = event.target;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        const tx = await contract.buyCharacter(characterId, {
            value: priceInWei
        });

        btn.textContent = 'Confirming...';

        await tx.wait();

        alert(`Successfully purchased character #${characterId}!`);

        await loadCharacters();

    } catch (error) {
        console.error('Error buying character:', error);

        if (error.code === 'ACTION_REJECTED') {
            alert('Transaction was rejected by user.');
        } else if (error.message.includes('Incorrect payment amount')) {
            alert('Incorrect payment amount. Please try again.');
        } else {
            alert('Failed to buy character: ' + error.message);
        }

        if (event && event.target) {
            event.target.textContent = 'Buy Now';
            event.target.disabled = false;
        }
    }
}

function setupEventListeners() {
    contract.on('CharacterPurchased', (buyer, characterId, name, timestamp) => {
        console.log('Character Purchased Event:', { buyer, characterId, name, timestamp });

        addLogEntry(buyer, characterId, name, timestamp);

        loadCharacters();
    });
}

function addLogEntry(buyer, characterId, name, timestamp, animate = true) {
    const emptyRow = logsBody.querySelector('.empty-row');
    if (emptyRow) {
        emptyRow.remove();
    }

    const date = new Date(Number(timestamp) * 1000);
    const timeStr = date.toLocaleString();

    const shortAddress = `${buyer.slice(0, 6)}...${buyer.slice(-4)}`;

    const row = document.createElement('tr');
    if (animate) {
        row.className = 'new-log';
    }
    row.innerHTML = `
        <td>${timeStr}</td>
        <td>#${characterId} - ${name}</td>
        <td class="owner-address">${shortAddress}</td>
    `;

    logsBody.insertBefore(row, logsBody.firstChild);
}

function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
