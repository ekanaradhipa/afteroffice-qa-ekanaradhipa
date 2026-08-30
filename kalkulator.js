const readline = require('readline');

function operasiMatematika(a, b, operator) {
  let hasil = 0;

  switch (operator) {
    case 'Penjumlahan':
      hasil = a + b;
      break;
    case 'Pengurangan':
      hasil = a - b;
      break;
    case 'Perkalian':
      hasil = a * b;
      break;
    case 'Pembagian':
      if (b === 0) {
        console.log('Tidak bisa membagi dengan 0');
        return;
      }
      hasil = a / b;
      break;
    default:
      console.log('Operator tidak valid');
      return;
  }
  let output = parseFloat(hasil.toFixed(2));

  return output;
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const tanya = (pertanyaan) =>
    new Promise((resolve) => rl.question(pertanyaan, resolve));

  (async () => {
    console.log('Pilih Operasi Matematika:');
    console.log('1. Penjumlahan');
    console.log('2. Pengurangan');
    console.log('3. Perkalian');
    console.log('4. Pembagian');

    const pilihan = await tanya('Masukkan pilihan operator: ');
    const operatorMap = {
      '1': 'Penjumlahan',
      '2': 'Pengurangan',
      '3': 'Perkalian',
      '4': 'Pembagian',
      penjumlahan: 'Penjumlahan',
      pengurangan: 'Pengurangan',
      perkalian: 'Perkalian',
      pembagian: 'Pembagian'
    };

    const operator = operatorMap[pilihan.trim().toLowerCase()] || pilihan.trim();
    const a = Number(await tanya('Masukkan angka pertama: '));
    const b = Number(await tanya('Masukkan angka kedua: '));

    const hasil = operasiMatematika(a, b, operator);
    if (hasil !== undefined) {
      console.log(`Hasil ${operator}: ${hasil}`);
    }

    rl.close();
  })();
}

main();