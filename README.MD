#  Character Shop DApp

ระบบร้านขายตัวละครแบบ NFT บน Blockchain ที่ใช้ Smart Contract ในการจัดการความเป็นเจ้าของ แต่ละตัวละครมีเจ้าของได้คนเดียว และ 1 account สามารถเป็นเจ้าของได้หลายตัวละคร

---

## 1. ภาพรวมของระบบ

Character Shop DApp เป็นเว็บแอปพลิเคชันแบบ Decentralized ที่ทำงานบน Ethereum Blockchain สำหรับซื้อขายตัวละครเสมือนแบบ NFT โดยใช้ Smart Contract ในการจัดการธุรกรรมทั้งหมด ระบบประกอบด้วยตัวละคร 10 ตัว ที่แต่ละตัวมีเจ้าของได้คนเดียว และ 1 account สามารถเป็นเจ้าของได้หลายตัว พร้อมบันทึกประวัติการซื้อขายบน Blockchain

## 2. Contract Address

- **Contract Address:** `0x6E943EE7AEC24Ac1f32a09a756103D29BecfA931`
- **Network:** Hoodi Testnet

## 3. การทำงานของระบบ

- เมื่อผู้ใช้เปิดหน้าเว็บจะพบปุ่ม **Connect Wallet** สำหรับเชื่อมต่อ MetaMask ผ่าน Ethers.js
- เมื่อเชื่อมต่อสำเร็จ ระบบจะเรียกฟังก์ชัน `getAllCharacters()` จาก Smart Contract เพื่อดึงข้อมูลตัวละครทั้ง 10 ตัว
- แสดงผลเป็น Card พร้อมรูปภาพ ชื่อ ราคา และสถานะ (AVAILABLE/SOLD/OWNED)
- เมื่อผู้ใช้ต้องการซื้อตัวละครที่ยังว่าง กดปุ่ม **Buy Now** ซึ่งจะเรียกฟังก์ชัน `buyCharacter(id)` พร้อมส่ง ETH ตามราคา
- Smart Contract จะตรวจสอบว่าตัวละครยังไม่มีเจ้าของ แล้วอัปเดตเจ้าของและสถานะ `isSold`
- Emit Event `CharacterPurchased` เพื่อบันทึกธุรกรรม
- ระบบดึงประวัติการซื้อย้อนหลังผ่าน `queryFilter()` และฟัง Event แบบ Real-time ผ่าน `contract.on()`
- แสดงในตาราง **Ownership Logs** โดยไม่ต้อง Refresh หน้า

---

##  ระบบทำอะไร

- **ร้านขายตัวละคร 10 ตัว** บน Ethereum Blockchain
- **NFT Ownership** - แต่ละตัวละครมีเจ้าของได้คนเดียว ซื้อแล้วคนอื่นซื้อไม่ได้
- **1 Account ซื้อได้หลายตัว** - สะสม collection ของตัวเอง
- **บันทึกประวัติการซื้อ** - ระบบ Event Logs แสดงประวัติการซื้อแบบ Real-time
- **เชื่อมต่อ MetaMask Wallet** - ใช้ Wallet ในการทำธุรกรรม
- **แสดงสถานะตัวละคร** - AVAILABLE / SOLD / OWNED

---

##  วิธีการใช้งาน

