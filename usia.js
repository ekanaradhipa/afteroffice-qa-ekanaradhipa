const readline = require('readline');

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Masukkan daftar usia dipisahkan dengan koma (contoh: 4,18,20,30,100): ', (input) => {
    const arr = input
      .split(',')
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value));

    kategoriUsia(arr);
    rl.close();
  });
}

function kategoriUsia(arr) {
  let anak = 0;
  let remaja = 0;
  let dewasa = 0;
  let lansia = 0;

  for (let i = 0; i < arr.length; i++) {
    const usia = arr[i];

    if (usia > 0 && usia < 13) {
      anak++;
    } else if (usia >= 13 && usia < 18) {
      remaja++;
    } else if (usia >= 18 && usia < 60) {
      dewasa++;
    } else if (usia >= 60) {
      lansia++;
    }
  }

  console.log(`Anak-anak: ${anak}`);
  console.log(`Remaja: ${remaja}`);
  console.log(`Dewasa: ${dewasa}`);
  console.log(`Lansia: ${lansia}`);
}

main();
