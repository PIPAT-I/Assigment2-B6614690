# Character Shop DApp

ระบบร้านขายตัวละครบน Blockchain ที่ใช้ Smart Contract ในการจัดการการซื้อขาย สามารถซื้อตัวละครได้ไม่จำกัดครั้ง พร้อมแสดงประวัติการซื้อแบบ Real-time

---

##  ระบบทำอะไร

- **ร้านขายตัวละคร 10 ตัว** บน Ethereum Blockchain
- **ซื้อซ้ำได้ไม่จำกัด** - ทุกคนสามารถซื้อตัวละครเดียวกันได้
- **บันทึกประวัติการซื้อ** - ระบบ Event Logs แสดงประวัติการซื้อแบบ Real-time
- **เชื่อมต่อ MetaMask Wallet** - ใช้ Wallet ในการทำธุรกรรม
- **แสดงข้อมูลเจ้าของล่าสุด** - ดูได้ว่าใครซื้อล่าสุดและจำนวนครั้งที่ถูกซื้อ

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
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
// ตอนนี้เป็น
contractAddress =0xD18266E75Cc920f0Ba0003091B627d8E381C83aC
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
3. เลือกตัวละครที่ต้องการ กดปุ่ม **Buy Now**
4. ยืนยันธุรกรรมใน MetaMask

---

##  โครงสร้างโปรเจค

```
Assigment2-B6614690/
├── contracts/
│   └── CharacterShop.sol    # Smart Contract
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
| `buyCharacter(uint _id)` | ซื้อตัวละครโดยระบุ ID (1-10) ต้องส่ง ETH ตามราคา |
| `getAllCharacters()` | ดึงข้อมูลตัวละครทั้งหมด |
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
| `renderCharacters()` | แสดงผล Card ตัวละครบนหน้าเว็บ |
| `buyCharacter()` | เรียก Smart Contract เพื่อซื้อตัวละคร |
| `setupEventListeners()` | ฟัง Event การซื้อแบบ Real-time |
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

##  หมายเหตุ

- ต้อง Deploy Smart Contract ใหม่ทุกครั้งที่แก้ไข code ใน `.sol`
- ต้องมี ETH ใน Wallet เพียงพอสำหรับค่า Gas และราคาตัวละคร

---

## ผู้พัฒนา
**Student ID:** B6614690