### 1. ติดตั้ง MetaMask
- ติดตั้ง [MetaMask Extension](https://metamask.io/) ในเบราว์เซอร์
- สร้างหรือนำเข้า Wallet

### 2. Deploy Smart Contract
1. เปิด [Remix IDE](https://remix.ethereum.org/)
2. สร้างไฟล์ใหม่ วาง code จาก `contracts/CharacterShop.sol`
3. Compile contract (Solidity ^0.8.0)
4. Deploy ไปยัง network ที่ต้องการ (Sepolia Testnet แนะนำ)
5. Copy Contract Address ที่ได้

### 3. ตั้งค่า Frontend
1. เปิดไฟล์ `frontend/app.js`
2. แก้ไข `contractAddress` เป็น Address ที่ได้จากการ Deploy
```javascript
const contractAddress = "0x6E943EE7AEC24Ac1f32a09a756103D29BecfA931";
```

### 4. รันเว็บไซต์
- ใช้ VS Code Live Server หรือ
```bash
cd frontend
npx serve .
```
- เปิดเบราว์เซอร์ไปที่ URL ที่แสดง

### 5. ซื้อตัวละคร
1. กดปุ่ม **Connect Wallet**
2. อนุมัติการเชื่อมต่อใน MetaMask
3. เลือกตัวละครที่ยังว่าง (AVAILABLE) กดปุ่ม **Buy Now**
4. ยืนยันธุรกรรมใน MetaMask
5. เมื่อซื้อสำเร็จ ตัวละครจะเป็นของคุณ และคนอื่นจะซื้อไม่ได้อีก

---

##  โครงสร้างโปรเจค

```
Assigment2-B6614690/
├── contracts/
│   └── CharacterShop.sol    # Smart Contract (NFT)
├── frontend/
│   ├── assets/              # รูปภาพตัวละคร
│   │   ├── Cthoni.png
│   │   ├── Engin.png
│   │   ├── Fu.png
│   │   ├── Guita.png
│   │   ├── Jabber.png
│   │   ├── Riyo.png
│   │   ├── Rudo.png
│   │   ├── Tamsy.png
│   │   ├── Zanka.png
│   │   └── Zodyl.png
│   ├── index.html           # หน้าเว็บหลัก
│   ├── style.css            # การตกแต่ง CSS
│   └── app.js               # Logic JavaScript
└── README.MD                # เอกสารนี้
```

---

##  ฟังก์ชันในระบบ

### Smart Contract (`CharacterShop.sol`)

| ฟังก์ชัน | คำอธิบาย |
|---------|---------|
| `constructor()` | สร้างตัวละคร 10 ตัว พร้อมกำหนดชื่อและราคา |
| `buyCharacter(uint _id)` | ซื้อตัวละครโดยระบุ ID (1-10) ซื้อได้ถ้ายังไม่มีเจ้าของ |
| `getAllCharacters()` | ดึงข้อมูลตัวละครทั้งหมด (id, name, price, owner, isSold) |
| `getMyCharacters()` | ดูรายการ ID ตัวละครที่ผู้เรียกเป็นเจ้าของ |
| `getCharactersByOwner(address)` | ดูรายการ ID ตัวละครของ address ใดๆ |
| `getBalance()` | ดูยอดเงินใน Contract |

### Event
| Event | คำอธิบาย |
|-------|---------|
| `CharacterPurchased` | ถูกเรียกเมื่อมีการซื้อ (buyer, characterId, name, timestamp) |

### Frontend (`app.js`)

| ฟังก์ชัน | คำอธิบาย |
|---------|---------|
| `connectWallet()` | เชื่อมต่อ MetaMask Wallet |
| `loadCharacters()` | โหลดข้อมูลตัวละครจาก Contract |
| `loadPastEvents()` | ดึงประวัติการซื้อย้อนหลังจาก Blockchain |
| `loadMyCollection()` | โหลดรายการตัวละครที่ผู้ใช้เป็นเจ้าของ |
| `renderCharacters()` | แสดงผล Card ตัวละครพร้อมสถานะ (AVAILABLE/SOLD/OWNED) |
| `buyCharacter()` | เรียก Smart Contract เพื่อซื้อตัวละคร |
| `setupEventListeners()` |  Event การซื้อแบบ Real-time |
| `addLogEntry()` | เพิ่มประวัติการซื้อในตาราง |
| `updateWalletStatus()` | อัปเดตสถานะการเชื่อมต่อ Wallet |

---

## ภาษาและ Library ที่ใช้

### Blockchain
| เทคโนโลยี | เวอร์ชัน | คำอธิบาย |
|-----------|---------|---------|
| Solidity | ^0.8.0 | ภาษาสำหรับเขียน Smart Contract |
| Ethereum | - | Blockchain Network |

### Frontend
| เทคโนโลยี | เวอร์ชัน | คำอธิบาย |
|-----------|---------|---------|
| HTML5 | - | โครงสร้างหน้าเว็บ |
| CSS3 | - | การตกแต่ง (Dark Theme, Responsive) |
| JavaScript | ES6+ | Logic และการเชื่อมต่อ Blockchain |
| Ethers.js | v6 | Library สำหรับเชื่อมต่อ Ethereum |

### Tools
| เครื่องมือ | คำอธิบาย |
|-----------|---------|
| Remix IDE | Deploy และทดสอบ Smart Contract |
| MetaMask | Wallet สำหรับทำธุรกรรม |
| VS Code Live Server | รัน Frontend ในเครื่อง |

---

##  รายละเอียดตัวละคร

| ID | ชื่อ | ราคา (ETH) |
|----|-----|-----------|
| 1 | Cthoni | 0.001 |
| 2 | Engin | 0.002 |
| 3 | Fu | 0.003 |
| 4 | Guita | 0.004 |
| 5 | Jabber | 0.005 |
| 6 | Riyo | 0.006 |
| 7 | Rudo | 0.007 |
| 8 | Tamsy | 0.008 |
| 9 | Zanka | 0.009 |
| 10 | Zodyl | 0.01 |

---

##  NFT Features

- **Unique Ownership**: แต่ละตัวละครมีเจ้าของได้คนเดียว
- **Permanent Record**: ความเป็นเจ้าของถูกบันทึกบน Blockchain ตลอดไป
- **Collection**: ผู้ใช้สามารถสะสม collection ตัวละครหลายตัว
- **Scarcity**: มีตัวละครจำกัดแค่ 10 ตัว ซื้อหมดก็ไม่มีอีก

---

##  หมายเหตุ

- ต้อง Deploy Smart Contract ใหม่ทุกครั้งที่แก้ไข code ใน `.sol`
- ต้องมี ETH ใน Wallet เพียงพอสำหรับค่า Gas และราคาตัวละคร
- ดู Transactions ได้ที่ Block Explorer เช่น [hoodi Etherscan](https://hoodi.etherscan.io/)

---

## ผู้พัฒนา
**Student ID:** B6614690
