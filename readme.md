# Hamming Code

A **Vanilla JavaScript** project to demonstrate **Hamming Code generation and decoding** with a hacker-themed UI.  
The interface is styled as a **custom terminal console** using a lightweight logger library (`divLOG.js`) written specifically for this project.

---

### 🔗 Live Demo

👉 [Click here to go to the site](https://danny-wits.github.io/HammingCode/)

---

## 🌐 Website Flow

1. **Input Data** (binary or decimal).
2. **Generate Code**:
   - Step 1: Find suitable `r` (parity bits count).
   - Step 2: Insert placeholders for parity bits.
   - Step 3: Calculate parity values → form final Hamming Code.
3. **Send Payload**:
   - Auto error injection (optional) flips a random bit.
   - Payload scrolls smoothly to the output section.
4. **Decode**:
   - Step 1: Verify binary input.
   - Step 2: Find `m` and `r`.
   - Step 3: Parity check → detect & fix single-bit errors.
   - Step 4: Extract original data.

All logs and steps are shown beautifully inside the **Terminal-style DivLog console**.

## 📂 File Structure

```bash
./
├── divLOG.js # Custom terminal logger
├── hamming_code.js # Core Hamming code logic
├── script.js # App flow, button wiring, UI handling
├── index.html # Main webpage
├── style.css # Hacker theme styling
```

---

## ✨ Features

- Decimal or pure binary input toggle.
- Step-by-step code generation with animated logs.
- Automatic calculation of parity bits (`r`).
- Random error injection (simulates noisy channel).
- Error detection and single-bit correction.
- Smooth scroll and terminal-like display powered by `divLOG`.
- Reset and clear options to restart quickly.
- Mobile first (Responsive)

---

## 🎛 Controls

- **decimalInput**  
  Toggle between **decimal** and **binary** input mode.  
  ✅ Checked → Decimal input accepted  
  ❌ Unchecked → Binary input only

- **detailedLogs**  
  Enables **step-by-step parity calculation logs** in the console.  
  ✅ Checked → Verbose logs shown  
  ❌ Unchecked → Only essential logs

- **Auto Error**  
  Randomly flips one bit in the generated Hamming Code (simulates noisy channel).  
  ✅ Checked → Auto error injection ON  
  ❌ Unchecked → Clean transmission

## 🎮 Example Walkthrough

Input:

```python
1011
```

Generated Hamming Code:

```python
1010101
```

Error injected at random position → detected via parity check → corrected → original data restored.

## 👨‍💻 Author

Created by **[Danny-Wits](https://github.com/Danny-Wits)**
