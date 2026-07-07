const fs = require('fs');

// داتا أساسية حقيقية بصور شغالة 100% من سيرفرات Sparkfun المفتوحة
const baseComponents = [
  {
    family: "Arduino", category: "Microcontrollers", mfg: "Arduino", pkg: "Board",
    desc: "Development board based on the ATmega microcontroller. Standard layout.",
    image: "https://cdn.sparkfun.com/assets/parts/1/2/2/8/0/11021-01.jpg"
  },
  {
    family: "ESP", category: "Microcontrollers", mfg: "Espressif", pkg: "Module",
    desc: "Wi-Fi and Bluetooth capable IoT development module.",
    image: "https://cdn.sparkfun.com/assets/parts/1/2/0/2/0/13907-01.jpg"
  },
  {
    family: "LM", category: "Logic ICs", mfg: "Texas Instruments", pkg: "DIP-8",
    desc: "Operational Amplifier / Voltage Regulator. Standard through-hole package.",
    image: "https://cdn.sparkfun.com/assets/parts/8/5/0/09456-01a.jpg"
  },
  {
    family: "SN74HC", category: "Logic ICs", mfg: "Texas Instruments", pkg: "DIP-14",
    desc: "High-speed CMOS logic gate. Ideal for breadboarding.",
    image: "https://cdn.sparkfun.com/assets/parts/8/4/6/09452-01a.jpg"
  },
  {
    family: "Transistor", category: "Discrete Semiconductors", mfg: "onsemi", pkg: "TO-92",
    desc: "NPN/PNP Epitaxial Silicon Transistor for general switching.",
    image: "https://cdn.sparkfun.com/assets/parts/2/6/2/0/00526-1.jpg"
  },
  {
    family: "LCD", category: "Passive Components", mfg: "Generic", pkg: "Module",
    desc: "Alphanumeric LCD display module with backlight.",
    image: "https://cdn.sparkfun.com/assets/parts/1/2/0/8/00255-03.jpg"
  }
];

const components = [];
const TOTAL_ITEMS = 150; // هيعملك 150 كارت في المتجر

for (let i = 1; i <= TOTAL_ITEMS; i++) {
  const base = baseComponents[Math.floor(Math.random() * baseComponents.length)];
  
  // توليد أرقام إصدارات واقعية عشان الأسماء تختلف
  const suffix = Math.floor(Math.random() * 900) + 10;
  let finalName = "";
  
  if(base.family === "Arduino") finalName = `Arduino Model-${suffix}`;
  else if(base.family === "ESP") finalName = `ESP8266-${suffix} NodeMCU`;
  else if(base.family === "LM") finalName = `LM${suffix}N Op-Amp`;
  else if(base.family === "SN74HC") finalName = `SN74HC${suffix}N Logic`;
  else if(base.family === "Transistor") finalName = `2N${2000 + suffix} Transistor`;
  else finalName = `LCD ${Math.floor(Math.random() * 4 + 1)}x16 Display`;

  components.push({
    id: i.toString(),
    name: finalName,
    category: base.category,
    description: base.desc,
    manufacturer: base.mfg,
    package: base.pkg,
    price: (Math.random() * 20 + 0.5).toFixed(2),
    stock: Math.floor(Math.random() * 300) + 5,
    image: base.image,
    datasheet: "#"
  });
}

// خلط المكونات عشان لما تفتح كل الأقسام تبقى متوزعة صح
components.sort(() => 0.5 - Math.random());

fs.writeFileSync('./src/data/components.json', JSON.stringify(components, null, 2));
console.log(`✅ Success! Generated ${components.length} REALISTIC items!`);