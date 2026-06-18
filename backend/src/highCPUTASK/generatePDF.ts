import PDFDocument from "pdfkit";

export const pdfGenerator = async (
  data: any
): Promise<Buffer> => {

  return new Promise((resolve, reject) => {

    const doc = new PDFDocument();

    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", reject);

    doc.text("Prescription");
    doc.text(`patient name : ${data.patient.name}`);
    doc.text(`patient age : ${data.patient.age}`);
    doc.text(`patient gender : ${data.patient.gender}`);
    doc.text(`patient phone : ${data.patient.phone}`);
    doc.text(`doctor name : ${data.doctor.name}`);
    doc.text(`doctor specialization : ${data.doctor.specialization}`);
    doc.text(`doctor registration number : ${data.doctor.registrationNumber}`);
    doc.text(`diagnosis : ${data.diagnosis.join(", ")}`);
    doc.text(`medicines : ${data.medicines.map((medicine: any) => `${medicine.name} - ${medicine.dosage} - ${medicine.frequency} - ${medicine.duration}`).join(", ")}`);
    doc.text(`advice : ${data.advice.join(", ")}`);
    doc.text(`follow up date : ${data.followUpDate}`);
    doc.text(`clinic name : ${data.clinic.name}`);
    doc.text(`clinic address : ${data.clinic.address}`);
    doc.text(`clinic phone : ${data.clinic.phone}`);


    doc.end();
  });
};