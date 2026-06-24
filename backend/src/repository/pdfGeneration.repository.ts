
export const mockPrescription = {
    id: 1,

    appointment: {
        id: 101,
        date: "2026-06-10",
        time: "10:30 AM",
    },

    patient: {
        id: 1,
        name: "Mohan Das",
        age: 24,
        gender: "Male",
        phone: "9876543210",
    },

    doctor: {
        id: 5,
        name: "Dr. Ankit Sharma",
        specialization: "General Physician",
        registrationNumber: "WBMC12345",
    },

    diagnosis: [
        "Viral Fever",
        "Mild Dehydration",
    ],

    medicines: [
        {
            name: "Paracetamol 500mg",
            dosage: "1 tablet",
            frequency: "Twice Daily",
            duration: "5 Days",
        },
        {
            name: "ORS Solution",
            dosage: "200ml",
            frequency: "After Meals",
            duration: "3 Days",
        },
        {
            name: "Vitamin C",
            dosage: "1 tablet",
            frequency: "Once Daily",
            duration: "7 Days",
        },
    ],

    advice: [
        "Drink plenty of water",
        "Take adequate rest",
        "Avoid oily foods",
    ],

    followUpDate: "2026-06-17",

    clinic: {
        name: "Clinik-Pe Healthcare",
        address: "Kolkata, West Bengal",
        phone: "033-12345678",
    },

    generatedAt: new Date(),
};

import { prisma } from "../utils/prisma.js";

export const pdfGenerationRepository = async () => {
    return mockPrescription
}

export const savePrescriptionPdfResult = async (userId: number, pdfUrl: string) => {
    const response = await prisma.prescription.create({
        data: {
            userId: userId,
            pdfUrl: pdfUrl,
        }
    });


    const pdflink = {
        pdfurl: response.pdfUrl
    }

    return pdflink
}
