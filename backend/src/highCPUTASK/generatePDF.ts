import puppeteer from "puppeteer";

export const pdfGenerator = async (data: any): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .rx-symbol { font-family: serif; font-size: 2.5rem; font-style: italic; font-weight: bold; line-height: 1; }
  </style>
</head>
<body class="bg-white text-gray-800">

<div class="max-w-4xl mx-auto p-10 bg-white relative">

  <div class="absolute top-0 left-0 w-full h-3 bg-blue-600"></div>

  <div class="flex justify-between items-start mt-4 border-b-2 border-blue-100 pb-6 mb-6">
    <div>
      <h1 class="text-3xl font-bold text-blue-900 tracking-tight">
        ${data.clinic.name}
      </h1>
      <p class="text-sm text-gray-500 mt-1 max-w-sm">
        ${data.clinic.address}
      </p>
      <p class="text-sm text-gray-500 mt-1">
        <span class="font-medium text-gray-700">Phone:</span> ${data.clinic.phone}
      </p>
    </div>
    <div class="text-right">
      <h2 class="text-xl font-bold text-gray-800">${data.doctor.name}</h2>
      <p class="text-sm text-blue-600 font-medium">${data.doctor.specialization}</p>
      <p class="text-sm text-gray-500 mt-1">Reg No: ${data.doctor.registrationNumber}</p>
    </div>
  </div>

  <div class="bg-blue-50 rounded-lg p-4 mb-8 flex justify-between items-center text-sm">
    <div class="grid grid-cols-2 gap-x-8 gap-y-2">
      <p><span class="text-gray-500">Patient:</span> <span class="font-semibold">${data.patient.name}</span></p>
      <p><span class="text-gray-500">Age/Gender:</span> <span class="font-semibold">${data.patient.age} / ${data.patient.gender}</span></p>
      <p><span class="text-gray-500">Phone:</span> <span class="font-semibold">${data.patient.phone}</span></p>
      <p><span class="text-gray-500">Patient ID:</span> <span class="font-semibold">#${data.id}</span></p>
    </div>
    <div class="text-right border-l-2 border-blue-200 pl-6">
      <p><span class="text-gray-500">Date:</span> <span class="font-semibold">${data.appointment.date}</span></p>
      <p><span class="text-gray-500">Time:</span> <span class="font-semibold">${data.appointment.time}</span></p>
      <p><span class="text-gray-500">Appt ID:</span> <span class="font-semibold">${data.appointment.id}</span></p>
    </div>
  </div>

  <div class="mb-8">
    <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Clinical Diagnosis</h3>
    <ul class="flex flex-wrap gap-2">
      ${data.diagnosis.map((item: string) => `
        <li class="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
          ${item}
        </li>
      `).join("")}
    </ul>
  </div>

  <div class="mb-8 relative">
    <div class="rx-symbol text-blue-900 mb-4">R<sub class="text-xl">x</sub></div>
    
    <table class="w-full text-left border-collapse text-sm">
      <thead>
        <tr class="border-b-2 border-gray-200 text-gray-500">
          <th class="py-3 font-semibold w-1/2">Medicine Name</th>
          <th class="py-3 font-semibold">Dosage</th>
          <th class="py-3 font-semibold">Frequency</th>
          <th class="py-3 font-semibold text-right">Duration</th>
        </tr>
      </thead>
      <tbody>
        ${data.medicines.map((m: any) => `
          <tr class="border-b border-gray-100">
            <td class="py-3 font-bold text-gray-800">${m.name}</td>
            <td class="py-3 text-gray-600">${m.dosage}</td>
            <td class="py-3 text-gray-600">${m.frequency}</td>
            <td class="py-3 text-gray-600 text-right">${m.duration}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>

  <div class="flex gap-8 mb-16">
    <div class="w-2/3">
      <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">General Advice</h3>
      <ul class="list-disc pl-5 text-gray-700 text-sm space-y-1">
        ${data.advice.map((item: string) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
    
    <div class="w-1/3 bg-gray-50 p-4 rounded-lg">
      <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Follow Up</h3>
      <p class="font-semibold text-blue-600">${data.followUpDate}</p>
    </div>
  </div>

  <div class="mt-24 flex justify-end">
    <div class="text-center w-64">
      <div class="border-b-2 border-gray-400 mb-2"></div>
      <p class="font-bold text-gray-800">${data.doctor.name}</p>
      <p class="text-xs text-gray-500">Signature & Stamp</p>
    </div>
  </div>

  <div class="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
    This is a computer-generated prescription. Valid without physical signature if transmitted digitally.
  </div>

</div>

</body>
</html>
`;

  
  await page.setContent(html, {
    waitUntil: "load", 
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } 
  });

  await browser.close();

  return Buffer.from(pdf);
};